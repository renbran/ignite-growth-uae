# Real Device QA Checklist – Ignite Growth UAE

## Devices
- [ ] iPhone SE (Safari, Chrome)
- [ ] iPhone 12/14 Pro (Safari, Chrome)
- [ ] Samsung Galaxy A12 (Chrome)
- [ ] Samsung Galaxy S23 (Chrome)
- [ ] iPad Air (Safari, Chrome)
- [ ] Windows Desktop (Chrome, Edge, Firefox)
- [ ] Mac Desktop (Safari, Chrome, Firefox)

## Networks
- [ ] Slow 3G (real, not emulated)
- [ ] 4G LTE
- [ ] WiFi
- [ ] Offline mode (Service Worker)

## Tests
- [ ] Page load speed (<3s on Slow 3G)
- [ ] Smooth scrolling, no jank
- [ ] Touch targets ≥44px
- [ ] All videos/images lazy load
- [ ] No layout shift (CLS < 0.1)
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Screen reader compatibility
- [ ] Color contrast (WCAG AA)
- [ ] All CTAs clickable
- [ ] No console errors
- [ ] Service worker offline support
- [ ] Return visit speed (<1s)
- [ ] All links working

## Notes
- Record any device-specific issues or performance gaps
- Attach screenshots for visual bugs
- Log Lighthouse scores for each device

---

**Last Updated:** February 23, 2026
**Maintainer:** GitHub Copilot for SGC TECH AI / Ignite Growth UAE
