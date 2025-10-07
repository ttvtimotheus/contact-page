# Clarik Contact Landing Page

A premium contact landing page built with Next.js 15, featuring a photorealistic Three.js pill visual and Resend email integration.

## Features

- **Three.js Pill Visual**: Photorealistic capsule with studio lighting and smooth animations
- **Dark Mode**: Default dark theme with Next Themes
- **Contact Form**: React Hook Form with Zod validation and Resend integration
- **Performance Optimized**: Deferred WebGL, view-based animation control, capped device pixel ratio
- **Responsive Design**: Mobile-first design with TailwindCSS and shadcn/ui

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Three.js
- GSAP
- React Hook Form + Zod
- Resend
- Next Themes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

Add your Resend API key to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000/contact](http://localhost:3000/contact)

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key (required)
- `SALES_EMAIL`: Sales contact email (default: sales@clarik.app)
- `SUPPORT_EMAIL`: Support contact email (default: support@clarik.app)
- `PRESS_EMAIL`: Press contact email (default: press@clarik.app)
- `FROM_EMAIL`: Email sender address (must be verified in Resend)

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Structure

```
/app
  /contact - Contact landing page
  /api/contact - Contact form API endpoint
/components
  /ui - shadcn/ui components
  /three - Three.js pill component
/lib - Utilities and validation schemas
```

## License

Proprietary - Clarik ( By Estopia )