# Deploying NisKart to Vercel

NisKart is fully configured for zero-configuration, production-grade deployment on **Vercel** with full-stack serverless functions and safe JSON handling.

---

## 🚀 Quick Deployment Guide

### Option 1: Deploy via GitHub / GitLab / Bitbucket (Recommended)
1. Push your NisKart project repository to **GitHub**.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your **NisKart** repository.
4. Vercel automatically detects the framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Under **Environment Variables**, add any optional values (see below).
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain.

---

### Option 2: Deploy via Vercel CLI
```bash
# Login to Vercel
npx vercel login

# Deploy preview
npx vercel

# Deploy production
npx vercel --prod
```

---

## ⚙️ Architecture & How It Works on Vercel

1. **Frontend SPA**:
   - Built with Vite, React 19, and Tailwind CSS.
   - Output directory is `dist`.
   - `vercel.json` rewrites all non-API paths (`/(.*)`) to `/index.html` for client-side routing.

2. **Serverless Backend API**:
   - `/api/index.ts` and catch-all `/api/[...path].ts` handle all `/api/*` endpoints via Express.
   - `vercel.json` rewrites `/api/(.*)` to `/api/$1`.
   - `includeFiles: "data/**"` bundles the initial JSON catalog into Vercel's lambda container.

3. **Data Persistence on Vercel**:
   - In serverless runtime, write operations write to `/tmp/niskart-data/store.json` and keep an in-memory cache, ensuring safe execution without read-only filesystem crashes.

4. **JSON Error Handling**:
   - All API requests use `src/utils/apiClient.ts` which verifies HTTP status codes and `Content-Type: application/json` before attempting parsing.
   - Prevents `SyntaxError: Unexpected token 'A', 'A server e...' is not valid JSON` when serverless errors occur.

---

## 🔐 Environment Variables (Optional)

Configure these in **Vercel Dashboard > Project Settings > Environment Variables**:

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_PASSWORD` | Passcode for Admin Panel login | `NiShAlDaMoR143` |
| `WEB3FORMS_ACCESS_KEY` | Key for email alerts | `333eb717-7c70-4f5c-aec4-599e5ccdc263` |
| `SMTP_HOST` | Custom SMTP host (e.g. `smtp.gmail.com`) | Optional |
| `SMTP_PORT` | Custom SMTP port (e.g. `587`) | `587` |
| `SMTP_USER` | SMTP username/email | Optional |
| `SMTP_PASS` | SMTP password/app password | Optional |
| `SMTP_FROM` | Outgoing sender header | `NisKart Orders <orders@niskart.com>` |
