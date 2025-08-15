# Database Branching with Neon

This project uses Neon's database branching feature to maintain separate environments for development and production.

## Branch Structure

- **`main`** - Production branch (used by Vercel production deployment)
- **`development`** - Development branch (used for local development and preview deployments)

## Environment Files

### Root Directory
- `.env.development` - Development environment configuration
- `.env.production` - Production environment configuration  
- `.env` - Active environment (copied from above files)

### Web App (`apps/web/`)
- `.env.development` - Development environment for Next.js app
- `.env.production` - Production environment for Next.js app
- `.env` - Active environment (copied from above files)

### Database Package (`packages/db/`)
- `.env.development` - Development environment for Prisma
- `.env.production` - Production environment for Prisma
- `.env` - Active environment (copied from above files)

## Quick Start

### Switch to Development Environment
```bash
pnpm env:dev
```

### Switch to Production Environment  
```bash
pnpm env:prod
```

### Start Development with Fresh Environment
```bash
pnpm dev:fresh
```

## Manual Environment Setup

### 1. Create Neon Development Branch

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Go to "Branches" 
4. Create new branch named `development` from `main`
5. Copy the development branch connection string

### 2. Update Development Environment Files

Replace `TO_BE_REPLACED_WITH_DEV_BRANCH` in these files with your development branch connection string:
- `.env.development`
- `apps/web/.env.development` 
- `packages/db/.env.development`

### 3. Switch to Development Environment

```bash
pnpm env:dev
```

### 4. Test Database Connection

```bash
pnpm db:generate
pnpm dev
```

## Database Operations

### Running Migrations

**Development Branch:**
```bash
pnpm env:dev
pnpm db:migrate
```

**Production Branch:**
```bash
pnpm env:prod  
pnpm db:migrate
```

### Database Studio

**Development Branch:**
```bash
pnpm env:dev
pnpm db:studio
```

**Production Branch:**
```bash
pnpm env:prod
pnpm db:studio
```

## Deployment Workflow

### Vercel Environment Variables

**Production Deployment:**
- `DATABASE_URL` = Production branch connection string
- `NEXTAUTH_URL` = Production domain  
- `NEXTAUTH_SECRET` = Production secret

**Preview Deployments:**
- `DATABASE_URL` = Development branch connection string
- `NEXTAUTH_URL` = Preview deployment URL
- `NEXTAUTH_SECRET` = Development secret

### Migration Workflow

1. **Develop on development branch**
   ```bash
   pnpm env:dev
   # Make schema changes
   pnpm db:migrate
   # Test changes
   ```

2. **Test in preview deployment**
   - Push to GitHub
   - Vercel creates preview deployment using development branch
   - Validate functionality

3. **Promote to production**
   ```bash
   pnpm env:prod
   pnpm db:migrate  # Apply same migrations to production
   ```
   - Deploy to production (main branch)

## Troubleshooting

### Environment Not Switching
```bash
# Manually copy environment files
cp .env.development .env
cp apps/web/.env.development apps/web/.env
cp packages/db/.env.development packages/db/.env
```

### Database Connection Issues
```bash
# Regenerate Prisma client
pnpm db:generate

# Reset and recreate database
pnpm db:reset
```

### Check Current Environment
```bash
cat .env | grep DATABASE_URL
```

## Security Notes

- ✅ All `.env` files are gitignored
- ✅ Production secrets should only be set in Vercel dashboard
- ✅ Development branch is isolated from production data
- ✅ Environment files have templates but no actual secrets committed