# Section 2: Requirements

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
