---
title: Deploy on Vercel
description: Deploy Pages CMS on Vercel with PostgreSQL and a GitHub App.
---

Use the GitHub App setup helper if you can. It is the quickest way to generate the app credentials, then you can update the URLs to your final Vercel domain.

## What you need

- a fork or copy of the Pages CMS repo,
- a PostgreSQL database,
- a Vercel project,
- a GitHub App.

## Recommended order

1. Create your database.
2. Deploy Pages CMS to Vercel.
3. Set env vars in Vercel.
4. Create or update the GitHub App with your Vercel URL.
5. Run migrations.
6. Install the GitHub App on your repositories.

## Database

Use any PostgreSQL database. Supabase is a common choice.

You need:

- `DATABASE_URL`
- `CRYPTO_KEY`
- `BETTER_AUTH_SECRET`

## Deploy the app

Deploy from your fork or repository in Vercel.

After the first deploy, note the final app URL, for example:

```text
https://cms.example.com
```

## Set environment variables

See [Environment variables](/docs/development/environment-variables/) for the full list.

At minimum, set `BASE_URL` to your final Vercel domain along with the required Pages CMS and GitHub App variables.

## GitHub App

Prefer creating the GitHub App with the helper script, then updating the app URLs to your final Vercel domain. If you want to do it manually, use [GitHub App](/docs/development/github-app/).

Required URLs:

- User authorization callback URL: `<BASE_URL>/api/auth/callback/github`
- Webhook URL: `<BASE_URL>/api/webhook/github`
- Setup URL: `<BASE_URL>/`

Required repository permissions:

- Administration: Read and write
- Contents: Read and write
- Metadata: Read only

Required events:

- Installation target
- Repository
- Push
- Delete

Also review:

- keep OAuth on install disabled,
- keep Redirect on update enabled,
- disable expiring user tokens if GitHub shows the option.

## Run migrations

Run:

```bash
npm run db:migrate
```

If you prefer, run this from your local clone against the production database.

## Common Vercel issues

- `BASE_URL` does not match the deployed domain,
- GitHub App callback URL still points to localhost,
- private key formatting is broken,
- migrations were not run,
- webhook URL points to an old preview deployment.

## Related docs

- [GitHub App](/docs/development/github-app/)
- [Environment variables](/docs/development/environment-variables/)
- [Install locally](/docs/guides/install-local/)
