# Section 13: Development Workflow

This section defines the setup for a new developer.

* **Prerequisites:** Node.js v20+, pnpm, Docker Desktop.
* **Initial Setup:** `pnpm install`, create `.env` file, `docker-compose up -d`, `pnpm --filter db exec prisma migrate dev`.
* **Dev Command:** `pnpm --filter web dev`.
* **Environment Variables:** `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.

---
