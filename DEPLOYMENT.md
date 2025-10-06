# Clarik Contact Page - Deployment Guide

## ✅ Project Complete

The Clarik contact landing page is fully built and ready for deployment to Vercel.

## 🎯 Features Implemented

### Hero Section
- ✅ Premium Three.js photorealistic pill visual with studio lighting
- ✅ Responsive layout with copy on left, 3D visual on right
- ✅ Performance optimizations: deferred WebGL init, viewport detection, tab blur pause
- ✅ Device pixel ratio capped at 1.5
- ✅ Static fallback for non-WebGL browsers
- ✅ GSAP scroll-triggered parallax animation
- ✅ Mouse-follow interaction with damping

### Contact Cards
- ✅ Three shadcn/ui cards for Sales, Support, and Press
- ✅ Email addresses with hover effects
- ✅ Response time promises
- ✅ Icon integration with Lucide React

### Contact Form
- ✅ **Slide-to-send button** with animated states (idle, loading, success, error)
- ✅ React Hook Form with Zod validation
- ✅ Department selection dropdown
- ✅ Name, email, company (optional), and message fields
- ✅ Privacy consent checkbox with link to policy
- ✅ Resend email integration via API route
- ✅ Toast notifications for success/error states
- ✅ Full aria-label accessibility
- ✅ English-only copy throughout

### Additional Sections
- ✅ Full-width CTA section with dual buttons
- ✅ Minimal footer with Privacy, Terms, Legal links
- ✅ Legal placeholder pages (Privacy Policy, Terms of Service, Legal Notice)

### Technical Stack
- ✅ Next.js 15 App Router with TypeScript
- ✅ TailwindCSS with dark mode default
- ✅ shadcn/ui components
- ✅ Three.js for 3D pill
- ✅ GSAP with ScrollTrigger
- ✅ Framer Motion for slide button animations
- ✅ React Hook Form + Zod validation
- ✅ Resend Node SDK for email delivery
- ✅ Next Themes (dark mode default)
- ✅ ESLint configuration

## 🚀 Deployment Instructions

### Prerequisites
1. Vercel account
2. Resend account with API key
3. Verified sender domain in Resend

### Step 1: Configure Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (e.g., clarik.app)
3. Create an API key
4. Note your verified sender email (e.g., noreply@clarik.app)

### Step 2: Deploy to Vercel

#### Option A: Via GitHub
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Configure environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   SALES_EMAIL=sales@clarik.app
   SUPPORT_EMAIL=support@clarik.app
   PRESS_EMAIL=press@clarik.app
   FROM_EMAIL=noreply@clarik.app
   ```
5. Click "Deploy"

#### Option B: Via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables:
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add SALES_EMAIL
   vercel env add SUPPORT_EMAIL
   vercel env add PRESS_EMAIL
   vercel env add FROM_EMAIL
   ```

5. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### Step 3: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-project.vercel.app/contact`)
2. Test the Three.js pill animation
3. Test the slide-to-send button
4. Submit a test contact form
5. Verify email receipt at configured addresses

## 🧪 Local Development

### First Time Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your RESEND_API_KEY

# Run development server
npm run dev
```

### Development Commands
```bash
# Run dev server with Turbopack
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint
```

### Local Testing
1. Visit `http://localhost:3000/contact`
2. The root `/` redirects to `/contact`
3. Test all form validations
4. Test email sending (requires RESEND_API_KEY)

## 📧 Email Configuration

The contact form sends emails via Resend to:
- **Sales**: sales@clarik.app (24hr response)
- **Support**: support@clarik.app (12hr response)
- **Press**: press@clarik.app (48hr response)

Email templates are HTML formatted with:
- Professional layout
- Contact information display
- Formatted message body
- Reply-to set to sender's email

## 🎨 Theme & Styling

- **Default Theme**: Dark mode (as specified)
- **Color Scheme**: HSL-based with CSS variables
- **Typography**: Inter font family
- **Responsive**: Mobile-first design
- **Icons**: Lucide React

## ⚡ Performance Features

### Three.js Optimization
- Deferred initialization (100ms after first paint)
- IntersectionObserver for viewport detection
- Tab visibility API integration
- Device pixel ratio capping (1.5 max)
- Animation pausing when out of view
- Proper cleanup on unmount

### General Optimization
- Next.js 15 App Router
- Turbopack for faster builds
- Static page generation where possible
- Optimized bundle size
- Tree-shaking enabled

## 🔒 Security & Privacy

- Privacy consent required before form submission
- Clinical-grade security messaging
- Environment variables for sensitive data
- Input validation with Zod
- XSS protection via React
- CSRF protection via Next.js

## 📱 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **WebGL support**: Required for 3D pill (fallback provided)
- **Mobile**: iOS Safari 14+, Android Chrome 90+

## 🐛 Troubleshooting

### Email not sending
- Verify RESEND_API_KEY is set in Vercel
- Check sender domain is verified in Resend
- Verify FROM_EMAIL matches verified domain

### 3D pill not showing
- Check browser WebGL support
- Verify Three.js dependencies installed
- Check browser console for errors

### Build failures
- Run `npm install` to ensure all dependencies
- Check Node.js version (18+ recommended)
- Verify TypeScript types with `npm run build`

## 📞 Support

For deployment issues:
- Check Vercel deployment logs
- Review Resend dashboard for email delivery status
- Verify all environment variables are set

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Domain connected (optional)
- [ ] SSL certificate active (automatic via Vercel)
- [ ] Test email sent and received
- [ ] Three.js pill animating smoothly
- [ ] Slide-to-send button working
- [ ] All form validations working
- [ ] Mobile responsive design verified
- [ ] Dark mode displaying correctly

---

**Status**: ✅ Production Ready

Built with ❤️ for Clarik
