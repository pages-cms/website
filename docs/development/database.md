---
title: Database
description: Migrations, operational scripts, and database maintenance for Pages CMS.
---

Pages CMS stores app state in PostgreSQL: auth data, collaborators, parsed config, and cache metadata. Content itself stays in GitHub.

## Migrations

Generate a migration when the schema changes:

```bash
npm run db:generate
```

Apply migrations with:

```bash
npm run db:migrate
```

`npm run build` also runs migrations through `postbuild`.

Use manual `npm run db:migrate` when:

- setting up local development,
- deploying on platforms where `postbuild` is skipped,
- applying migrations before switching traffic to a new deployment.

## Cache-related tables

| Table | Purpose |
| --- | --- |
| `config` | Parsed `.pages.yml` plus its SHA. |
| `cache_file` | Cached collection/media rows. |
| `cache_file_meta` | Branch and folder snapshot state. |
| `cache_permission` | Cached repo permission checks. |

## Database scripts

| Script | Purpose | Typical use |
| --- | --- | --- |
| `npm run db:clear-cache` | Clears cache tables used for repository/config/permission caching. | Safe when cache state is stale or corrupted. GitHub remains the source of truth. |
| `npm run db:collaborators:export -- --output=collaborators.csv` | Exports collaborators to CSV. | Move collaborators to a new deployment/database. |
| `npm run db:collaborators:import -- --input=collaborators.csv` | Imports collaborators from CSV. | Restore/migrate collaborator assignments. |

## Operational note

After cache-logic upgrades, it can be worth running `npm run db:clear-cache` once so old cached rows do not survive into the new behavior.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/development/caching/" class="badge-outline">
    Caching
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/guides/migrating-collaborators/" class="badge-outline">
    Migrating collaborators
    {% lucide "arrow-right" %}
  </a>
</div>
