# Vercel Deployment Guide

This guide covers deploying Saveling to Vercel with proper Neon database branching.

## Pre-requisites

- ✅ Neon development branch created
- ✅ Local development working with branch switching
- ✅ All tests passing

## Vercel Project Setup

### 1. Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub repository
4. Select "saveling" repository
5. **Important**: Set Framework Preset to "Next.js"
6. **Important**: Set Root Directory to `apps/web`

### 2. Environment Variables Configuration

Configure these environment variables in Vercel Dashboard:

#### Production Environment Variables
```bash
# Database - Neon Main Branch (Production)
DATABASE_URL="your-neon-main-branch-connection-string"

# NextAuth - Production
NEXTAUTH_URL="https://your-production-domain.vercel.app"
NEXTAUTH_SECRET="generate-a-secure-32-char-secret-key-for-production"

# Environment
NODE_ENV="production"
```

#### Preview/Development Environment Variables  
```bash
# Database - Neon Development Branch
DATABASE_URL="your-neon-development-branch-connection-string"

# NextAuth - Preview
NEXTAUTH_URL="https://your-preview-url.vercel.app"
NEXTAUTH_SECRET="your-development-secret-key"

# Environment
NODE_ENV="development"
```

### 3. Environment Variable Setup in Vercel

1. **Go to Project Settings** → Environment Variables
2. **Add Production Variables**:
   - Set "Production" environment for main branch
   - Add all production environment variables listed above
3. **Add Preview Variables**:
   - Set "Preview" environment for all other branches
   - Add all development environment variables listed above

## Deployment Commands

### Local Testing Before Deploy
```bash
# Switch to production environment locally
pnpm env:prod

# Build and test production build
pnpm build

# Run tests
pnpm test

# Switch back to development
pnpm env:dev
```

### Deployment Flow

#### Automatic Deployments
- **Push to `main`** → Production deployment (uses main/production database)
- **Push to feature branches** → Preview deployment (uses development database)

#### Manual Deployment
```bash
# Deploy from CLI (optional)
npx vercel --prod  # Production
npx vercel         # Preview
```

## Database Migration Strategy

### For New Features with Schema Changes

1. **Develop locally on development branch**
   ```bash
   pnpm env:dev
   # Make schema changes
   pnpm db:migrate
   ```

2. **Test in preview deployment**
   - Push feature branch to GitHub
   - Vercel creates preview using development database
   - Test functionality in preview

3. **Promote to production**
   ```bash
   pnpm env:prod
   pnpm db:migrate  # Apply same migration to production
   ```
   - Merge to main branch
   - Production deployment uses updated schema

## Vercel Configuration Files

### Root `vercel.json`
```json
{
  "monorepo": true,
  "buildCommand": "cd apps/web && pnpm build",
  "devCommand": "cd apps/web && pnpm dev", 
  "installCommand": "pnpm install",
  "outputDirectory": "apps/web/.next"
}
```

### Apps Web `apps/web/vercel.json`
```json
{
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## Build Configuration

Vercel will automatically:
- Detect Next.js framework
- Install dependencies with `pnpm install`
- Build with `pnpm build` from the web app directory
- Deploy the `.next` output directory

## Environment-Specific Behavior

### Production Deployment
- Uses Neon **main branch** database
- Production-optimized build
- Caching enabled
- Error tracking in production mode

### Preview Deployment  
- Uses Neon **development branch** database
- Development build optimizations
- Safe testing environment
- Isolated from production data

## Security Considerations

- ✅ Database credentials stored in Vercel environment variables
- ✅ Production and development databases isolated
- ✅ NextAuth secrets properly configured per environment
- ✅ Environment files excluded from git via .gitignore

## Troubleshooting

### Build Failures
```bash
# Check build locally
pnpm env:prod
pnpm build

# Check for missing dependencies
pnpm install
```

### Database Connection Issues
- Verify DATABASE_URL in Vercel environment variables
- Check Neon database branch is accessible
- Ensure IP allowlist includes Vercel (usually 0.0.0.0/0)

### Environment Variable Issues
- Verify all required variables are set in Vercel
- Check environment (production vs preview) assignment
- Ensure no typos in variable names

## Monitoring

After deployment:
- ✅ Test family registration/login functionality
- ✅ Verify database operations work correctly
- ✅ Check preview deployments use development database
- ✅ Confirm production deployments use main database