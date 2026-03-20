---
title: Deploy on Vercel
description: Deploy Pages CMS on Vercel with PostgreSQL and a GitHub App.
---

## What you need

- a PostgreSQL database,
- a Vercel project,
- a GitHub App,
- a copy of the Pages CMS repo.

## Recommended order

1. Create the database.
2. Deploy the app to Vercel.
3. Set environment variables.
4. Create or update the GitHub App with the final Vercel URL.
5. Run migrations.
6. Install the GitHub App on the repositories you want to manage.

## Deploy the app

Deploy your fork or copy of the repo in Vercel.

After the first deploy, note the final app URL, for example:

```text
https://cms.example.com
```

## Set environment variables

Set at least:

- `DATABASE_URL`
- `CRYPTO_KEY`
- `BETTER_AUTH_SECRET`
- `BASE_URL`

Then add the GitHub App variables.

For the full list, see [Environment variables](/docs/development/environment-variables/).

## Configure the GitHub App

Prefer the helper if you can. If you configure the app manually, use:

- User authorization callback URL: `<BASE_URL>/api/auth/callback/github`
- Webhook URL: `<BASE_URL>/api/webhook/github`
- Setup URL: `<BASE_URL>/`

Minimum repository permissions:

- Administration: Read and write
- Contents: Read and write
- Metadata: Read only

Minimum events:

- Installation target
- Repository
- Push
- Delete

Also keep:

- OAuth on install: disabled
- Redirect on update: enabled

## Run migrations

```bash
npm run db:migrate
```
