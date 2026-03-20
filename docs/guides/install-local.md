---
title: Install locally
description: Run Pages CMS locally with PostgreSQL, environment variables, and a GitHub App.
---

## Step 1: Start PostgreSQL

```bash
docker run --name pagescms-db -e POSTGRES_USER=pagescms -e POSTGRES_PASSWORD=pagescms -e POSTGRES_DB=pagescms -p 5432:5432 -d postgres:16
```

## Step 2: Install dependencies

```bash
npm install
```

## Step 3: Create `.env.local`

```bash
DATABASE_URL=postgresql://pagescms:pagescms@localhost:5432/pagescms
BETTER_AUTH_SECRET=your-random-secret
CRYPTO_KEY=your-random-secret
```

You can generate secrets with:

```bash
openssl rand -base64 32
```

## Step 4: Create the GitHub App

Use [the helper](/docs/guides/github-app#using-the-helper):

```bash
npm run setup:github-app -- --base-url http://localhost:3000 --env .env.local
```

If you need other helper options, see [GitHub App helper](/docs/guides/github-app#using-the-helper).

## 5. Run migrations

```bash
npm run db:migrate
```

## 6. Start the app

```bash
npm run dev
```

If you need GitHub webhooks to hit your local app, use a public tunnel URL (e.g. [ngrok](https://ngrok.com/)) as the helper `--base-url`.
