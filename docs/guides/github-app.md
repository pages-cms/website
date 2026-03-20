---
title: GitHub App
description: What the Pages CMS GitHub App does, how to create it with the helper, and how to configure it manually.
---

Pages CMS uses a GitHub App for repository access, user sign-in, webhook delivery, and installation-scoped repository operations.

## Using the helper

The fastest path is the built-in helper:

```bash
npm run setup:github-app -- --base-url http://localhost:3000
```

The helper creates the app from a manifest and prints the GitHub App environment variables for you.

If you pass `--env <path>`, it will also write them to that file.

Options:

| Option | What it does |
| --- | --- |
| `--base-url` | Sets the public app URL used for the callback URL, webhook URL, and setup URL. |
| `--env` | Writes the generated GitHub App environment variables to a file instead of only printing them. |
| `--owner-type` | Creates the app under a personal account or an organization. |
| `--org` | Sets the organization slug when `--owner-type org` is used. |
| `--app-name` | Sets the GitHub App display name. |
| `--no-open` | Does not try to open the browser automatically. |

Example:

```bash
npm run setup:github-app -- \
  --base-url https://cms.example.com \
  --env .env \
  --owner-type org \
  --org my-company \
  --app-name "Pages CMS" \
  --no-open
```

You will need to manually disable `User-to-server token expiration` if GitHub shows that option. This will avoid your users to be periodically logged out.

## Manually

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
