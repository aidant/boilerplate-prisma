# Prisma GraphQL API

## Table of Contents

- [Quick Start](#quick-start)
  - [Example Queries](#example-queries)
    - [Create A User](#create-a-user)
    - [Query All Users](#query-all-users)
- [Environment Variables](#environment-variables)

## Quick Start

```
npm install
npx prisma migrate dev
npm start
```

Open: http://localhost:8080/

### Example Queries

#### Create A User

```graphql
mutation {
  createUser(data: { email: "example@example.com" }) {
    id
    name
    email
  }
}
```

#### Query All Users

```
query {
  users {
    id
    name
    email
  }
}
```

## Environment Variables

| Environment Variable | Default   |
| -------------------- | --------- |
| `PORT`               | `8080`    |
| `HOST`               | `0.0.0.0` |
