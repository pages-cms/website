---
title: Upgrading to 2.x
description: Upgrade an existing Pages CMS 1.x deployment to 2.x.
---

## Upgrade checklist

1. **Back up the deployment.** Save the current database and environment configuration before changing anything.
2. **Optional: Migrate to PostgreSQL.** Pages CMS 2.x expects PostgreSQL for normal deployments. If you still use SQLite or legacy libSQL/Turso, migrate collaborators first: [Migrating collaborators](/docs/guides/migrating-collaborators/).
3. [**Update environment variables (see below).**](#update-environment-variables).
4. [**Update the GitHub App (see below).**](#update-github-app)
5. **Run migrations.** Apply the 2.x database migrations before serving traffic: `npm run db:migrate`.
6. **Redeploy the app.** Restart the app with the new code and environment.
7. **Verify the upgrade.** Confirm GitHub sign-in, repository installation, webhook delivery, build status display, and GitHub Actions triggering if you use it.

## Add environment variables

- `BETTER_AUTH_SECRET`: A random secret for the new auth library (Better Auth).
- `BASE_URL`: This is now required.

More info: [Environment variables](/docs/development/environment-variables/)

## Update GitHub App

More info: [GitHub App](/docs/guides/github-app/)

### Add account permissions

| Permission | Value |
| --- | --- |
| Email addresses | Read only |

### Add repository permissions

| Permission | Value |
| --- | --- |
| Actions | Read and write |
| Checks | Read only |
| Commit statuses | Read only |

## Add webhook events

| Event |
| --- |
| Check run |
| Check suite |
| Status |
| Workflow run |

### Confirm URLs and install behavior

| Setting | Value |
| --- | --- |
| User authorization callback URL | `<BASE_URL>/api/auth/callback/github` |
| Webhook URL | `<BASE_URL>/api/webhook/github` |
| Setup URL | `<BASE_URL>/` |
| Redirect on update | Enabled |
| Request user authorization during installation | Disabled |