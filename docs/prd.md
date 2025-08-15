# Saveling Product Requirements Document (PRD)

## Section 1: Goals and Background Context

**Goals**

- Deliver a functional Phase 1 product within one month that allows a family to set up profiles and manage allowances via manual transactions.
- Provide a simple, intuitive interface for parents to manage family profiles and financial buckets, and for children to easily view their balances.
- Establish a stable technical foundation to support Phase 2 features, including allowance automation and the lessons module.
- Gather critical, real-world feedback from internal family use and a small beta group to validate the core concept and inform future development.

**Background Context**
Saveling addresses the growing need for a digital tool that helps parents manage allowances while actively teaching children financial literacy. Current solutions often fail to be truly educational or engaging for kids, functioning more as simple digital wallets. This PRD outlines the requirements for the initial launch of Saveling, focusing on the core manual transaction and account management features. This foundational version will validate the core user experience and provide a stable platform upon which to build the automated and educational features outlined in the project's phased rollout plan.

**Change Log**
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-08-14 | 0.1 | Initial PRD Draft | John (PM) |

## Section 2: Requirements

**Functional Requirements**

1.  `FR1`: The system must allow an adult user to create a new family account secured by a single, family-wide password.
2.  `FR2`: The system shall display a profile picker with user icons and names after successful authentication.
3.  `FR3`: Adult users must be able to create new user profiles, specifying a name and type (Adult/Child), which assigns a default icon based on the type.
4.  `FR4`: Adult users must be able to edit the name and type of existing user profiles.
5.  `FR5`: Adult users must be able to delete user profiles after a confirmation prompt with danger styling. Associated transaction history will be retained but marked as belonging to an archived profile, making it visible in logs but not in the main UI.
6.  `FR6`: Adult users must be able to create, rename, and delete custom financial buckets for each child profile. Deletion requires a confirmation prompt with danger styling. If a bucket has a balance, the user must be prompted with an option to transfer the funds to another of that child's buckets before confirming the deletion.
7.  `FR7`: When a child profile is created, the system shall suggest default, customizable bucket names ("Spend," "Save," "Give").
8.  `FR8`: Adult users must be able to manually create a transaction of type 'deposit' to a child's specific bucket, specifying an amount, date, and optional note.
9.  `FR9`: Adult users must be able to manually create a transaction of type 'withdrawal' from a child's specific bucket, specifying an amount, date, and optional note.
10. `FR10`: The application shall provide a dashboard for adults to view the balances for each child's individual buckets and a list of their 10 most recent transactions.
11. `FR11`: The application shall provide a simple dashboard for children to view their current balance for each of their buckets and a list of their 10 most recent transactions.
12. `FR12`: All financial events must be recorded as transactions, each with a specific type (e.g., 'deposit', 'withdrawal'), amount, date, associated bucket, and an optional note.

**Implementation Note for Architect:**

- Buckets should be stored as independent records with a foreign key relationship to the child profile they are assigned to, allowing for future flexibility like shared family buckets.

**Non-Functional Requirements**

1.  `NFR1`: The application must be developed using React with TypeScript.
2.  `NFR2`: All user data must be persisted in a secure, authenticated, network-accessible database.
3.  `NFR3`: The user interface must be responsive and function effectively on both mobile and desktop screen sizes, providing a layout optimized for the context of each device.
4.  `NFR4`: The codebase must be clean, modular, and follow modern best practices to ensure maintainability.
5.  `NFR5`: The application should permit local caching of data to improve performance.

## Section 3: User Interface Design Goals

**Overall UX Vision**
The UX will be clean, intuitive, and encouraging. For adults, the experience should feel efficient and trustworthy, providing clarity at a glance. For children, the experience must be fun, visually engaging, and highly interactive, using gamification principles to make learning about finance feel like play, not a chore.

**Key Interaction Paradigms**

- **Dual-Mode Interface:** The app will present a fundamentally different UI for 'Adult' and 'Child' profiles, tailored to their distinct needs.
- **Visual Finance:** For children, financial concepts will be represented visually (e.g., icons, simple charts) rather than with dense tables or text.
- **Clarity and Simplicity:** The interface will prioritize ease of use, showing only what's needed for the task at hand and avoiding overwhelming users.

**Core Screens and Views (for Phase 1)**

1.  Family Login Screen
2.  Profile Picker Screen
3.  Adult Dashboard (Overview of all child balances & recent transactions)
4.  Child Dashboard (View of their own balances & recent transactions)
5.  Profile Management Screen
6.  Bucket Management Screen
7.  Manual Transaction Form

**Accessibility**
The application should adhere to WCAG 2.1 AA standards.

