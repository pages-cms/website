---
title: Self-host
description: Run Pages CMS on your own infrastructure.
---

## What you need

- PostgreSQL,
- a public HTTPS URL,
- a GitHub App,
- Pages CMS environment variables.

## Minimum checklist

1. Build and run the app.
2. Set required environment variables.
3. Set `BASE_URL` to the final public URL.
4. Configure the GitHub App.
5. Run migrations.
6. Verify webhook delivery.

## Build and run

```bash
npm install
npm run build
npm run start
```

Run migrations before serving traffic:

```bash
npm run db:migrate
```

## Reverse proxy and HTTPS

Use a stable public HTTPS URL in front of the app.

Typical setup:

- Nginx or Caddy as reverse proxy,
- TLS at the proxy or platform edge,
- the app behind it on an internal port.

## GitHub App URLs

Use:

- User authorization callback URL: `<BASE_URL>/api/auth/callback/github`
- Webhook URL: `<BASE_URL>/api/webhook/github`
- Setup URL: `<BASE_URL>/`

For the full app setup, see [GitHub App](/docs/development/github-app/).

## Operations

Plan for:

- environment variable management,
- database backups,
- logging,
- process restarts,
- deploy windows or rolling updates.
