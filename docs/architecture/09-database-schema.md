# Section 9: Database Schema

This schema is written in the Prisma Schema Language.

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
generator client {
  provider = "prisma-client-js"
}

enum UserType { ADULT CHILD }
enum TransactionType { DEPOSIT WITHDRAWAL }

model Family {
  id           String @id @default(uuid())
  handle       String @unique
  displayName  String
  passwordHash String
  users        User[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model User {
  id                String   @id @default(uuid())
  name              String
  type              UserType
  familyId          String
  family            Family   @relation(fields: [familyId], references: [id], onDelete: Cascade)
  deletedAt         DateTime?
  bucketMemberships BucketMembership[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model BucketMembership {
  userId   String
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  bucketId String
  bucket   Bucket @relation(fields: [bucketId], references: [id], onDelete: Cascade)
  @@id([userId, bucketId])
}

model Bucket {
  id           String @id @default(uuid())
  name         String
  iconId       String
  memberships  BucketMembership[]
  transactions Transaction[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Transaction {
  id        String          @id @default(uuid())
  type      TransactionType
  amount    Int
  date      DateTime
  note      String?
  bucketId  String
  bucket    Bucket          @relation(fields: [bucketId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  @@index([bucketId, date])
}
```

---
