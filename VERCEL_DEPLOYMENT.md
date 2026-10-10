# Deploying NisKart to Vercel

NisKart is fully configured for zero-configuration, production-grade deployment on **Vercel**.

---

## 🚀 Quick Deployment Guide

### Option 1: Deploy via GitHub / GitLab / Bitbucket (Recommended)
1. Push your NisKart project repository to **GitHub**.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your **NisKart** repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. (Optional) Under **Environment Variables**, add any custom values (see below).
6. Click **Deploy**. Your site will be live on an `.vercel.app` domain in seconds!

---

### Option 2: Deploy via Vercel CLI
If you have the Vercel CLI installed on your machine:
```bash
# Login to Vercel
npx vercel login

# Deploy preview
npx vercel

# Deploy production
npx vercel --prod
```

---

## ⚙️ Architecture on Vercel
- **Frontend SPA**: Built with Vite + React 19 + Tailwind CSS, served directly via Vercel's Edge Global CDN with instantaneous asset caching and SPA rewrite handling (`/(.*) -> /index.html`).
- **Backend API**: The `/api/index.ts` serverless function handles all backend routes (`/api/data`, `/api/orders`, `/api/admin/*`, `/api/payment/*`) using Express.
- **`vercel.json`**: Pre-configured rewrites route `/api/*` to `/api/index.ts` and client requests to `/index.html`.
- **Zero Cold-Start Lag**: NisKart includes bundled initial catalog fallbacks so visitors see products immediately even before API hydration.

---

## 🔐 Environment Variables (Optional)
You can configure these in **Vercel Dashboard > Project Settings > Environment Variables**:

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_PASSWORD` | Passcode for Admin Panel login | `NiShAlDaMoR143` |
| `WEB3FORMS_ACCESS_KEY` | Key for order notification email alerts | Configured in store settings |
| `SMTP_HOST` | Custom SMTP host (e.g. `smtp.gmail.com`) | None |
| `SMTP_PORT` | Custom SMTP port (e.g. `587`) | `587` |
| `SMTP_USER` | SMTP username/email | None |
| `SMTP_PASS` | SMTP password/app password | None |
| `SMTP_FROM` | Outgoing sender header | `NisKart Orders <orders@niskart.com>` |

---

## 🛍️ Features Ready in Production
- **1 to 5 Product Images**: Upload/select up to 5 images per product in the Admin Panel with high-resolution gallery thumbnails.
- **MP City Doorstep Delivery**: Express delivery selector for Dewas, Hatpipliya, Bagli, and Indore.
- **UPI QR & Card Simulation**: Live dynamic UPI QR generator with ₹50 online payment discount.
- **Admin Management Panel**: Manage products, orders, banners, custom categories, and email outbox directly at `/` (click Admin in footer or press Admin login).
