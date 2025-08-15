# Section 5: API Specification

This section outlines the structure of our REST API using the OpenAPI 3.0 specification format.

```yaml
openapi: 3.0.0
info:
  title: Saveling API
  version: 1.0.0
paths:
  /api/family:
    post:
      summary: Create a new Family account
  /api/auth/login:
    post:
      summary: Log in to a Family account
  /api/profiles:
    get:
      summary: Get all profiles for the logged-in family
    post:
      summary: Create a new user profile
  /api/profiles/{profileId}:
    put:
      summary: Update a profile
    delete:
      summary: Delete a profile (soft-delete)
  /api/buckets:
    post:
      summary: Create a new bucket for a user
  /api/buckets/{bucketId}:
    put:
      summary: Update a bucket (e.g., rename, change icon)
    delete:
      summary: Delete a bucket
  /api/dashboard:
    get:
      summary: Get all data needed for the user's dashboard view
  /api/transactions:
    post:
      summary: Create a new transaction (deposit or withdrawal)
```

---
