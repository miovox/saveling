# Section 13: Development Workflow

This section defines the setup for a new developer.

## Developer Setup

* **Prerequisites:** Node.js v20+, pnpm, Docker Desktop.
* **Initial Setup:** `pnpm install`, create `.env` file, `docker-compose up -d`, `pnpm --filter db exec prisma migrate dev`.
* **Dev Command:** `pnpm --filter web dev`.
* **Environment Variables:** `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.

## v0-Prototype Usage Guidelines

The `v0-prototype/` directory contains initial inspiration code that demonstrates core concepts and UI patterns. This prototype should be treated as a **reference implementation**, not a rigid specification:

* **Use as Inspiration**: The prototype shows one approach - feel free to make your own implementation choices
* **Adapt, Don't Copy**: While the prototype is "almost correct", make small improvements and modifications that feel right
* **Developer Autonomy**: Trust your judgment on better patterns, cleaner code structure, or improved UX decisions
* **Core Concepts**: Maintain the essential functionality and user flows, but implement them your way

**Key Principle**: The prototype provides direction and saves time, but the final implementation should reflect thoughtful development choices rather than wholesale copying.

---
