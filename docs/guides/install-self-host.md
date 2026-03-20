---
title: Self-host
description: Run Pages CMS outside Vercel on your own infrastructure.
---

Use the GitHub App setup helper if you can. It handles most of the GitHub App wiring, and you can then update the app URLs to match your final public domain.

## Good fits for self-hosting

- a VPS,
- Docker on your own server,
- Fly.io,
- Render,
- DigitalOcean,
- any platform that can run a Next.js app and connect to PostgreSQL.

## What stays the same

No matter where you host it, you still need:

- PostgreSQL,
- the same Pages CMS env vars,
- a GitHub App,
- a stable public `BASE_URL`.

## Minimum checklist

1. Build and run the app.
2. Set all required env vars.
3. Point `BASE_URL` at the public app URL.
4. Configure the GitHub App callback, webhook, and setup URLs.
5. Run migrations.
6. Confirm webhook delivery.

## Environment variables

See [Environment variables](/docs/development/environment-variables/) for the full reference.

For self-hosting, make sure `BASE_URL` points to the final public HTTPS URL of your app.

## Build and run

Typical flow:

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

Use a stable HTTPS URL in front of the app.

Common setup:

- Nginx or Caddy as reverse proxy,
- TLS terminated at the proxy or platform edge,
- app running behind it on an internal port.

GitHub App callbacks and webhooks should always use the public HTTPS URL.

## GitHub App reminders

If you want the full manual setup flow, use [GitHub App](/docs/development/github-app/).

Use:

- User authorization callback URL: `<BASE_URL>/api/auth/callback/github`
- Webhook URL: `<BASE_URL>/api/webhook/github`
- Setup URL: `<BASE_URL>/`

Permissions:

- Administration: Read and write
- Contents: Read and write
- Metadata: Read only

Events:

- Installation target
- Repository
- Push
- Delete

Also:

- keep OAuth on install disabled,
- keep Redirect on update enabled,
- disable expiring user tokens if GitHub offers that setting,
- verify the webhook secret matches `GITHUB_APP_WEBHOOK_SECRET`.

## Operational concerns

Plan for:

- persistent env var management,
- database backups,
- log collection,
- process restarts,
- rolling updates or brief maintenance windows for deploys.

## Common self-hosting issues

- app is reachable locally but not from GitHub webhooks,
- wrong `BASE_URL`,
- HTTP instead of HTTPS in GitHub App settings,
- database migrations not applied,
- private key copied with broken newlines,
- reverse proxy not forwarding headers correctly.

## Related docs

- [GitHub App](/docs/development/github-app/)
- [Environment variables](/docs/development/environment-variables/)
- [Install locally](/docs/guides/install-local/)
