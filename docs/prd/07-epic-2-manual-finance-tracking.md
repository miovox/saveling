# Section 7: Epic 2: Manual Finance Tracking

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
