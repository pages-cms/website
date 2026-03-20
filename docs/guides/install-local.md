---
title: Install locally
description: Run Pages CMS locally with PostgreSQL, environment variables, and a GitHub App.
---

## What you need

- a local clone of the repo,
- PostgreSQL,
- environment variables,
- a GitHub App.

## Steps

1. Start PostgreSQL.
2. Install dependencies.
3. Create `.env.local`.
4. Create the GitHub App.
5. Run migrations.
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

## 4. Create the GitHub App

Use the helper:

```bash
npm run setup:github-app -- --base-url http://localhost:3000
```

Useful options:

- `--owner-type personal|org`
- `--org <slug>`
- `--app-name "Pages CMS (dev)"`
- `--env .env.local`
- `--no-open`

## 5. Run migrations

```bash
npm run db:migrate
```

## 6. Start the app

```bash
npm run dev
```

If you need GitHub webhooks to hit your local app, use a public tunnel URL as the helper `--base-url`.
