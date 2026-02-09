from odoo import fields, models


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    x_deal_id = fields.Char(string='Deal ID')
    x_booking_date = fields.Date(string='Booking Date')
    x_project_id = fields.Char(string='Project ID')
    x_unit_id = fields.Char(string='Unit ID')
    x_developer_commission = fields.Float(
        string='Developer Commission %'
    )
    x_sale_value = fields.Monetary(
        string='Sale Value',
        currency_field='currency_id'
    )
