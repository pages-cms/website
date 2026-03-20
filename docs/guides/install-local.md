---
title: Install locally
description: Install and run Pages CMS locally with your own database, env vars, and GitHub App.
---

Use the GitHub App setup helper unless you have a reason not to. It is the fastest and least error-prone way to get a working local install.

## What you need

- a PostgreSQL database,
- a GitHub App,
- env vars for Pages CMS,
- a local clone of the repo.

## Fast path

1. Clone the repo.
2. Install dependencies.
3. Create `.env.local`.
4. Run the GitHub App setup helper.
5. Run database migrations.
6. Start the app.

## 1. Start PostgreSQL

```bash
docker run --name pagescms-db -e POSTGRES_USER=pagescms -e POSTGRES_PASSWORD=pagescms -e POSTGRES_DB=pagescms -p 5432:5432 -d postgres:16
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env.local`

Add at least:

```bash
DATABASE_URL=postgresql://pagescms:pagescms@localhost:5432/pagescms
BETTER_AUTH_SECRET=your-random-secret
CRYPTO_KEY=your-random-secret
```

Generate secrets with:

```bash
openssl rand -base64 32
```

## 4. Create your GitHub App with the helper

Pages CMS includes a setup helper and this should be your default path:

```bash
npm run setup:github-app -- --base-url http://localhost:3000
```

Useful options:

- `--owner-type personal|org`
- `--org <slug>`
- `--app-name "Pages CMS (dev)"`
- `--env .env.local`
- `--no-open`

The helper writes:

- `BASE_URL`
- `BETTER_AUTH_SECRET` if missing
- `GITHUB_APP_ID`
- `GITHUB_APP_NAME`
- `GITHUB_APP_CLIENT_ID`
- `GITHUB_APP_CLIENT_SECRET`
- `GITHUB_APP_PRIVATE_KEY`
- `GITHUB_APP_WEBHOOK_SECRET`

If you want to create the app yourself instead, use [GitHub App](/docs/development/github-app/).

## 5. Run migrations

```bash
npm run db:migrate
```

## 6. Start the app

```bash
npm run dev
```

If you want GitHub webhooks to hit your local app, use a public tunnel URL as the helper `--base-url`.

## Environment variables

See [Environment variables](/docs/development/environment-variables/) for the full reference.

## Common setup problems

- wrong user authorization callback URL,
- wrong setup URL,
- wrong webhook URL,
- Redirect on update disabled,
- missing repository permissions,
- `GITHUB_APP_NAME` not matching the GitHub App slug,
- private key copied with broken line breaks,
- missing database migrations,
- local app using `localhost` while the GitHub App points to a different public URL.

## Related docs

- [GitHub App](/docs/development/github-app/)
- [Environment variables](/docs/development/environment-variables/)
- [Install on Vercel](/docs/guides/install-vercel/)
- [Self-host Pages CMS](/docs/guides/install-self-host/)
