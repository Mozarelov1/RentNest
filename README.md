# Backend (monorepo) — README

> Monorepo of backend microservices (Node + TypeScript + TypeORM).
> Services: `service-auth`, `service-chat`, `service-favorites`, `service-notifications`, `service-payments`, `service-property`, `service-reservations`, `service-reviews`, `service-search`.

---

## Table of contents

* [Quick summary](#quick-summary)
* [Prerequisites](#prerequisites)
* [Environment files (per-service `.env`)](#environment-files-per-service-env)
* [Install & run](#install--run)
* [Start Elasticsearch, ZooKeeper and Kafka](#start-elasticsearch-zookeeper-and-kafka)
* [Run the backend (dev modes)](#run-the-backend-dev-modes)
* [Database migrations (TypeORM)](#database-migrations-typeorm)

---

## Quick summary

* Use `npm run dev` to start the **root** app (API gateway / aggregator).
* Use `npm run dev:startServices` to start **all** microservices in parallel (uses `concurrently` and the per-service `dev:*` scripts).
* Each microservice has its own `.env` stored in the service directory (see examples below).

---

## Prerequisites

* Node.js (16+ recommended) and npm
* TypeScript toolchain (`npm install` will install `ts-node`, `nodemon`, etc.)
* PostgreSQL (default port `5432`) — one database per service (configurable in service `.env`)
* Kafka (and ZooKeeper) or a Kafka alternative broker
* Elasticsearch (or a running Elasticsearch instance)
  Ports used in the examples:
* PostgreSQL: `5432`
* Elasticsearch: `9200`
* Kafka broker: `9092`

---

## Environment files (per-service `.env`)

Create **one `.env` file per service** in the service directory (do **NOT** commit real `.env` files).

> **Do not commit** actual `.env` files with secrets. Use `.env.example` in repo and add `.env` to `.gitignore`.

### `service-auth/.env` (example)

```
# OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:2000/api/auth/google/callback

# JWT
JWT_SECRET=YOUR_JWT_SECRET
ACC_TOKEN_EXPIRES_IN=1m
REF_TOKEN_EXPIRES_IN=5m

# Client + DB
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME_AUTH=auth

NODE_ENV=development
DOMAIN=localhost
```

### `service-chat/.env` (example)

```
DB_NAME_CHAT=chats
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password

# Kafka
KAFKA_CLIENT_ID=rentnest-client
KAFKA_BROKERS=localhost:9092
KAFKA_INPUT_TOPIC=chat-messages
KAFKA_OUTPUT_TOPIC=chat-processed
```

### `service-favorites/.env` (example)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME_FAVORITES=favorites

JWT_SECRET=YOUR_JWT_SECRET
```

### `service-notifications/.env` (example)

```
SMTP_HOST=smtp.example.com
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_SECURE=false

DB_NAME_NOTIF=notifications
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
```

### `service-payments/.env` (example)

```
FONDY_MERCHANT_ID=your_merchant_id
FONDY_SECRET_KEY=your_fondy_secret
FONDY_API_URL=https://sandbox.fondy.eu/api

KAFKA_BROKERS=localhost:9092

DB_NAME_PAYMENT=payments
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password

JWT_SECRET=YOUR_JWT_SECRET
```

### `service-property/.env` (example)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME_PROPERTY=property

SEARCH_SERVICE_URL=http://localhost:2008

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:2000/api/auth/google/callback

JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=15m
CLIENT_URL=http://localhost:5173
```

### `service-reservations/.env` (example)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME_RESERVATION=reservation

JWT_SECRET=YOUR_JWT_SECRET
```

### `service-reviews/.env` (example)

```
DB_NAME_REVIEWS=reviews
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password

JWT_SECRET=YOUR_JWT_SECRET
```

### `service-search/.env` (example)

```
ELASTIC_URL=http://localhost:9200
```

---

## Install & run

1. Clone and install:

```bash
git clone <repo-url>
cd backend
npm install
```

2. Create `.env` files in each `service-*` directory using the examples above.

---

## Start Elasticsearch, ZooKeeper and Kafka

You must start Elasticsearch, ZooKeeper and Kafka manually before running the services. Make sure:

* Elasticsearch is accessible at `http://localhost:9200`.
* ZooKeeper is running and reachable at port `2181`.
* Kafka broker is running and reachable at `localhost:9092`.

## Run the backend (dev modes)"

**Start only the root app / gateway**

```bash
npm run dev
```

**Start all microservices in parallel**

```bash
npm run dev:startServices
```

**Order recommendation for local dev**

1. Start PostgreSQL (databases for services)
2. Start Elasticsearch (if using search)
3. Start ZooKeeper and Kafka broker
4. Start services (either `npm run dev:startServices` or individual `npm run dev:...`)

---

## Database migrations (TypeORM)

There are per-service migration scripts in `package.json` (root). Examples:

Generate a migration for `service-auth`:

```bash
npm run migration:auth
```

Run migrations for `service-auth`:

```bash
npm run migration:runAuth
```

Revert:

```bash
npm run migration:revertAuth
```

There are similar commands for `property`, `reservations`, `payments`, `reviews`, `favorites`, `chat`, `notifications`.

---
