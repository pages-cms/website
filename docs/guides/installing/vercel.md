---
title: Deploy on Vercel
description: Deploy Pages CMS on Vercel with PostgreSQL and a GitHub App.
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

## Step 2: Choose your public URL

Use one of these:

- your custom domain, for example `https://cms.example.com`
- your Vercel production domain, for example `https://my-pages-cms.vercel.app`

Use the same URL everywhere:

- `BASE_URL`
- GitHub App callback URL
- GitHub App webhook URL
- GitHub App setup URL

If you use the default Vercel domain, make sure it matches the project name you create in the next steps.

## Step 3: Create the GitHub App

Use [the helper](/docs/guides/github-app#using-the-helper):

```bash
npm run setup:github-app -- --base-url https://cms.example.com --env .env
```

If you need other helper options, see [GitHub App helper](/docs/guides/github-app#using-the-helper).

This writes the GitHub App environment variables to `.env`.

## Step 4: Create the Vercel project

Use the deploy button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpages-cms%2Fpages-cms%2Ftree%2Fmain&project-name=pages-cms&repository-name=pages-cms&redirect-url=https%3A%2F%2Fpagescms.org%2Fdocs%2Fguides%2Finstall-vercel%2F&env=BASE_URL,DATABASE_URL,BETTER_AUTH_SECRET,CRYPTO_KEY,GITHUB_APP_ID,GITHUB_APP_NAME,GITHUB_APP_PRIVATE_KEY,GITHUB_APP_WEBHOOK_SECRET,GITHUB_APP_CLIENT_ID,GITHUB_APP_CLIENT_SECRET&envDescription=Enter%20the%20required%20environment%20variables%20for%20Pages%20CMS.&envLink=https%3A%2F%2Fpagescms.org%2Fdocs%2Fdevelopment%2Fenvironment-variables%2F)

If you prefer, you can also create the project manually in Vercel.

Use the GitHub App environment variables from the previous step, plus:

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

For the full list, see [Environment variables](/docs/development/environment-variables/).

## Step 5: Deploy your app

Deploy the app in Vercel.

If you change the production URL later, update `BASE_URL` and the GitHub App URLs to match it.

## Step 6: Run migrations

Run the migration against your production database:

```bash
npm run db:migrate
```
