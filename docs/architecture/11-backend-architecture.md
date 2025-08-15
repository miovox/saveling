# Section 11: Backend Architecture

* **Service Organization:** Backend logic is defined by the file structure in `pages/api`. Business logic will be abstracted into service files (e.g., `services/profile.service.ts`).
* **Data Access Layer:** API routes will not interact with Prisma directly. They will call service functions which then interact with the database, centralizing all data logic.
* **Authentication:** **NextAuth.js** will handle the login flow and secure API routes by validating the session on every request.

---
