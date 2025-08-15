# Section 2: High-Level Architecture

**Technical Summary**
The Saveling architecture will be a modern, full-stack application built on the **Next.js** framework. It will leverage a **Monorepo** structure for code organization and a **Serverless** deployment model, utilizing Next.js's integrated API routes for the backend. This approach ensures a tightly integrated, type-safe codebase, rapid development, and a cost-effective, scalable infrastructure from day one.

**Platform and Infrastructure Choice**
* **Platform:** **Vercel**. As the creator of Next.js, Vercel provides the most seamless development and deployment experience. It offers zero-configuration support for our serverless API, a global CDN for performance, and automated CI/CD straight from our repository.
* **Key Services:** Vercel Hosting (for the app), Vercel Functions (for the API), and an external SQL database provider.
* **Database Selection Criteria:** The final database choice will be a serverless-compatible SQL provider (e.g., PlanetScale, Neon). The key selection criteria are: a generous free tier, seamless integration with Vercel, and excellent TypeScript support (e.g., via Prisma or Drizzle ORM).

**Repository Structure**
* **Structure:** **Monorepo**. This is the confirmed approach, allowing us to easily share code and types between the frontend and backend.
* **Monorepo Tool:** We will use the built-in workspace functionality of **pnpm**.
* **Package Organization:** The repository will contain an `apps/web` directory for the Next.js application and a `packages/` directory for shared code, including `packages/db` (for database schema and queries) and `packages/shared-types`.

**High Level Architecture Diagram**
```mermaid
graph TD
    subgraph "User's Device"
        A[Browser]
    end

    subgraph "Vercel Platform"
        B[Global Edge Network / CDN]
        C[Next.js Frontend (React)]
        D[Next.js API Routes (Serverless)]
    end

    subgraph "External Services"
        E[Database (e.g., PlanetScale)]
        G[Auth Provider (e.g., NextAuth.js)]
    end

    A -- HTTPS --> B
    B -- Serves App --> C
    C -- Renders UI --> A
    C -- Fetches Data From --> D
    D -- Authenticates/Authorizes via --> G
    D -- Reads/Writes --> E
```

**Architectural Patterns**

* **Server-Side Rendering (SSR):** We will leverage Next.js's SSR for dynamic pages like dashboards to ensure they are fast and up-to-date.
* **API Routes:** All backend logic for Phase 1 will be implemented as serverless functions within the `pages/api` directory of our Next.js application.
* **Component-Based UI:** The frontend will be built using reusable React components.
* **Utility-First Styling:** We will use a utility-first CSS framework, **Tailwind CSS**, for all styling.

**Conscious Trade-offs**
The decision to implement the backend using integrated Next.js API Routes is a conscious trade-off. We are prioritizing maximum development speed for our initial launch. The primary risk is that the API is not a standalone service, which could complicate the future development of other clients (e.g., a native mobile app).

* **Mitigation:** All core business logic within the API routes will be kept separate from the Next.js request/response handlers, allowing for easier extraction into a standalone service in the future.

---
