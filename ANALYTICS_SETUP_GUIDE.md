# Google Analytics 4 Setup Guide

## Overview
Your website now has Google Analytics 4 (GA4) integrated with custom event tracking for video interactions and conversions.

## Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com/
2. Click "Start measuring" or "Admin" (gear icon)
3. Create a new account:
   - **Account Name**: "SGC TECH AI"
   - **Property Name**: "SGC TECH AI Website"
   - **Time Zone**: Your timezone
   - **Currency**: Your currency

## Step 2: Get Your Measurement ID

1. After creating the property, you'll receive a **Measurement ID** (format: `G-XXXXXXXXXX`)
2. **Copy this ID** - you'll need it for the next step

## Step 3: Update Your Website

### Replace Placeholder in `index.html`

Open `index.html` and find these two lines (around line 20-30):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

and

```javascript
gtag('config', 'G-XXXXXXXXXX', {
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID** in BOTH places.

Example:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ4"></script>
```

```javascript
gtag('config', 'G-ABC123XYZ4', {
```

## Step 4: Deploy Updated Code

```powershell
git add index.html
git commit -m "[CONFIG] Add Google Analytics measurement ID"
git push origin main
npm run build
npx wrangler pages deploy dist --project-name=ignite-growth-uae
```

## What's Being Tracked

### Automatic Tracking
- **Page Views**: Every time someone visits your site
- **User Sessions**: How long users stay
- **Device Type**: Mobile, tablet, desktop
- **Geographic Location**: Where visitors are from
- **Traffic Sources**: How users found your site (Google, direct, social, etc.)

### Custom Video Events
| Event | When It Fires | Category | Label |
|-------|---------------|----------|-------|
| `video_start` | User starts watching logo reveal | Video | Logo Reveal Video |
| `video_complete` | User finishes logo reveal | Video | Logo Reveal Video |
| `video_skip` | User skips logo reveal | Video | Logo Reveal Video |
| `video_start` | User starts watching CEO message | Video | CEO Message Video |
| `video_complete` | User finishes CEO message | Video | CEO Message Video |
| `video_skip` | User skips CEO message | Video | CEO Message Video |

### Conversion Tracking Ready
The site has `window.trackConversion()` function ready for:
- Form submissions
- Consultation bookings
- Contact button clicks
- Newsletter signups

**Example usage** (add to your contact form):
```javascript
window.trackConversion('consultation_booking', 1);
```

## Step 5: Verify Installation

1. Open your website: https://sgctech.ai
2. Open Google Analytics dashboard
3. Go to **Reports > Realtime**
4. You should see yourself as an active user
5. Play with the videos - you'll see events appear in real-time

## Key Metrics to Monitor

### Business Goals (C-Suite Decision Makers)

**Conversion Funnel:**
1. **Landing Page Views** → How many visitors arrive
2. **Video Start Rate** → % who engage with content
3. **Video Completion Rate** → % who watch full message
4. **CTA Clicks** → % who take action

**Success Benchmarks:**
- Video Start Rate: >70% (Good), >85% (Excellent)
- Video Completion Rate: >50% (Good), >65% (Excellent)
- Skip Rate: <30% (Good), <20% (Excellent)

### Analytics Reports to Set Up

1. **Conversion Path Analysis**
   - Track journey from video → consultation booking
   
2. **Audience Segmentation**
   - Mobile vs Desktop engagement
   - Geographic performance (UAE, Gulf region, etc.)
   
3. **Video Performance Dashboard**
   - Create custom report for all video events
   - Compare completion rates by device/location

## Custom Event Implementation

If you want to add more tracking events:

```javascript
// Track button clicks
document.getElementById('cta-button').addEventListener('click', () => {
  window.trackConversion('cta_clicked', 1);
});

// Track form submissions
form.addEventListener('submit', () => {
  window.trackConversion('form_submission', 1);
});

// Track scroll depth
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100;
  if (scrollPercent > 75) {
    window.trackVideoEvent('scroll_depth', '75_percent');
  }
});
```

## Advanced: Set Up Goals in GA4

1. In GA4, go to **Admin > Events > Create Event**
2. Create custom events for:
   - **Goal: Consultation Booking** (high value)
   - **Goal: Video Engagement** (watched >50%)
   - **Goal: Return Visitor** (came back within 7 days)

3. Assign monetary values:
   - Video completion: $0 (awareness)
   - Form submission: $50 (lead)
   - Consultation booked: $500 (qualified lead)

## Troubleshooting

### Events Not Showing?
1. Check browser console for errors
2. Verify Measurement ID is correct (no spaces)
3. Wait 24-48 hours for full data processing
4. Use GA4 DebugView for real-time debugging

### Video Events Missing?
1. Ensure videos are playing (not blocked by browser)
2. Check `window.trackVideoEvent` exists in console
3. Verify TypeScript types are correct (already done)

## Privacy & GDPR Compliance

Your current setup is privacy-friendly:
- ✅ No personally identifiable information (PII) collected
- ✅ IP anonymization enabled by default in GA4
- ✅ Cookie consent not required for basic analytics (verify with legal)

**Recommended:** Add cookie consent banner if targeting EU users extensively.

## Next Steps

1. **Replace GA4 ID** in `index.html`
2. **Deploy** updated code
3. **Verify** in GA4 Realtime reports
4. **Set up custom dashboards** for video metrics
5. **Monitor for 2 weeks** to establish baseline
6. **Optimize** based on data (adjust video length, CTA placement)

## Support Resources

- GA4 Documentation: https://support.google.com/analytics/
- Event Tracking Guide: https://developers.google.com/analytics/devguides/collection/ga4/events
- Your implementation is in: `index.html` (lines 20-46)

---

**Last Updated**: November 24, 2025  
**Version**: 1.0  
**Status**: Ready for Production
