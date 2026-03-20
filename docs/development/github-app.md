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

## Manual settings

Open GitHub App settings:

- personal apps: `https://github.com/settings/apps`
- org apps: `https://github.com/organizations/<org>/settings/apps`

Use these settings:

- Homepage URL: `<BASE_URL>`
- User authorization callback URL: `<BASE_URL>/api/auth/callback/github`
- Webhook URL: `<BASE_URL>/api/webhook/github`
- Setup URL: `<BASE_URL>/`
- Keep `Redirect on update` enabled
- Repository permissions:
  - Administration: Read and write
  - Actions: Read and write
  - Checks: Read only
  - Commit statuses: Read only
  - Contents: Read and write
  - Metadata: Read only
- Events:
  - Installation target
  - Repository
  - Push
  - Delete
- Keep `Request user authorization (OAuth) during installation` disabled
- Generate and download a private key
- Set a webhook secret
- If GitHub shows an option for expiring user tokens, disable it
- Install the app on the accounts or repositories you want Pages CMS to manage

The helper already sets `request_oauth_on_install: false`, but GitHub does not expose every setting through the manifest flow, so it is still worth reviewing the app after creation.

With `Request user authorization (OAuth) during installation` disabled, GitHub sends install and update completion to the Setup URL, not the user authorization callback URL. Pages CMS uses the user authorization callback only for Better Auth GitHub sign-in and account linking.

`Redirect on update` should stay enabled so repository add/remove changes send the user back through the same Setup URL flow.

`Actions` is used to trigger GitHub Actions workflows. `Checks` and `Commit statuses` let Pages CMS read build and deployment status from providers that report back to GitHub, such as GitHub Pages, Vercel, Netlify, or Cloudflare.
