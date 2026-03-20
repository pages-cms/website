---
title: Migrating collaborators
description: Export and import collaborators when moving between Pages CMS installs.
---

If you change database, you will need to make sure you migrate collaborators as they are only saved in the database. All other tables (cache, users, etc) can be wiped as they will be populated back as users log in and edits are made.

## Step 1: Export from current database

```bash
npm run db:collaborators:export -- --output=collaborators.csv
```

## Step 2: Import into new database

```bash
npm run db:collaborators:import -- --input=collaborators.csv
```

Optional flags:

- `--replace`: clear current collaborators before import
- `--default-invited-by-user-id=<userId>`
- `--default-invited-by-email=<email>`

## Export from legacy SQLite/libSQL (older versions)

If you are migrating from an older version of Pages CMS that used libSQL/Turso, use the standalone legacy exporter script (shared as a gist), then run:

```bash
SQLITE_URL="libsql://..." SQLITE_AUTH_TOKEN="..." \
npx -y -p @libsql/client node export-collaborators-legacy-libsql.mjs --out=collaborators.csv
```

You will then be able to import the exported `.csv` as normal with `db:collaborators:import`.
