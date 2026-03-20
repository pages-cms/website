---
title: GitHub App
description: What the Pages CMS GitHub App does, how to create it with the helper, and how to configure it manually.
---

Pages CMS uses a GitHub App for repository access, user sign-in, webhook delivery, and installation-scoped repository operations.

## Helper

The fastest path is the built-in helper:

```bash
npm run setup:github-app -- --base-url http://localhost:3000
```

Common options:

- `--owner-type personal|org`
- `--org <slug>`
- `--app-name "Pages CMS"`
- `--env .env.local`
- `--no-open`

The helper creates the app from a manifest and writes the GitHub App environment variables for you.

The manifest already sets the callback URL, setup URL, webhook URL, permissions, events, `Request user authorization (OAuth) during installation`, and `Redirect on update`.

After helper-based setup, you will need to disable `User-to-server token expiration` if GitHub shows that option. This will avoid your users to be periodically logged out.

## Manual settings

Open GitHub App settings:

- personal apps: `https://github.com/settings/apps`
- org apps: `https://github.com/organizations/<org>/settings/apps`

Match the permissions and events below:

| Section | Name | Value |
| --- | --- | --- |
| Account permissions | Email addresses | Read only |
| Repository permissions | Administration | Read and write |
| Repository permissions | Actions | Read and write |
| Repository permissions | Checks | Read only |
| Repository permissions | Commit statuses | Read only |
| Repository permissions | Contents | Read and write |
| Repository permissions | Metadata | Read only |
| Events | Installation target | Enabled |
| Events | Repository | Enabled |
| Events | Push | Enabled |
| Events | Delete | Enabled |
| Events | Check run | Enabled |
| Events | Check suite | Enabled |
| Events | Status | Enabled |
| Events | Workflow run | Enabled |

Finally:

- generate and download a private key (for `GITHUB_APP_PRIVATE_KEY`),
- set a webhook secret (for `GITHUB_APP_WEBHOOK_SECRET`),
- disable `User-to-server token expiration` if GitHub offers that setting (in "Optional features"),
