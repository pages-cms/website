---
title: Upgrading to 2.x
description: Upgrade an existing Pages CMS 1.x deployment to 2.x.
---

## Upgrade checklist

1. **Back up the deployment.** Save the current database and environment configuration before changing anything.
2. **Optional: Migrate to PostgreSQL.** Pages CMS 2.x expects PostgreSQL for normal deployments. If you still use SQLite or legacy libSQL/Turso, migrate collaborators first: [Migrating collaborators](/docs/guides/migrating-collaborators/).
3. **Update environment variables.** Compare your deployment against [Environment variables](/docs/development/environment-variables/) and add or replace anything that changed in 2.x (e.g. `BETTER_AUTH_SECRET`).
4. [**Update the GitHub App (see below).**](#update-github-app) Do not recreate it unless you need to.
5. **Run migrations.** Apply the 2.x database migrations before serving traffic: `npm run db:migrate`.
6. **Redeploy the app.** Restart the app with the new code and environment.
7. **Verify the upgrade.** Confirm GitHub sign-in, repository installation, webhook delivery, build status display, and GitHub Actions triggering if you use it.

## Update GitHub App

For the full settings list, see [GitHub App](/docs/development/github-app/).

### Add account permissions

| Setting | Value | Why |
| --- | --- | --- |
| Email addresses | Read only | Required for GitHub sign-in through Better Auth. |

### Add or confirm repository permissions

| Permission | Value | Why |
| --- | --- | --- |
| Administration | Read and write | Existing app/repository management behavior. |
| Actions | Read and write | Lets users trigger GitHub Actions from the UI. |
| Checks | Read only | Reads build and deployment status reported back to GitHub. |
| Commit statuses | Read only | Reads build and deployment status reported back to GitHub. |
| Contents | Read and write | Existing content editing behavior. |
| Metadata | Read only | Existing repository integration behavior. |

### Add webhook events

| Event | Why |
| --- | --- |
| Installation target | Existing account/install cache updates. |
| Repository | Existing repository rename/delete/transfer handling. |
| Push | Existing cache refresh behavior. |
| Delete | Existing branch deletion cache cleanup. |
| Check run | Refresh check-based build status. |
| Check suite | Refresh check-based build status. |
| Status | Refresh commit status-based build status. |
| Workflow run | Refresh GitHub Actions run status. |

### Confirm URLs and install behavior

| Setting | Value |
| --- | --- |
| User authorization callback URL | `<BASE_URL>/api/auth/callback/github` |
| Webhook URL | `<BASE_URL>/api/webhook/github` |
| Setup URL | `<BASE_URL>/` |
| Redirect on update | Enabled |
| Request user authorization during installation | Disabled |
