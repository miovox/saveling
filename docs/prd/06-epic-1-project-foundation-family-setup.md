# Section 6: Epic 1: Project Foundation & Family Setup

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
