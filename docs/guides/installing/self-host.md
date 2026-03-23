---
title: Self-host
description: Run Pages CMS on your own infrastructure.
---

## Step 1: Create a PostgreSQL database

You will need a `DATABASE_URL`.

<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Using Supabase?</h3>
  <section>
    <p>
      If you run migrations during deployment, prefer the Supabase Session Pooler for
      <code>DATABASE_URL</code>. Direct connections can cause connectivity issues on some
      hosting providers.
    </p>
  </section>
</div>

## Step 2: Create `.env`

Add at least:

```bash
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-random-secret
CRYPTO_KEY=your-random-secret
BASE_URL=https://cms.example.com
```

You can generate secrets with:

```bash
openssl rand -base64 32
```

## Step 3: Create the GitHub App

Use [the helper](/docs/guides/installing/github-app/#using-the-helper):

```bash
npm run setup:github-app -- --base-url https://cms.example.com --env .env
```

This writes the GitHub App environment variables into `.env.production`.

If you need other helper options, see [GitHub App helper](/docs/guides/installing/github-app/#using-the-helper).

## Step 4: Install dependencies

```bash
npm install
```

## Step 5: Run migrations

```bash
npm run db:migrate
```

## Step 6: Build and run

```bash
npm run build
npm run start
```

## Step 7: Put HTTPS in front of the app

Use a stable public HTTPS URL in front of the app.

Typical setup:

- Nginx or Caddy as reverse proxy
- TLS at the proxy or platform edge
- the app behind it on an internal port
