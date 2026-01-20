# JotForm Webhook Configuration Guide

## Overview
This document explains how to configure the JotForm (4 Weeks Free Trial) to send data through our webhook transformer to Odoo.

## Issue Fixed
- **Problem**: JotForm was sending "nl-meppel" for location, but Odoo server only recognizes "meppel"
- **Solution**: Created a webhook transformer that converts location codes and maps field names properly

## Webhook Transformer Details

### Endpoint
```
https://ignite-growth-uae.com/api/webhook-transformer
```

### What It Does
1. ✅ Receives JotForm submissions
2. ✅ Fixes location field: "nl-meppel" → "meppel"
3. ✅ Maps JotForm field names to Odoo format
4. ✅ Adds metadata (source, timestamp, submission ID)
5. ✅ Forwards to Odoo webhook

### Field Mapping
| JotForm Field | Odoo Field | Notes |
|---------------|-----------|-------|
| name | name | Full name |
| email | email | Email address |
| phone | phone | Phone number |
| company | company_name | Company name |
| location | location | City (fixes "nl-" prefix) |
| industry | industry | Industry type |
| employees | employee_count | Number of employees |
| budget | budget_range | Budget range |
| message | message | Additional message |

## Configuration Steps

### Step 1: Access JotForm Form Settings
1. Go to **JotForm Dashboard**
2. Find your form: **Form ID: `0198703ffa427218a332abfed80d7948f032`**
3. Click **Settings** → **Integrations** → **Webhooks**

### Step 2: Update Webhook URL
Instead of sending directly to Odoo:
```
❌ OLD (Direct to Odoo):
https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b
```

Use our transformer:
```
✅ NEW (Via Transformer):
https://ignite-growth-uae.com/api/webhook-transformer
```

### Step 3: Configure Webhook Settings
- **URL**: `https://ignite-growth-uae.com/api/webhook-transformer`
- **Method**: POST
- **Format**: Form Data (default)
- **Send Data As**: Form Data
- **Trigger**: On every submission

### Step 4: Test the Webhook
1. Submit a test form with location = "Meppel"
2. Check that:
   - Webhook receives the data
   - Location is correctly transformed
   - Data reaches Odoo without errors
   - Entry is created in Odoo CRM

## Troubleshooting

### Webhook Not Receiving Data
- Verify the JotForm webhook URL is exactly: `https://ignite-growth-uae.com/api/webhook-transformer`
- Check JotForm's Webhook Logs for delivery status
- Ensure form is published (not just draft)

### Location Field Issues
- If sending "nl-meppel", transformer converts it to "meppel" automatically
- If sending other location codes with prefixes, edit `fixLocationValue()` in `functions/webhook-transformer.ts`
- Add new location mappings in the `locationMap` object

### Data Not Reaching Odoo
- Check that Odoo webhook is still working: `https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b`
- Check JotForm field names match those in `fieldMapping` (or add new ones)
- Review Cloudflare logs for any errors

## Advanced Configuration

### Adding New Location Mappings
Edit `functions/webhook-transformer.ts` and update the `locationMap`:

```typescript
const locationMap: Record<string, string> = {
  "nl-meppel": "meppel",
  "nl-amsterdam": "amsterdam",  // Add new mappings here
  "nl-rotterdam": "rotterdam",
};
```

### Adding New Field Mappings
Update the `fieldMapping` in `transformJotFormData()`:

```typescript
const fieldMapping: Record<string, string> = {
  name: "name",
  email: "email",
  new_field: "odoo_field_name",  // Add new mappings here
};
```

### Filtering/Validation
Add validation logic in `transformJotFormData()` to filter or validate data before sending to Odoo.

## Testing

### Manual Test
```bash
curl -X POST https://ignite-growth-uae.com/api/webhook-transformer \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "location=nl-meppel" \
  -F "phone=+971501234567"
```

### Expected Response
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

## Monitoring

### Check Webhook Logs
- **JotForm**: Form Settings → Integrations → Webhooks → View Logs
- **Cloudflare**: Workers Analytics (if using Cloudflare Workers)

### Check Odoo
- Go to CRM → Leads
- Verify new leads are created with correct information
- Check location field shows "meppel" not "nl-meppel"

## Support

If you need to:
1. **Add more location mappings**: Edit `locationMap` in `webhook-transformer.ts`
2. **Change field mappings**: Edit `fieldMapping` in `webhook-transformer.ts`
3. **Add custom validation**: Add logic in `transformJotFormData()` function
4. **Use different Odoo endpoint**: Update `odooWebhookUrl` in the function

---

**Status**: ✅ Configured and Ready
**Last Updated**: January 20, 2026
