# `rentNest` Gateway API

> **Backend pet-project** — single-file OpenAPI gateway for a small rental platform. Designed as a minimal, practical API gateway that proxies and composes multiple microservices (auth, users, properties, reservations, payments, search, notifications, etc.).

---

## Quick facts

* **Spec**: OpenAPI 3.0 (included in `openapi.json`).
* **Default port**: `2000` (configurable via `PORT`).
* **Primary goal**: provide a single HTTP façade for frontend clients and centralize auth, routing and request shaping.

---

## File layout (conceptual)

```
/ (repo root)
├─ src/                # gateway code (routing, auth middleware, proxy helpers)
├─ openapi.json        # canonical API contract (OpenAPI 3.0)
├─ Dockerfile
├─ docker-compose.yml  # optional: bring up gateway + mock services
├─ .env                # environment variables used in dev
└─ README.md           # this file
```

---

## Running (developer quickstart)

1. install deps

```bash
npm install
```

2. copy `.env.example` -> `.env` and fill values

3. run locally

```bash
npm run dev
# or
npm start
```

4. open `http://localhost:2000` (or your `GATEWAY_URL`).

> If downstream microservices are not running, use simple HTTP mocks or `docker-compose` that brings up minimal stub services.

---

## Environment variables (example)

```env
PORT=2000
GATEWAY_URL=http://localhost:2000
AUTH_SERVICE_URL=http://localhost:3001
PROPERTIES_SERVICE_URL=http://localhost:3003
RESERVATIONS_SERVICE_URL=http://localhost:3004
PAYMENTS_SERVICE_URL=http://localhost:3005
SEARCH_SERVICE_URL=http://localhost:3008
NOTIFICATIONS_SERVICE_URL=http://localhost:3009

JWT_SECRET=replace_with_strong_secret
REFRESH_TOKEN_SECRET=replace_with_another_secret
OAUTH_GOOGLE_CLIENT_ID=...
OAUTH_GOOGLE_CLIENT_SECRET=...
CLIENT_REDIRECT_URL=http://localhost:3000/auth/callback
COOKIE_SECURE=false
```

---

## API highlights (examples)

### Auth / OAuth

* `GET  /api/auth/google` — redirect to Google OAuth2
* `GET  /api/auth/google/callback` — OAuth callback
* `GET  /api/auth/refresh` — refresh access token (reads `refreshToken` cookie)

### Users

* `GET  /api/user/me` — current user (requires `Authorization: Bearer <token>`)
* `GET  /api/user` — list users (admin)
* `PUT  /api/user/{userId}` — update user

### Properties

* `GET  /api/properties` — list + filters
* `POST /api/properties/new` — create property
* `POST /api/properties/{propertyId}/photo` — multipart upload proxy

### Reservations

* `POST /api/reservations/new` — create reservation
* `GET  /api/reservations/my` — my reservations

### Payments

* `POST /api/payments/initiate` — start payment
* `GET  /api/payments/history` — list user payments

### Search

* `POST /api/search/index` — index property DTO
* `GET  /api/search/search?q=...` — search

> See `openapi.json` for full schemas: `IUser`, `Property`, `Reservation`, `Payment`, `Review`, `Favorite`, etc.

---

## Example `curl` requests

```bash
# get my profile (bearer token)
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:2000/api/user/me

# search
curl "http://localhost:2000/api/search/search?q=pool&page=1&limit=10"
```

---

## Notes for implementers

* The gateway should *not* implement business logic — it proxies, validates and composes. Heavy logic (user provisioning, payments, search indexing) belongs to downstream services.
* Keep auth/role checks centralized in middleware; surface only high-level errors to clients and preserve downstream status codes when appropriate.
* Preserve request bodies (including `multipart/form-data`) when proxying file uploads.
* Emit structured logs and propagate trace headers to downstream services.

---

## Docker (dev stub)

A minimal `docker-compose.yml` can start the gateway and simple mock services on separate ports. Use environment variables to wire service URLs.

---

## Testing

* Unit tests: test routing, auth middleware and small helpers.
* Integration tests: spin the gateway with mocked downstreams (WireMock / nock / lightweight Express) and assert contract conformance to `openapi.json`.

---

## Roadmap & ideas

* Add rate limiting and IP throttling
* Add OpenAPI-based request validation and contract tests in CI
* Add a small admin UI for inspecting proxied requests and mock toggles

---

## License

MIT

---

*For the full contract, inspect `openapi.json` — keep it as the source of truth for frontend clients.*
