# 🚀 BookBloom Deployment Guide

## Overview

BookBloom is a Next.js 14+ application that can be deployed to various platforms. This guide covers deployment to Netlify (current), Vercel, Railway, and DigitalOcean.

## 📋 Pre-deployment Checklist

- [ ] All tests passing
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Database schema up to date
- [ ] Static assets optimized
- [ ] Performance optimized

---

## 🌐 Netlify Deployment (Current)

BookBloom is currently configured for Netlify deployment with the following setup.

### Configuration Files

#### `netlify.toml`
```toml
[build]
  command = "cd bookbloom && npm run build"
  publish = "bookbloom/.next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "bookbloom/.netlify/functions"
```

### Environment Variables

Set these in Netlify dashboard under Site Settings > Environment Variables:

```env
# Database
DATABASE_URL=file:./dev.db

# AI Integration (Optional)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Next.js
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NODE_ENV=production
```

### Deployment Steps

1. **Connect GitHub Repository**
   - Link your GitHub repository to Netlify
   - Select the main branch for auto-deployment

2. **Configure Build Settings**
   - Build command: `cd bookbloom && npm run build`
   - Publish directory: `bookbloom/.next`
   - Node version: 18+

3. **Set Environment Variables**
   - Add all required environment variables in Netlify dashboard

4. **Deploy**
   - Netlify will automatically deploy on every push to main
   - Monitor build logs for any issues

### Database Considerations

For Netlify deployment with SQLite:
- Database file is included in build
- Changes are not persistent between deploys
- Consider using external database for production

---

## ▲ Vercel Deployment

Vercel provides native Next.js support and is an excellent hosting option.

### Configuration

#### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "bookbloom/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "bookbloom/$1"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "ANTHROPIC_API_KEY": "@anthropic_api_key"
  }
}
```

### Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Root**
   ```bash
   cd bookbloom
   vercel
   ```

4. **Configure Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add ANTHROPIC_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Vercel Features
- Automatic deployments from Git
- Preview deployments for PRs
- Edge functions support
- Built-in analytics
- Custom domains

---

## 🚂 Railway Deployment

Railway is great for full-stack applications with database needs.

### Configuration

#### `railway.toml`
```toml
[build]
  builder = "nixpacks"

[deploy]
  startCommand = "cd bookbloom && npm start"
  healthcheckPath = "/"
  healthcheckTimeout = 300
```

### Database Setup

1. **Add PostgreSQL Service**
   ```bash
   railway add postgresql
   ```

2. **Update Prisma Schema**
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Update Environment Variables**
   ```env
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ANTHROPIC_API_KEY=your_api_key
   NODE_ENV=production
   ```

### Deployment Steps

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   railway init
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Run Database Migrations**
   ```bash
   railway run npx prisma migrate deploy
   ```

---

## 🌊 DigitalOcean App Platform

DigitalOcean App Platform offers a simple deployment experience.

### Configuration

#### `.do/app.yaml`
```yaml
name: bookbloom
services:
- name: web
  source_dir: bookbloom
  github:
    repo: your-username/bookbloom
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: "production"
  - key: DATABASE_URL
    value: "${db.DATABASE_URL}"
  - key: ANTHROPIC_API_KEY
    value: "${ANTHROPIC_API_KEY}"

databases:
- name: db
  engine: PG
  version: "13"
  size: basic-xs
```

### Deployment Steps

1. **Connect GitHub Repository**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Source directory: `bookbloom`
   - Build command: `npm run build`
   - Run command: `npm start`

3. **Add Database**
   - Add PostgreSQL database component
   - Update DATABASE_URL environment variable

4. **Set Environment Variables**
   - Add required environment variables

5. **Deploy**
   - DigitalOcean will build and deploy automatically

---

## 🗄️ Database Deployment Options

### SQLite (Development/Demo)
```env
DATABASE_URL="file:./dev.db"
```
- Good for: Development, demos, prototypes
- Limitations: Not suitable for production, no persistence on serverless

### PostgreSQL (Recommended for Production)
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```
- Good for: Production applications
- Providers: Railway, DigitalOcean, Supabase, AWS RDS

### Migration Commands
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

---

## 🔐 Environment Configuration

### Required Variables
```env
# Database connection
DATABASE_URL=your_database_url

# AI API (when implemented)
ANTHROPIC_API_KEY=your_api_key

# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Optional Variables
```env
# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=GA_TRACKING_ID

# Monitoring
SENTRY_DSN=your_sentry_dsn

# Email (future feature)
SMTP_HOST=smtp.example.com
SMTP_USER=your_email
SMTP_PASS=your_password
```

---

## 📊 Performance Optimization

### Build Optimization

1. **Enable Bundle Analyzer**
   ```bash
   npm install @next/bundle-analyzer
   ```

2. **Analyze Bundle Size**
   ```bash
   ANALYZE=true npm run build
   ```

3. **Optimize Images**
   - Use Next.js Image component
   - Configure image domains in `next.config.js`

4. **Code Splitting**
   - Use dynamic imports for large components
   - Implement lazy loading

### Caching Strategy

1. **Static Assets**
   ```javascript
   // next.config.js
   module.exports = {
     async headers() {
       return [
         {
           source: '/static/(.*)',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ]
     },
   }
   ```

2. **API Routes**
   ```javascript
   // Add caching headers to API responses
   res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
   ```

---

## 🔍 Monitoring and Logging

### Health Checks

Add health check endpoint:

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  })
}
```

### Error Monitoring

1. **Sentry Integration**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configure Sentry**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs'

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   })
   ```

### Analytics

1. **Google Analytics**
   ```javascript
   // Add to _app.tsx or layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="GA_TRACKING_ID" />
         </body>
       </html>
     )
   }
   ```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: bookbloom/package-lock.json
    
    - name: Install dependencies
      run: |
        cd bookbloom
        npm ci
    
    - name: Run tests
      run: |
        cd bookbloom
        npm run test
    
    - name: Build application
      run: |
        cd bookbloom
        npm run build
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=bookbloom/.next
      env:
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Check for linting errors
   npm run lint
   
   # Clear cache
   rm -rf .next node_modules package-lock.json
   npm install
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   npx prisma db pull
   
   # Reset database
   npx prisma migrate reset
   ```

3. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Restart deployment after changes

### Performance Issues

1. **Slow Build Times**
   - Enable incremental builds
   - Use build cache
   - Optimize dependencies

2. **Large Bundle Size**
   - Analyze bundle with webpack-bundle-analyzer
   - Remove unused dependencies
   - Implement code splitting

### Debugging Deployment

1. **Check Build Logs**
   - Review deployment platform logs
   - Look for specific error messages

2. **Test Locally**
   ```bash
   npm run build
   npm start
   ```

3. **Check Environment**
   ```bash
   # Print environment variables (be careful with secrets)
   printenv | grep NEXT
   ```

---

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Next.js Guide](https://docs.netlify.com/frameworks/next-js/)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)