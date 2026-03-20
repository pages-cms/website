---
title: Migrating collaborators
description: Export and import collaborators when moving between Pages CMS installs.
---

## When you need this

Collaborators are stored in the database, not in `.pages.yml`.

If you move to a new database or a new Pages CMS install, migrate collaborators separately.

## Export from the current database

```bash
npm run db:collaborators:export -- --output=collaborators.csv
```

## Import into the new database

```bash
npm run db:collaborators:import -- --input=collaborators.csv
```

## Optional import flags

- `--replace`: remove current collaborators before import.
- `--default-invited-by-user-id=<userId>`
- `--default-invited-by-email=<email>`

## Export from legacy SQLite or libSQL

If you are migrating from an older Pages CMS install that used SQLite or libSQL/Turso, first export collaborators with the following script: [`export-collaborators-legacy-libsql.mjs`](https://gist.github.com/hunvreus/0738ab0bfa85ed9cd528ca8b7a5ca4f3)

```bash
SQLITE_URL="libsql://..." SQLITE_AUTH_TOKEN="..." \
npx -y -p @libsql/client node export-collaborators-legacy-libsql.mjs --out=collaborators.csv
```

Once done, you can import the resulting CSV.
