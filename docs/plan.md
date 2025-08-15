# Overview

- Web hello-world
- Database schema
- Authentication
- API hello-world
- Bucket Balances
- Transactions
- Profiles
- Allowance (Adult)
- Desktop transactions

# Objects

user

- name (string) [e.g. "Philip"]
- email (string) [e.g. hpg@gmail.com]
- pin (int) [e.g. 1234]
- type (enum) ["adult" | "kid"]

bucket

- name (string)
- user (FK)

transaction

allowance

- target_bucket
-
