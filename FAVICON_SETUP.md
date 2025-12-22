# Favicon Setup Guide - SGC TECH AI

## 🎨 Selected Icon
**AI Brain Icon** (`21-ai-brain.png`) - Represents intelligence, innovation, and AI transformation

Source: `public/icons/industry/21-ai-brain.png`

---

## 🚀 Quick Setup (3 Methods)

### Method 1: Online Converter (Recommended - Easiest)

1. **Go to**: https://favicon.io/favicon-converter/
2. **Upload**: `d:\RUNNING APPS\website\ignite-growth-uae\public\icons\industry\21-ai-brain.png`
3. **Download** the generated favicon package
4. **Extract** all files to your project

**Files you'll get:**
- `favicon.ico` → Copy to `public/`
- `favicon-16x16.png` → Copy to `public/` and `favicon/`
- `favicon-32x32.png` → Copy to `public/` and `favicon/`
- `apple-touch-icon.png` → Copy to `public/` and `favicon/`
- `android-chrome-192x192.png` → Copy to `public/` and `favicon/`
- `android-chrome-512x512.png` → Copy to `public/` and `favicon/`

---

### Method 2: RealFaviconGenerator (Most Comprehensive)

1. **Go to**: https://realfavicongenerator.net/
2. **Upload**: `21-ai-brain.png`
3. **Customize**:
   - iOS: Keep original design
   - Android: Keep original design
   - Windows: Choose accent color (Electric Cyan: #00FFFF)
   - macOS Safari: Keep original
4. **Generate** and download package
5. **Follow** their installation instructions

---

### Method 3: Manual Installation (ImageMagick)

**Install ImageMagick:**
```powershell
# Windows (using Chocolatey)
choco install imagemagick

# Or download from: https://imagemagick.org/script/download.php
```

**Then run:**
```powershell
powershell -ExecutionPolicy Bypass -File generate-favicon.ps1
```

---

## 📝 Update HTML (After generating favicons)

Update `index.html` in the `<head>` section:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Theme Color -->
<meta name="theme-color" content="#0A1628">
<meta name="msapplication-TileColor" content="#0A1628">
```

---

## 📋 Update `site.webmanifest`

Update `favicon/site.webmanifest`:

```json
{
  "name": "SGC TECH AI - Ignite Growth UAE",
  "short_name": "SGC TECH AI",
  "description": "AI-Powered Business Transformation - 150-200% ROI Guaranteed",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0A1628",
  "background_color": "#0A1628",
  "display": "standalone",
  "start_url": "/",
  "scope": "/"
}
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Favicon appears in browser tab
- [ ] Correct icon shows when bookmarked
- [ ] Mobile home screen icon works (iOS/Android)
- [ ] PWA manifest loads correctly
- [ ] Theme color matches brand (#0A1628)

**Test Tools:**
- https://realfavicongenerator.net/favicon_checker
- Browser DevTools → Application → Manifest
- Mobile device testing

---

## 🎨 Brand Colors Reference

**Deep Navy (Background)**: `#0A1628`
**Electric Cyan (Accent)**: `#00FFFF`
**Neon Green (Accent)**: `#00FF00`
**Gold (Premium)**: `#FFD700`

---

## 📁 Expected File Structure

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest

favicon/
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest
```

---

## 🚨 Important Notes

1. **Source Icon**: Always use `21-ai-brain.png` as the master source
2. **Maintain Aspect Ratio**: Don't distort the icon
3. **Transparent Background**: Ensure PNG transparency is preserved
4. **Test on Devices**: Check iOS, Android, Windows, macOS
5. **Update Manifest**: Keep `site.webmanifest` in sync with actual files

---

## 🔗 Useful Resources

- **Favicon Generator**: https://favicon.io/
- **Real Favicon Generator**: https://realfavicongenerator.net/
- **Favicon Checker**: https://realfavicongenerator.net/favicon_checker
- **ImageMagick**: https://imagemagick.org/
- **Web App Manifest**: https://web.dev/add-manifest/

---

**Created**: December 22, 2025  
**Icon**: AI Brain (#21) - Intelligence & Innovation  
**Brand**: SGC TECH AI / Ignite Growth UAE
