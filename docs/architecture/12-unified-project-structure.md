# Section 12: Unified Project Structure

```
moolah-vault/
├── apps/
│   └── web/                      # The Next.js application
│       ├── app/                  # App Router pages and API routes
│       ├── components/           # React components
│       └── services/             # Backend business logic
├── packages/
│   ├── db/                       # Prisma schema and client
│   ├── shared-types/             # Shared TypeScript interfaces
│   └── ui/                       # Future shared UI components
├── package.json                  # Root package.json with workspaces
└── tsconfig.base.json            # Base TypeScript config
```

---
