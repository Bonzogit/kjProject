# RoadVault inquiries website

A static, six-language product and enquiry site for the RoadVault vehicle-safe collection.

## Pages

- `index.html` — landing page, product collection, atelier carousel and enquiry paths
- `services.html` — product guidance, vehicle-fit and trade enquiries
- `about.html` — brand story, workshop process and principles
- `contact.html` — Netlify-powered enquiry form and WhatsApp entry points

## Languages

English, Spanish, French, German, Portuguese, and Arabic.

## Before launch

Add the business WhatsApp number in `script.js`:

```js
const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";
```

Use international digits only, without `+`, spaces, or punctuation. Until this is replaced, the buttons open WhatsApp with the enquiry text but do not preselect a recipient.

## Hosting

The Netlify project is configured to publish this folder directly. The form named `roadvault-inquiry` uses Netlify Forms and includes a honeypot field for spam prevention.
