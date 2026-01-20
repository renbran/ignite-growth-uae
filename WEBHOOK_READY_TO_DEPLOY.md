# ✅ Webhook Integration - READY TO DEPLOY

## What's Configured

### Webhook Transformer
**Location**: `functions/webhook-transformer.ts`
**Endpoint**: `https://ignite-growth-uae.com/api/webhook-transformer`

### Form Details
- **Form Name**: 4 Weeks Free Trial - No Credit Card
- **JotForm ID**: `0198703ffa427218a332abfed80d7948f032`
- **Purpose**: Triggers automated Odoo spin-up

### Form Fields Handled
1. ✅ Full Name → `full_name`
2. ✅ Work Email → `email`
3. ✅ Phone → `phone`
4. ✅ Company Name → `company_name`
5. ✅ Server Location → `server_location` (FIXES "nl-meppel" → "meppel")

## The Fix

### Problem
JotForm sends: `nl-meppel`
Odoo expects: `meppel`

### Solution
The transformer automatically:
- Detects "nl-meppel" or any "nl-" prefixed location
- Removes the country code prefix
- Sends clean location name to Odoo

### Example Transformations
| Input | Output |
|-------|--------|
| nl-meppel | meppel |
| nl_meppel | meppel |
| NL-Meppel | meppel |
| nl-amsterdam | amsterdam |
| uae-dubai | dubai |

## Data Flow

```
JotForm Submission
    ↓
https://ignite-growth-uae.com/api/webhook-transformer
    ├─ Parse form data
    ├─ Fix location: "nl-meppel" → "meppel"
    ├─ Map field names to Odoo format
    └─ Add metadata (source, timestamp)
    ↓
Odoo Webhook: https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b
    ↓
Automated Odoo Instance Spin-up ✨
```

## Next Steps - Required Actions

### ⚠️ CRITICAL: Update JotForm Webhook URL

1. **Login to JotForm**
   - Go to: https://www.jotform.com/myforms

2. **Find the Form**
   - Search for: `0198703ffa427218a332abfed80d7948f032`
   - Or find: "4 Weeks Free Trial"

3. **Go to Webhooks Settings**
   - Click: Settings → Integrations → Webhooks

4. **Update the Webhook URL**

   **CHANGE FROM:**
   ```
   https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b
   ```

   **CHANGE TO:**
   ```
   https://ignite-growth-uae.com/api/webhook-transformer
   ```

5. **Save Changes**

### Deploy the Code

```bash
# Build the project
bun run build

# Deploy to Cloudflare
wrangler pages publish dist
```

### Test the Integration

**Test Form Submission:**
- Full Name: Test User
- Work Email: test@example.com
- Phone: +971501234567
- Company: Test Company
- Server Location: Meppel (or any from dropdown)

**Verify:**
1. Check JotForm webhook logs - should show success
2. Check Odoo - should show new instance spinning up
3. Check location field - should show "meppel" (not "nl-meppel")

## Troubleshooting

### Location still shows "nl-meppel"
- [ ] Verify JotForm is sending to NEW webhook URL
- [ ] Check transformer logs for transformation
- [ ] Clear cache and test again

### Webhook not firing
- [ ] Verify URL is exactly: `https://ignite-growth-uae.com/api/webhook-transformer`
- [ ] Check JotForm webhook status
- [ ] Check form is published (not draft)

### Data not reaching Odoo
- [ ] Check Odoo webhook endpoint is accessible
- [ ] Verify transformer logs show correct data
- [ ] Check Odoo CRM for new instance records

## File Changes

- ✅ Created: `functions/webhook-transformer.ts`
- ✅ Updated: `wrangler.toml`

## Quick Reference

| Item | Value |
|------|-------|
| Transformer Endpoint | https://ignite-growth-uae.com/api/webhook-transformer |
| Odoo Webhook | https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b |
| JotForm ID | 0198703ffa427218a332abfed80d7948f032 |
| Form Type | 4 Weeks Free Trial |

## Status

- ✅ **Code**: Ready
- ✅ **Configuration**: Complete
- ⏳ **Action Required**: Update JotForm webhook URL
- ⏳ **Deployment**: Deploy when ready
- ⏳ **Testing**: After deployment

---

**Ready to roll!** Just update the JotForm webhook URL and deploy.
