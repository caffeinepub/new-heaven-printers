# New Heaven Printers

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full lead-generation website for New Heaven Printers, a local printing shop in Sangaria, Rajasthan
- Hero section with headline, subheadline, Call Now / WhatsApp / Get Quote CTAs, and trust indicators
- Services section: 7 service cards (Flex, Visiting Card, Pamphlet, Screen, HD Wallpaper, Sunpack, 3D Printing) each with Get Quote button
- Why Choose Us section with 5 selling points
- Gallery grid section showcasing printed work
- Customer Reviews section with 4.8/5 rating and testimonials
- Mid-page CTA section "Need Printing Today?" with Call, WhatsApp, Quote buttons
- Contact form (Name, Phone, Service, Message) stored in backend; submits to backend canister
- Location section with embedded Google Maps iframe for Sadar Bazar, Sangaria
- Footer with business info, hours, Instagram, quick links
- Sticky mobile Call Now button at bottom
- Floating WhatsApp button
- SEO meta tags and local business JSON-LD schema

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: store contact form leads (Name, Phone, Service, Message, timestamp). Admin can view submissions.
2. Generate hero and service imagery.
3. Frontend: implement all 9 sections with mobile-first layout, deep blue/white/orange palette.
4. Wire contact form to backend.
5. Add floating WhatsApp button and sticky mobile call bar.
6. Add JSON-LD LocalBusiness schema in index.html head.
