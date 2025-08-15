# Saveling

A family-friendly financial literacy platform that helps parents manage allowances while teaching children smart money habits.

## ✨ Features

- **Family Account Management** - Create and manage family profiles with parent and child accounts
- **Manual Transaction Tracking** - Easy allowance and spending management with categorized buckets
- **Child-Friendly Interface** - Simple, intuitive design for kids to view balances and track goals
- **Secure Authentication** - Family-friendly login system with NextAuth.js
- **Real-time Updates** - Live balance tracking and transaction history

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- Neon PostgreSQL database (for production) or local PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/saveling.git
cd saveling

# Install dependencies
pnpm install

# Set up environment
pnpm env:dev

# Generate database schema
pnpm db:generate

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel
- **Database Hosting**: Neon (with branching for dev/prod)

## 📁 Project Structure

```
saveling/
├── apps/
│   └── web/                 # Main Next.js application
│       ├── app/            # App router pages
│       ├── components/     # React components
│       ├── services/       # Business logic
│       └── lib/           # Utilities
├── packages/
│   └── db/                # Shared database schema
├── docs/                  # Project documentation
├── scripts/               # Development scripts
└── v0-prototype/          # Initial prototype (reference)
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:fresh             # Switch to dev environment + start server

# Environment Management
pnpm env:dev               # Switch to development database
pnpm env:prod              # Switch to production database

# Database
pnpm db:generate           # Generate Prisma client
pnpm db:migrate            # Run database migrations
pnpm db:studio             # Open Prisma Studio

# Testing & Building
pnpm test                  # Run tests
pnpm lint                  # Run linter
pnpm build                 # Build for production
pnpm deploy:check          # Test production build + run tests

# Security
pnpm secrets               # Generate new NextAuth secrets
```

### Environment Setup

The project uses Neon database branching for isolated development:

- **Development**: Uses Neon development branch
- **Production**: Uses Neon main branch

Environment files are gitignored for security. Use the provided scripts to switch between environments.

### Database Schema

The application uses Prisma with PostgreSQL. Key models:

- **Family**: Parent account with settings
- **User**: Individual family members (parents/children)
- **Bucket**: Financial categories (savings, spending, etc.)
- **Transaction**: Money movements between buckets

## 🚀 Deployment

### Vercel Deployment

1. **Create Vercel Project**

   - Import from GitHub
   - Set root directory: `apps/web`
   - Framework: Next.js (auto-detected)

2. **Set Environment Variables**

   ```bash
   DATABASE_URL="your-neon-main-branch-connection-string"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   NEXTAUTH_SECRET="your-generated-secret"
   NODE_ENV="production"
   ```

3. **Deploy**
   - Push to `main` branch → Production deployment
   - Push to feature branches → Preview deployments

See `DEPLOYMENT_READY.md` for detailed deployment instructions.

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

Tests are written using Jest and React Testing Library, covering:

- Authentication services
- API routes
- React components
- Business logic

## 📚 Documentation

- **[Project Brief](docs/Project%20Brief.md)** - High-level project overview
- **[Product Requirements](docs/prd/index.md)** - Detailed requirements and specifications
- **[Architecture](docs/architecture/index.md)** - Technical architecture and design decisions
- **[Database Branching](docs/DATABASE_BRANCHING.md)** - Development workflow with Neon
- **[Deployment Guide](docs/VERCEL_DEPLOYMENT.md)** - Production deployment instructions

## 🔒 Security

- All environment files are gitignored
- Passwords are hashed with bcrypt
- Family-friendly authentication (6+ character passwords)
- No sensitive data committed to repository
- Secure session management with NextAuth.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `pnpm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a pull request

## 📄 License

This project is licensed under the BSL License - see the [LICENSE.md](LICENSE.md) file for details.

## 🎯 Roadmap

### Phase 1 (Current)

- ✅ Family account creation and management
- ✅ Manual transaction tracking
- ✅ Basic bucket system
- ✅ Child-friendly interface

### Phase 2 (Planned)

- Automated allowance scheduling
- Goal-setting and achievement tracking
- Educational content and lessons
- Enhanced reporting and analytics

### Phase 3 (Future)

- Bank integration for real transactions
- Advanced financial literacy modules
- Gamification features
- Multi-family sharing capabilities

---

Built with ❤️ for families who want to teach smart money habits.
