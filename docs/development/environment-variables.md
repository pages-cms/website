---
title: Environment variables
description: Required and optional environment variables for running Pages CMS.
---

## Required variables

Set these first.

Variable | Description
--- | ---
`DATABASE_URL` | PostgreSQL connection string.
`BETTER_AUTH_SECRET` | Secret used by Better Auth. `AUTH_SECRET` is also accepted.
`CRYPTO_KEY` | Key used to encrypt GitHub tokens in the database.
`GITHUB_APP_ID` | GitHub App ID.
`GITHUB_APP_NAME` | GitHub App slug used in GitHub URLs.
`GITHUB_APP_PRIVATE_KEY` | GitHub App private key.
`GITHUB_APP_WEBHOOK_SECRET` | Secret used to verify GitHub webhooks.
`GITHUB_APP_CLIENT_ID` | GitHub App client ID.
`GITHUB_APP_CLIENT_SECRET` | GitHub App client secret.

## Common optional variables

Variable | Description
--- | ---
`BASE_URL` | Public base URL for the app.
`CRON_SECRET` | Secret used to protect the cron endpoint.
`EMAIL_PROVIDER` | `resend` or `smtp`.
`EMAIL_FROM` | Sender address for auth and invitation emails.
`RESEND_API_KEY` | Required when using Resend.
`SMTP_HOST` | Required when using SMTP.
`SMTP_PORT` | SMTP port. Defaults to `587`.
`SMTP_SECURE` | Defaults to `true` when `SMTP_PORT=465`, otherwise `false`.
`SMTP_USER` | SMTP username.
`SMTP_PASSWORD` | SMTP password.

## Cache variables

Variable | Description
--- | ---
`CACHE_CHECK_MIN` | Cache reconcile interval in minutes. Default `5`.
`CONFIG_CHECK_MIN` | Config sync check interval in minutes. Default `5`.
`FILE_TTL_MIN` | File cache TTL in minutes. Default `1440`.
`PERMISSIONS_TTL_MIN` | Permission cache TTL in minutes. Default `60`.
`BRANCH_HEAD_TTL_MS` | Branch HEAD cache TTL in milliseconds. Default `15000`.
`REPO_META_TTL_MS` | Repository metadata cache TTL in milliseconds. Default `15000`.

## Generate secrets

```bash
openssl rand -base64 32
```

## Notes

- If you use the GitHub App helper, it writes the GitHub App variables for you.
- `GITHUB_APP_NAME` must be the app slug, not the display name.
- `BASE_URL`, callback URL, setup URL, and webhook URL must all point to the same app instance.