**Branding**
The UI will feature a clean, card-based layout with rounded corners. Typography will use 'Poppins' for headlines and 'PT Sans' for body text. The visual identity should be cheerful and encouraging, utilizing playful icons and subtle, positive animations.

**Target Device and Platforms**
The application will be a Web Responsive application, optimized for mobile phones, tablets, and desktop browsers.

## Section 4: Technical Assumptions

**Repository Structure**
A **Monorepo** structure is recommended to simplify development by allowing for shared TypeScript types between the frontend and backend, easier dependency management, and a unified build and test process.

**Service Architecture**
The recommended approach is **Serverless**, with API functions hosted on the same platform as the frontend (e.g., Vercel, Netlify). This is cost-effective, scales automatically, and integrates seamlessly with a React frontend.

**Testing Requirements**
The project will follow a balanced testing strategy. **Unit tests** are required for all new business logic and UI components. **Integration tests** are required for critical user flows.

**Additional Technical Assumptions and Requests**

- A CI/CD pipeline should be established from the beginning to automate testing and deployments.
- The backend API will be built on the Node.js runtime.

## Section 5: Epic List

**Phase 1: Initial MVP (Target: 1 Month)**

- **Epic 1: Project Foundation & Family Setup:** Establish the core application, secure a family account, and allow adults to create and manage profiles for all members.
- **Epic 2: Manual Finance Tracking:** Enable adults to manage custom buckets and manually log deposits and withdrawals, with a simple dashboard for all users to view balances.

**Phase 2: Lovable Launch (Target: Next 2-3 Months)**

- **Epic 3: Allowance Automation:** Implement the automated weekly allowance system.
- **Epic 4: Foundational Engagement Features:** Introduce the initial 'Lessons' module and a calendar view.

**Phase 3: Full Feature Release (Post-Launch Prioritization)**

- **Epic 5: Advanced Security & Saving Incentives:** Enhance security with PINs/passkeys and introduce interest calculations.
- **Epic 6: Interactive Financial Literacy:** Transform the lessons module into a fully interactive experience.
- **Epic 7: Advanced User Experience & Child Agency:** Implement advanced UI features like child-led allowance reallocation.

## Section 6: Epic 1: Project Foundation & Family Setup

**Expanded Goal:**
The goal of this epic is to establish the complete, foundational structure of the Saveling application. By the end of this epic, a family will be able to securely sign into their own private space and see all their members represented by profiles, setting the stage for all future financial features.

**Story 1.1: Family Account Creation & Login**

> **As an** Adult, **I want** to create a new family account with a single, family-wide password, **so that** I can establish a private and secure space for our finances.
> **AC:**

1. A user can access a sign-up/login page.
2. A user can create a new "Family" account by providing a Family Name and a password.
3. The Family Name must be unique across the system.
4. The password must be securely stored (hashed).
5. A user can subsequently log in using the correct family credentials.

**Story 1.2: Initial Adult Profile Creation**

> **As an** Adult creating a new family account, **I want** my own profile to be automatically created, **so that** I can start using the app immediately without extra setup.
> **AC:**

1. Upon successful creation of a new Family account, the system prompts the user to create the first Adult profile.
2. The user must provide a name for this initial profile.
3. This profile is assigned a default 'Adult' icon.
4. After creating this profile, the user is logged in and taken directly to the Adult Dashboard.

**Story 1.3: Additional Profile Creation**

> **As an** Adult, **I want** to create additional user profiles for other family members, **so that** everyone can be represented in the app.
> **AC:**

1. From a management screen, an adult can initiate a 'Create Profile' action.
2. The user must provide a Profile Name and select a Profile Type ('Adult' or 'Child').
3. Upon creation, the system assigns a default icon based on the selected profile type.
4. The new profile immediately appears on the Profile Picker screen.

**Story 1.4: Profile Selection**

> **As a** family member, **I want** to see a profile picker after login, **so that** I can select my own profile to access my dashboard.
> **AC:**

1. After successful family login, if more than one profile exists, a screen is displayed showing all user profiles.
2. Each profile is displayed with its icon and name.
3. Clicking on a profile navigates the user to the appropriate dashboard.

**Story 1.5: Profile Editing**

> **As an** Adult, **I want** to edit existing user profiles, **so that** I can keep information up to date.
> **AC:**

1. From a management screen, an adult can select any existing profile to edit, including their own.
2. The user can change the Profile Name and Profile Type.
3. The changes are saved and reflected on the Profile Picker screen.

**Story 1.6: Profile Deletion**

> **As an** Adult, **I want** to delete user profiles, **so that** I can remove accounts that are no longer needed.
> **AC:**

