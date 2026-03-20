---
title: Environment variables
description: Required and optional environment variables for running Pages CMS locally or on your own infrastructure.
---

Use this page as the single reference for Pages CMS environment variables.

## Required variables

Variable | Description
--- | ---
`DATABASE_URL` | PostgreSQL connection string.
`BETTER_AUTH_SECRET` | Secret used by Better Auth. `AUTH_SECRET` is also accepted as a fallback alias.
`CRYPTO_KEY` | Used to encrypt GitHub tokens in the database.
`GITHUB_APP_ID` | GitHub App ID.
`GITHUB_APP_NAME` | GitHub App slug, used in GitHub URLs such as `github.com/apps/<slug>`.
`GITHUB_APP_PRIVATE_KEY` | GitHub App private key. In `.env.local`, this is typically stored as a single-line escaped string.
`GITHUB_APP_WEBHOOK_SECRET` | Webhook secret for validating GitHub webhook deliveries.
`GITHUB_APP_CLIENT_ID` | GitHub App client ID.
`GITHUB_APP_CLIENT_SECRET` | GitHub App client secret.

## Common optional variables

Variable | Description
--- | ---
`BASE_URL` | Public base URL for the app. Useful outside plain local development, and required when your app is reachable on a non-default hostname.
`CRON_SECRET` | Secret used to secure the cron endpoint.
`EMAIL_PROVIDER` | Set to `resend` or `smtp`. If omitted, Pages CMS auto-selects based on the configured email credentials.
`EMAIL_FROM` | Sender used for auth and invitation emails.
`RESEND_API_KEY` | Required when using Resend.
`SMTP_HOST` | Required when using SMTP.
`SMTP_PORT` | SMTP port. Defaults to `587`.
`SMTP_SECURE` | SMTP secure mode. Defaults to `true` when `SMTP_PORT=465`, otherwise `false`.
`SMTP_USER` | SMTP username.
`SMTP_PASSWORD` | SMTP password.

## Cache and performance variables

Variable | Description
--- | ---
`CACHE_CHECK_MIN` | Cache reconcile interval, in minutes. Defaults to `5`.
`CONFIG_CHECK_MIN` | Config sync check interval, in minutes. Defaults to `5`.
`FILE_TTL_MIN` | File cache TTL, in minutes. Defaults to `1440`.
`PERMISSIONS_TTL_MIN` | Permission cache TTL, in minutes. Defaults to `60`.
`BRANCH_HEAD_TTL_MS` | In-memory branch HEAD cache TTL, in milliseconds. Defaults to `15000`.
`REPO_META_TTL_MS` | In-memory repository metadata cache TTL, in milliseconds. Defaults to `15000`.

## Notes

- Generate secrets with:

```bash
openssl rand -base64 32
```

- If you use the GitHub App helper, it writes the GitHub App variables for you.
- `GITHUB_APP_NAME` must match the actual app slug, not just the display name.
- `BASE_URL`, the user authorization callback URL, the setup URL, and the webhook URL should all match the same app instance.
