import json
import logging
from datetime import datetime

from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)

DEFAULT_TOKEN = 'cbbdf9e5-63f0-47ff-96c7-6ec8b9d3a960'


class IntegrationWebhook(http.Controller):
    @http.route(
        '/web/hook/<string:token>',
        type='http',
        auth='public',
        csrf=False,
        methods=['POST'],
    )
    def webhook(self, token, **kwargs):
        expected = request.env['ir.config_parameter'].sudo().get_param(
            'integration.webhook_token', DEFAULT_TOKEN
        )
        if token != expected:
            return request.make_response(
                json.dumps({'success': False, 'error': 'invalid_token'}),
                headers=[('Content-Type', 'application/json')],
                status=401,
            )

        payload = self._get_payload()
        if payload is None:
            return request.make_response(
                json.dumps({'success': False, 'error': 'invalid_payload'}),
                headers=[('Content-Type', 'application/json')],
                status=400,
            )

        records = payload if isinstance(payload, list) else [payload]
        results = []
        for record in records:
            try:
                order = self._create_sale_order(record)
                results.append({'deal_id': record.get('Deal ID'),
                               'order_id': order.id})
            except Exception as exc:
                _logger.exception('Webhook processing failed')
                results.append({'deal_id': record.get('Deal ID'),
                               'error': str(exc)})

        return request.make_response(
            json.dumps({'success': True, 'results': results}),
            headers=[('Content-Type', 'application/json')],
            status=200,
        )

    def _get_payload(self):
        try:
            raw = request.httprequest.data or b''
            if not raw:
                return None
            return json.loads(raw.decode('utf-8'))
        except Exception:
            return None

    def _create_sale_order(self, record):
        env = request.env
        partner = self._get_or_create_partner(record)
        currency = self._resolve_currency(record.get('Currency'))

        booking_date = self._parse_date(
            record.get('Booking Date')
            or record.get('Close Date')
            or record.get('Date Created')
        )

        order_vals = {
            'partner_id': partner.id,
            'currency_id': currency.id,
            'date_order': self._parse_datetime(record.get('Date Created'))
            or datetime.utcnow(),
            'x_deal_id': record.get('Deal ID'),
            'x_booking_date': booking_date,
            'x_project_id': record.get('Project'),
            'x_unit_id': record.get('Unit #'),
            'x_developer_commission': self._parse_percent(
                record.get('Developer Commission')
            ),
            'x_sale_value': self._parse_money(
                record.get('Sale Value') or record.get('Amount')
            ),
        }

        order = env['sale.order'].sudo().create(order_vals)
        product = self._get_or_create_product(record)
        line_vals = {
            'order_id': order.id,
            'product_id': product.id,
            'name': self._build_line_name(record),
            'product_uom_qty': 1.0,
            'price_unit': self._parse_money(
                record.get('Amount') or record.get('Sale Value')
            ),
        }
        env['sale.order.line'].sudo().create(line_vals)
        return order

    def _build_line_name(self, record):
        return (
            record.get('Project')
            or record.get('Deal Title')
            or 'Deal'
        )

    def _get_or_create_partner(self, record):
        partner_name = (
            self._clean_name(record.get('Buyer Contact'))
            or self._clean_name(record.get('Developer'))
            or self._clean_name(record.get('Deal Title'))
            or 'Webhook Partner'
        )
        partner = request.env['res.partner'].sudo().search(
            [('name', '=', partner_name)], limit=1
        )
        if partner:
            return partner
        return request.env['res.partner'].sudo().create({'name': partner_name})

    def _get_or_create_product(self, record):
        product_name = (
            self._clean_name(record.get('Project'))
            or self._clean_name(record.get('Deal Title'))
            or 'Webhook Product'
        )
        product = request.env['product.product'].sudo().search(
            [('name', '=', product_name)], limit=1
        )
        if product:
            return product
        return request.env['product.product'].sudo().create({
            'name': product_name,
            'type': 'service',
        })

    def _resolve_currency(self, currency_code):
        code = (currency_code or '').strip() or 'AED'
        currency = request.env['res.currency'].sudo().search(
            [('name', '=', code)], limit=1
        )
        return currency or request.env.company.currency_id

    def _parse_money(self, value):
        if value is None:
            return 0.0
        if isinstance(value, (int, float)):
            return float(value)
        cleaned = ''.join(ch for ch in str(value) if ch.isdigit() or ch == '.')
        try:
            return float(cleaned) if cleaned else 0.0
        except ValueError:
            return 0.0

    def _parse_percent(self, value):
        return self._parse_money(value)

    def _parse_date(self, value):
        dt = self._parse_datetime(value)
        return dt.date() if dt else None

    def _parse_datetime(self, value):
        if not value:
            return None
        if isinstance(value, datetime):
            return value
        try:
            return datetime.fromisoformat(str(value))
        except ValueError:
            pass
        try:
            return datetime.strptime(str(value), '%d/%m/%Y')
        except ValueError:
            return None

    def _clean_name(self, value):
        if not value:
            return None
        text = str(value).strip()
        if not text or text.lower() == 'not set':
            return None
        if text.lower().startswith('id:'):
            text = text.replace('ID:', '').replace('id:', '').strip()
            return f'ID {text}'
        return text
