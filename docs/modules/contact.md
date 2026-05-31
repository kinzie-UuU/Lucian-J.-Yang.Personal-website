# Contact

## Purpose

Contact owns the user-facing contact surface: Gmail compose form, social links, WeChat QR modal, and toast feedback.

## Owned Files

- `index.html`
- `styles/contact.css`
- `scripts/contact-interactions.js`
- `images/wechat-qr.jpg`

## DOM Contracts

- Contact section root.
- Contact form fields.
- Submit button.
- Toast node.
- WeChat trigger, modal, backdrop, and close button.

## Runtime Contracts

- Uses `window.LucianRuntime` for sound where available.
- Opens Gmail compose in a new browser tab/window.
- Modal should close by button, backdrop, and Escape.

## Change Checklist

- Keep form field names aligned with Gmail URL builder.
- If QR asset changes, update asset path and run project check.
- Keep modal focus and close behavior accessible.
- Keep external links using safe `noopener` behavior.

## QA

- Form builds expected Gmail subject/body.
- Submit opens a Gmail compose URL.
- QR modal opens and closes by all supported methods.
- Toast appears and clears correctly.
- Keyboard Escape closes the modal.
