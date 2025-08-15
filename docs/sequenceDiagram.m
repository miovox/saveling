sequenceDiagram
    participant User
    participant Frontend App (Client)
    participant Financial Ledger Service (API)
    participant Auth Service (API Middleware)
    participant Database

    User->>+Frontend App (Client): Fills out and submits 'New Deposit' form
    Frontend App (Client)->>+Financial Ledger Service (API): POST /api/transactions with data & token
    Financial Ledger Service (API)->>+Auth Service (API Middleware): Validate token
    Auth Service (API Middleware)-->>-Financial Ledger Service (API): Token Valid (is Adult)
    Financial Ledger Service (API)->>+Database: Create Transaction record
    Database-->>-Financial Ledger Service (API): Transaction created successfully
    Financial Ledger Service (API)-->>-Frontend App (Client): 201 Created response (with new transaction)
    Frontend App (Client)->>-User: Show success message and update dashboard