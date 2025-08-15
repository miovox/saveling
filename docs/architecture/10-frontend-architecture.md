# Section 10: Frontend Architecture

* **Component Organization:** A feature-based folder structure will be used. Core UI elements in `components/ui`, and feature-specific components co-located (e.g., `features/dashboard/components`).
* **State Management:** **Zustand** will be used for simple, feature-based state stores.
* **Routing:** The **Next.js App Router** will manage all application routes via the file system.
* **Services Layer:** A centralized API client will abstract all `fetch` calls into service functions (e.g., `transaction.service.ts`).

---
