---
title: Database
description: Migrations, operational scripts, and upgrade-related database maintenance.
---

Pages CMS stores app state in PostgreSQL (auth, collaborators, cache, and settings metadata).

## Migrations

Run migrations with:

```bash
npm run db:migrate
```

`npm run build` also runs migrations through `postbuild`.

Use manual `npm run db:migrate` when:

- setting up local development,
- deploying on platforms where `postbuild` is skipped,
- applying migrations before switching traffic to a new deployment.

## Database scripts

| Script | Purpose | Typical use |
| --- | --- | --- |
| `npm run db:clear-cache` | Clears cache tables used for repository/config/permission caching. | Run once after 1.x -> 2.x upgrade, or when cache state is known stale/corrupt. |
| `npm run db:collaborators:export -- --output=collaborators.csv` | Exports collaborators to CSV. | Move collaborators to a new deployment/database. |
| `npm run db:collaborators:import -- --input=collaborators.csv` | Imports collaborators from CSV. | Restore/migrate collaborator assignments. |

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/guides/upgrading-to-2/" class="badge-outline">
    Upgrading to 2.x
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/guides/migrating-collaborators/" class="badge-outline">
    Migrating collaborators
    {% lucide "arrow-right" %}
  </a>
</div>
