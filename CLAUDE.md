# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saveling is a family financial literacy application built as a Next.js monorepo. It helps parents manage allowances and teach children financial responsibility through custom "buckets" for spending, saving, and giving. The project uses a serverless architecture deployed on Vercel with Prisma and Neon database.

## Development Commands

### Root Commands (run from project root)
- `pnpm dev` - Start development server for web app
- `pnpm build` - Build the web application
- `pnpm test` - Run tests for web application
- `pnpm lint` - Run linting for web application
- `pnpm dev:fresh` - Switch to development environment and start dev server

### Database Commands
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:reset` - Reset database (destructive)
- `pnpm db:studio` - Open Prisma Studio for database management

### Environment Management
- `pnpm env:dev` - Switch to development environment
- `pnpm env:prod` - Switch to production environment

### Web App Commands (from apps/web/)
- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build Next.js application
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint

## Architecture

### Monorepo Structure
- **apps/web/** - Next.js application with App Router
  - **app/** - Next.js App Router pages and API routes
  - **components/** - React components (organized by feature)
  - **services/** - Backend business logic
  - **lib/** - Utility functions
- **packages/db/** - Prisma schema and database client
- **packages/shared-types/** - Shared TypeScript interfaces

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript 5, Tailwind CSS
- **Backend**: Next.js API Routes (serverless functions)
- **Database**: Neon (PostgreSQL) with Prisma ORM
- **Authentication**: NextAuth.js v5 (Auth.js)
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Testing**: Jest with React Testing Library
- **Deployment**: Vercel

### Key Patterns
- Component-based architecture with shadcn/ui components
- API routes in `app/api/` following REST conventions
- Business logic separated into service files
- Form validation using React Hook Form with Zod schemas
- Authentication via NextAuth.js with custom family password system

## Development Guidelines

### Environment Setup
1. Prerequisites: Node.js v20+, pnpm, Docker Desktop
2. Initial setup: `pnpm install`, create `.env` files, run database migrations
3. Environment switching: Use `pnpm env:dev` or `pnpm env:prod` to switch between environments
4. The project uses separate environment files for development and production

### Testing Strategy
- Unit tests for business logic and components
- Integration tests for API routes
- Database tests with test isolation
- Run `pnpm test` from root or `pnpm test:watch` for development

### Database Management
- Uses Prisma ORM with PostgreSQL (Neon provider)
- Schema defined in `packages/db/prisma/schema.prisma`
- Generate client after schema changes: `pnpm db:generate`
- Apply migrations: `pnpm db:migrate`

### Code Organization
- Follow existing patterns for component structure and API routes
- Keep business logic in service files separate from UI components
- Use TypeScript interfaces from shared-types package
- Follow Next.js App Router conventions for routing

### v0 Prototype Reference
The `v0-prototype/` directory contains reference implementation that demonstrates core UI patterns and functionality. Use as inspiration rather than copying directly - adapt and improve upon the patterns shown.

## Project Context

### Core Features (Phase 1)
- Family authentication with shared password
- User profile management (Adults/Children)
- Custom financial "buckets" per child (Spend/Save/Give)
- Manual transaction logging (deposits/withdrawals)
- Separate dashboards for adults and children

### Key Business Logic
- Adults can manage all profiles and transactions
- Children can only view their own data
- Bucket balances are calculated from transaction history
- All transactions are immutable audit trail
- Profile deletion soft-deletes associated data

### Future Phases
- Automated allowance system
- Financial literacy lessons module
- Advanced security features