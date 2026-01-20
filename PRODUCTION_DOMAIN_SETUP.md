# SGC TECH AI - Custom Domain Setup Guide

**Domain:** sgctech.ai  
**Project:** ignite-growth-uae (Cloudflare Pages)

---

## ✅ Files Already Configured

### 1. CNAME File
**Location:** `public/CNAME`
```
sgctech.ai
```
✅ Ready

### 2. Redirects File
**Location:** `public/_redirects`
```
# Redirect pages.dev to custom domain
https://ignite-growth-uae.pages.dev/* https://sgctech.ai/:splat 301!
https://*.ignite-growth-uae.pages.dev/* https://sgctech.ai/:splat 301!

# SPA routing
/* /index.html 200
```
✅ Ready

---

## 🚀 Setup Steps

### Step 1: Deploy Latest Build

```powershell
# Build and deploy
npm run build
npm run deploy:cf
```

### Step 2: Add Custom Domain in Cloudflare Pages

1. **Go to Cloudflare Dashboard:**
   - URL: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **Pages**
   - Select: **ignite-growth-uae**

2. **Add Custom Domain:**
   - Click: **Custom domains** tab
   - Click: **Set up a custom domain**
   - Enter: `sgctech.ai`
   - Click: **Continue**
   - Cloudflare will verify and configure automatically

3. **Add WWW subdomain:**
   - Click: **Set up a custom domain** again
   - Enter: `www.sgctech.ai`
   - Click: **Continue**

### Step 3: Configure DNS Records

**If sgctech.ai domain is NOT in Cloudflare:**

1. Go to your domain registrar (where you bought sgctech.ai)
2. Update nameservers to Cloudflare's:
   ```
   bob.ns.cloudflare.com
   jill.ns.cloudflare.com
   ```
   (Use the exact nameservers Cloudflare provides)

**If sgctech.ai domain IS in Cloudflare:**

1. Go to: **Cloudflare Dashboard** → **sgctech.ai** → **DNS** → **Records**
2. Add these records:

   **Record 1 - Root Domain:**
   - Type: `CNAME`
   - Name: `@`
   - Target: `ignite-growth-uae.pages.dev`
   - Proxy status: ✅ Proxied (orange cloud)
   - TTL: Auto

   **Record 2 - WWW Subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `ignite-growth-uae.pages.dev`
   - Proxy status: ✅ Proxied (orange cloud)
   - TTL: Auto

### Step 4: Enable SSL/TLS

1. Go to: **SSL/TLS** tab in Cloudflare
2. Set encryption mode to: **Full (strict)**
3. Enable: **Always Use HTTPS**
4. Enable: **Automatic HTTPS Rewrites**

### Step 5: Verify Setup

Wait 5-10 minutes for DNS propagation, then test:

```powershell
# Test root domain
curl -I https://sgctech.ai

# Test www subdomain
curl -I https://www.sgctech.ai

# Test pages.dev redirect
curl -I https://ignite-growth-uae.pages.dev
```

**Expected Results:**
- ✅ `HTTP/2 200` or `301` redirect
- ✅ SSL certificate valid
- ✅ Pages.dev URLs redirect to sgctech.ai

---

## 🔧 Troubleshooting

### Domain Not Working?

**Check DNS Propagation:**
```powershell
nslookup sgctech.ai
nslookup www.sgctech.ai
```

**Check SSL:**
```powershell
curl -vI https://sgctech.ai 2>&1 | grep -i "ssl\|certificate"
```

**Common Issues:**

1. **DNS not propagated yet**
   - Wait 5-30 minutes
   - Clear DNS cache: `ipconfig /flushdns` (Windows)

2. **SSL Certificate Pending**
   - Cloudflare auto-provisions SSL
   - Can take up to 24 hours
   - Check: Cloudflare Dashboard → SSL/TLS → Edge Certificates

3. **Custom domain not showing in Pages**
   - Re-add the domain in Pages settings
   - Make sure DNS records are correct

4. **Getting 522 or 520 errors**
   - Check Pages deployment is successful
   - Verify Pages project is not paused

---

## ✅ Post-Setup Checklist

After setup is complete:

- [ ] https://sgctech.ai loads correctly
- [ ] https://www.sgctech.ai loads correctly
- [ ] https://ignite-growth-uae.pages.dev redirects to sgctech.ai
- [ ] SSL certificate is valid (green padlock in browser)
- [ ] All pages load without errors
- [ ] Forms submit correctly
- [ ] No mixed content warnings
- [ ] Mobile version works
- [ ] All assets (images, videos) load
- [ ] Performance is good (< 3s load time)

---

## 📊 Performance Optimization (After Domain Setup)

### Enable Cloudflare Features:

1. **Auto Minify** (CSS, JS, HTML)
2. **Brotli Compression**
3. **Rocket Loader** (async JS)
4. **Mirage** (lazy image loading)
5. **Polish** (image optimization)
6. **Argo Smart Routing** (premium - faster routing)

### Cache Configuration:

**Browser Cache TTL:** 4 hours  
**Caching Level:** Standard  
**Always Online:** ✅ Enabled

---

## 🎯 Quick Commands

### Deploy to Production
```powershell
npm run deploy:fresh
```

### Check Deployment Status
```powershell
npx wrangler pages deployment list --project-name=ignite-growth-uae
```

### Test Production Build Locally
```powershell
npm run build
npm run preview
```

### Force SSL Redirect
Already configured in `_redirects` file ✅

---

## 📝 Notes

- **Production Branch:** main
- **Auto Deploy:** ✅ Enabled (on git push to main)
- **Build Command:** `npm run build`
- **Build Output:** `dist/`
- **Node Version:** 18+ (configured in Cloudflare)
- **Framework:** Vite (auto-detected)

---

## 🔐 Environment Variables (if needed)

If you need to add secrets in production:

1. Go to: **Pages** → **ignite-growth-uae** → **Settings** → **Environment variables**
2. Add variables for **Production** environment
3. Redeploy for changes to take effect

**Current Variables:**
- None required (all config in code)

---

## 📞 Support

**Cloudflare Pages Docs:** https://developers.cloudflare.com/pages  
**Custom Domains Guide:** https://developers.cloudflare.com/pages/platform/custom-domains  
**DNS Records Guide:** https://developers.cloudflare.com/dns

---

**Setup Date:** January 20, 2026  
**Status:** Ready for production deployment  
**Next Step:** Execute Step 2 (Add custom domain in Cloudflare dashboard)
