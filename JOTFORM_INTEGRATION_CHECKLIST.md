# 🔧 JotForm → Odoo Integration Checklist

## ✅ What's Been Done

- [x] Created webhook transformer function
- [x] Configured location field fixing ("nl-meppel" → "meppel")
- [x] Set up field name mappings
- [x] Updated Cloudflare configuration
- [x] Created documentation

## ⏳ What You Need to Do

### Step 1: Update JotForm Webhook URL
- [ ] Login to JotForm dashboard
- [ ] Find form: `0198703ffa427218a332abfed80d7948f032` (4 Weeks Free Trial)
- [ ] Go to Settings → Integrations → Webhooks
- [ ] Change URL from:
  ```
  https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b
  ```
  To:
  ```
  https://ignite-growth-uae.com/api/webhook-transformer
  ```
- [ ] Save changes

### Step 2: Deploy the Code
- [ ] Run: `bun run build`
- [ ] Deploy to Cloudflare: `wrangler pages publish dist`
- [ ] Wait for deployment to complete

### Step 3: Test the Integration
- [ ] Submit a test form with:
  - Name: Test User
  - Email: test@example.com
  - Location: Meppel
  - Phone: +971501234567
- [ ] Check JotForm webhook logs for success
- [ ] Check Odoo CRM for new lead
- [ ] Verify location shows "meppel" (not "nl-meppel")

### Step 4: Monitor & Verify
- [ ] Check first real submission works
- [ ] Verify all fields map correctly
- [ ] Confirm location field is fixed
- [ ] Check that all contact details are in Odoo

## 📋 Location Field Fix Details

### Automatic Transformations
| Input | Output |
|-------|--------|
| nl-meppel | meppel |
| nl_meppel | meppel |
| NL-Meppel | meppel |
| NL-meppel | meppel |

### Wildcard Fix
Any location starting with "nl-" or "nl_" will automatically remove the prefix.

## 📞 Field Names Supported

The transformer recognizes these JotForm field names and maps them to Odoo:

- `name` → Full Name
- `email` → Email
- `phone` → Phone Number
- `company` → Company Name
- `location` → Location/City
- `industry` → Industry
- `employees` → Number of Employees
- `budget` → Budget Range
- `message` → Message

## 🔍 Debugging

### If webhook fails:
1. Check JotForm webhook logs
2. Verify the new URL is exactly: `https://ignite-growth-uae.com/api/webhook-transformer`
3. Check Cloudflare Pages logs
4. Review transformer error messages

### If location still shows "nl-meppel":
1. Verify JotForm is sending to new webhook URL
2. Check transformer logs for the transformation
3. Verify Odoo received the transformed data

### If fields are not mapping:
1. Check field names in JotForm match the mapping list
2. Add new mappings in `functions/webhook-transformer.ts` if needed
3. Redeploy after changes

## 📁 Files Modified

- `functions/webhook-transformer.ts` - Main webhook handler
- `wrangler.toml` - Cloudflare configuration

## 🚀 Deployment Status

- **Code**: ✅ Ready
- **Configuration**: ⏳ Awaiting JotForm update
- **Testing**: ⏳ Pending deployment

## 💬 Quick Reference

**Webhook Endpoint**: `https://ignite-growth-uae.com/api/webhook-transformer`
**Odoo Webhook**: `https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b`
**JotForm ID**: `0198703ffa427218a332abfed80d7948f032`

---

**Need help?** Check `JOTFORM_WEBHOOK_CONFIG.md` for detailed instructions