1. From a management screen, an adult can initiate a 'Delete Profile' action.
2. A confirmation prompt with danger styling is displayed before deletion.
3. Upon confirmation, the profile is removed from the Profile Picker.
4. All transaction history associated with that profile is soft-deleted.

**Story 1.7: Testing Framework Setup**

> **As a** Developer, **I want** to have a comprehensive testing framework configured, **so that** I can write and run tests for all application components with confidence.
> **AC:**

1. Jest testing framework is installed and configured for the monorepo structure.
2. React Testing Library (RTL) is set up for component testing.
3. Testing configuration supports TypeScript across all packages.
4. Database testing utilities are configured with test database isolation.
5. API route testing setup is configured for Next.js API routes.
6. A sample test suite is created demonstrating:
   - Component testing patterns
   - API endpoint testing patterns
   - Database integration testing patterns
7. Test scripts are added to package.json for running tests in development and CI.
8. Test coverage reporting is configured and baseline coverage thresholds are established.
9. Testing documentation is created explaining patterns and best practices for the team.

## Section 7: Epic 2: Manual Finance Tracking

**Expanded Goal:**
The goal of this epic is to build the core financial ledger of the application. This involves enabling adults to create and manage custom buckets for each child and to perform the fundamental actions of manually adding deposits and withdrawals. This epic also introduces the first version of the Adult and Child dashboards, providing a simple, clear view of bucket balances and recent transactions.

**Story 2.1: Child Bucket Management**

> **As an** Adult, **I want** to create, rename, and delete financial buckets for each child, **so that** I can customize their account to match our family's financial goals.
> **AC:**

1. From a management screen for a specific child, an adult can view a list of that child's buckets.
2. An adult can add a new bucket by providing a name and selecting a curated icon.
3. When a new child profile is created, "Spend," "Save," and "Give" buckets are automatically created for them with default icons.
4. An adult can rename any existing bucket and change its icon.
5. An adult can delete a bucket after a confirmation prompt with danger styling.
6. If a bucket with a non-zero balance is deleted, the user is prompted with an option to transfer the balance to another of that child's buckets before confirming the deletion.

**Story 2.2: Log Manual Deposit**

> **As an** Adult, **I want** to manually add a deposit to a child's bucket, **so that** I can record income like gifts or rewards for chores.
> **AC:**

1. From the UI, an adult can initiate a 'New Deposit' action.
2. The user must select a child and one of that child's specific buckets. If only one child profile exists, it is selected by default.
3. The user must enter a numerical amount for the deposit.
4. The user can select a date (defaults to today).
5. The user can add an optional text note.
6. Upon submission, a transaction of type 'deposit' is created and the target bucket's balance is correctly updated.

**Story 2.3: Log Manual Withdrawal**

> **As an** Adult, **I want** to manually record a withdrawal from a child's bucket, **so that** the balance reflects real-world spending.
> **AC:**

1. From the UI, an adult can initiate a 'New Withdrawal' action.
2. The user must select a child and one of that child's specific buckets. If only one child profile exists, it is selected by default.
3. The user must enter a numerical amount for the withdrawal.
4. The system must prevent a user from withdrawing an amount greater than the selected bucket's balance.
5. The user can select a date (defaults to today).
6. The user can add an optional text note.
7. Upon submission, a transaction of type 'withdrawal' is created and the source bucket's balance is correctly updated.

**Story 2.4: Dashboard Display**

> **As a** family member, **I want** to view a dashboard with my relevant financial information, **so that** I can get a quick overview of my accounts.
> **AC:**

1. When an Adult logs in, their dashboard displays the current balances of all buckets for every child.
2. The Adult dashboard also displays a list of the 10 most recent transactions across all children, sorted by date descending.
3. When a Child logs in, their dashboard displays the current balances of only their own buckets.
4. The Child dashboard also displays a list of their own 10 most recent transactions, sorted by date descending.

## Section 8: Future Enhancements (Backlog)

- **Family Name Generator:** To offer users anonymity, consider adding a feature that auto-generates a cutesy, memorable family name (e.g., "outstanding-antelope") as an alternative to using their real name.

## Section 9: Checklist Results Report

**Validation Summary**

- **Overall PRD Completeness:** 95%
- **MVP Scope Appropriateness:** Just Right
- **Readiness for Architecture Phase:** Ready

**Final Decision:** ✅ **READY FOR ARCHITECT**

## Section 10: Next Steps

**Architect Prompt**

> This Product Requirements Document (PRD) is now complete for Phase 1 of Saveling. Please review it, along with the initial Project Brief, and create the fullstack architecture document. Your architecture should provide the detailed technical blueprint needed to build the epics and stories defined herein, respecting all the technical assumptions and requirements we've established.
