# DNS Setup Guide for sgctech.ai

## Quick Setup (3 Steps)

### Step 1: Get Your Cloudflare Credentials

#### A. Get API Token
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Use **"Edit zone DNS"** template
4. **Zone Resources**: Include → Specific zone → `sgctech.ai`
5. Click **"Continue to summary"** → **"Create Token"**
6. **Copy the token** (you'll only see it once!)

#### B. Get Zone ID
1. Go to: https://dash.cloudflare.com
2. Click on **sgctech.ai** domain
3. Scroll down on Overview page - **Zone ID** is on the right sidebar
4. Copy the Zone ID

#### C. Get Account ID
1. While on Cloudflare dashboard
2. Look at the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/...`
3. Copy the Account ID from URL
   - OR find it in **Account Settings** → **Account ID**

---

### Step 2: Update the Script

Open `setup-dns.ps1` and replace these lines:

```powershell
$CLOUDFLARE_API_TOKEN = "YOUR_API_TOKEN_HERE"      # Paste your API Token
$CLOUDFLARE_ZONE_ID = "YOUR_ZONE_ID_HERE"          # Paste your Zone ID
$CLOUDFLARE_ACCOUNT_ID = "YOUR_ACCOUNT_ID_HERE"    # Paste your Account ID
```

---

### Step 3: Run the Script

```powershell
cd "d:\RUNNING APPS\website\ignite-growth-uae"
.\setup-dns.ps1
```

The script will:
- ✅ Add sgctech.ai and www.sgctech.ai to Cloudflare Pages
- ✅ Create CNAME DNS records pointing to your deployment
- ✅ Enable Cloudflare proxy (orange cloud)
- ✅ Verify the configuration

---

## Manual Setup (Alternative)

If you prefer to do it manually:

### In Cloudflare Dashboard:

1. **Add Custom Domains to Pages**:
   - Go to: https://dash.cloudflare.com → **Pages** → **ignite-growth-uae**
   - Click **"Custom domains"** tab
   - Click **"Set up a custom domain"**
   - Enter: `sgctech.ai` → Click **"Continue"**
   - Repeat for: `www.sgctech.ai`

2. **Configure DNS**:
   - Go to your domain: **sgctech.ai** → **DNS** → **Records**
   - Click **"Add record"**
   
   **Record 1 (Root domain):**
   ```
   Type: CNAME
   Name: @
   Target: ignite-growth-uae.pages.dev
   Proxy status: Proxied (orange cloud ON)
   TTL: Auto
   ```
   
   **Record 2 (WWW subdomain):**
   ```
   Type: CNAME
   Name: www
   Target: ignite-growth-uae.pages.dev
   Proxy status: Proxied (orange cloud ON)
   TTL: Auto
   ```

3. **Wait & Test**:
   - Wait 5-15 minutes for DNS propagation
   - Visit: https://sgctech.ai/
   - SSL will auto-provision within 24 hours

---

## Troubleshooting

### "Domain already exists" error
- Domain is already configured! Just set up DNS records (Step 2 above)

### DNS not resolving
- Run: `nslookup sgctech.ai`
- Should return Cloudflare IP addresses
- Wait up to 1 hour for global DNS propagation

### SSL Certificate issues
- Cloudflare auto-provisions SSL within 24 hours
- Check status: Pages project → Custom domains → Certificate status

### 522 or 524 errors
- Your deployment might have issues
- Check: https://ignite-growth-uae.pages.dev (should work)
- Verify DNS CNAME points to correct target

---

## Quick Check Commands

```powershell
# Check DNS resolution
nslookup sgctech.ai

# Check if CNAME is correct
nslookup sgctech.ai 1.1.1.1

# Test HTTP response
curl https://sgctech.ai -I
```

---

## Current Deployment URLs

- **Primary**: https://ignite-growth-uae.pages.dev
- **Latest**: https://98192f59.ignite-growth-uae.pages.dev
- **Custom** (once DNS configured): https://sgctech.ai

---

**Need help?** Check Cloudflare status or share any error messages you see!
