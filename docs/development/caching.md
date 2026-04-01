---
title: Caching
description: How Pages CMS caches config, collections, media, and permission data.
---

Pages CMS uses GitHub as the source of truth and PostgreSQL as a read cache.

## Cache layers

| Layer | Scope | Purpose |
| --- | --- | --- |
| `config` table | Per `owner/repo/branch` | Stores parsed `.pages.yml` and its SHA. |
| `cache_file` table | Per cached row | Stores collection/media rows, file metadata, and cached content. |
| `cache_file_meta` table | Per branch and per folder scope | Tracks trusted branch state and trusted folder snapshots. |
| `cache_permission` table | Per user/repo | Caches access checks used by file cache endpoints. |
| In-memory TTL caches | Per server process | Short-lived branch HEAD and repository metadata lookups. |

## Config lifecycle

1. UI/API requests call `getConfig`.
2. If DB has config, it is returned immediately.
3. If DB is missing config and a GitHub token is available, Pages CMS fetches `.pages.yml` from GitHub, parses it, upserts DB, then returns it.
4. Optional sync mode (`sync: true`) can compare DB SHA with GitHub SHA using a TTL gate.

## Collection and media lifecycle

1. Requests read cached rows by folder path.
2. A folder snapshot is trusted only when folder meta is `ok`, has a `commitSha`, and matches branch state when branch meta is available.
3. If the folder snapshot is missing, expired, syncing, errored, empty, or otherwise untrusted, Pages CMS fetches the whole folder from GitHub.
4. That authoritative fetch replaces folder rows and folder meta together.
5. Empty folders are not cached as trusted snapshots.

## Incremental updates

Direct CMS writes and small webhook pushes can preserve an already-verified direct folder cache.

That means:

- an already-cached leaf folder can stay hot after a file add/update/delete,
- cold folders are never promoted from partial deltas,
- ancestor folders are invalidated and repopulated on the next read,
- if incremental preservation is incomplete or uncertain, the folder falls back to invalidation.

This keeps large hot folders fast without trusting partial snapshots.

## Staleness behavior

- **Client cache** uses SWR on top of the API responses.
- **Backend cache** trusts only verified folder snapshots.
- **Branch reconcile** is non-destructive: it updates branch-head state, and later folder reads decide whether a refetch is needed.

## Webhook push behavior

GitHub `push` webhooks use a tiered strategy to keep webhook responses fast while avoiding broad cache resets on normal commits:

1. For small pushes, Pages CMS applies incremental updates only to already-verified direct folders and invalidates the rest.
2. For medium pushes, Pages CMS skips per-file patching and invalidates only affected cache paths.
3. For very large pushes, Pages CMS invalidates the full branch cache as a safety fallback.

All fallback modes repopulate data on demand.

## Environment variables

| Variable | Unit | Default | Purpose |
| --- | --- | --- | --- |
| `CACHE_CHECK_MIN` | minutes | `5` | Reconcile interval for branch cache freshness checks. |
| `CONFIG_CHECK_MIN` | minutes | `5` | TTL gate for config SHA checks when sync is enabled. |
| `FILE_TTL_MIN` | minutes | `1440` | Max age for `cache_file` rows (`-1` no expiry, `0` no cache). |
| `PERMISSIONS_TTL_MIN` | minutes | `60` | Max age for `cache_permission` rows (`0` always recheck GitHub). |
| `BRANCH_HEAD_TTL_MS` | milliseconds | `15000` | In-memory TTL for branch HEAD lookups. |
| `REPO_META_TTL_MS` | milliseconds | `15000` | In-memory TTL for repo metadata snapshot lookups. |
| `WEBHOOK_PUSH_INCREMENTAL_MAX_FILES` | files | `120` | Max changed paths for incremental push processing. |
| `WEBHOOK_PUSH_SCOPED_INVALIDATION_MAX_FILES` | files | `800` | Max changed paths for scoped invalidation before full branch invalidation. |

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/development/database/" class="badge-outline">
    Database
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/development/environment-variables/" class="badge-outline">
    Environment variables
    {% lucide "arrow-right" %}
  </a>
</div>
