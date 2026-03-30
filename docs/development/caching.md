---
title: Caching
description: How Pages CMS caches config, collections, media, and permission data.
---

Pages CMS uses GitHub as the source of truth and a DB cache for fast reads.

## Cache layers

| Layer | Scope | Purpose |
| --- | --- | --- |
| `config` table | Per `owner/repo/branch` | Stores parsed `.pages.yml` and its SHA. |
| `cache_file` table | Per file or directory row | Stores collection/media listings, file metadata, and cached content. |
| `cache_file_meta` table | Per branch and per folder scope | Tracks cache state (`ok`, `syncing`, `error`) for branch and folder caches. |
| `cache_permission` table | Per user/repo | Caches access checks used by file cache endpoints. |
| In-memory TTL caches | Per server process | Short-lived branch HEAD and repository metadata lookups. |

## Config lifecycle

1. UI/API requests call `getConfig`.
2. If DB has config, it is returned immediately.
3. If DB is missing config and a GitHub token is available, Pages CMS fetches `.pages.yml` from GitHub, parses it, upserts DB, then returns it.
4. Optional sync mode (`sync: true`) can compare DB SHA with GitHub SHA using a TTL gate.

This bootstrap-on-miss guarantees first-open repos still load config even before webhooks run.

## Collection and media lifecycle

1. Requests read cache by folder path.
2. Pages CMS uses `cache_file_meta` to decide whether that folder cache is trusted.
3. If folder cache is missing, stale, syncing, or invalid, Pages CMS fetches from GitHub and refreshes the folder cache.
4. Successful refresh marks the folder cache `ok`, including valid empty folders.
5. Direct writes and webhook updates keep folder cache rows and folder meta in sync.

This keeps normal navigation fast while avoiding partial or transient folder cache states.

## Staleness behavior

- **Backend cache** uses DB rows plus folder-level cache state.
- **Client state** (for example current config in layout/provider) is in-memory for the current session and may lag external edits until refresh or polling updates.
- Background reconcile may refresh cache after the response, but folder cache is only trusted when its state is valid.

## Webhook push behavior

GitHub `push` webhooks use a tiered strategy to keep webhook responses fast while avoiding broad cache resets on normal commits:

1. For small pushes, Pages CMS applies incremental file cache updates.
2. For medium pushes, Pages CMS skips per-file processing and invalidates only affected cache paths.
3. For very large pushes, Pages CMS invalidates the full branch cache as a safety fallback.

All fallback modes invalidate cache only. The next user request repopulates data on demand.

## Environment variables

| Variable | Unit | Default | Purpose |
| --- | --- | --- | --- |
| `CACHE_CHECK_MIN` | minutes | `5` | Reconcile interval for file cache freshness checks. |
| `CONFIG_CHECK_MIN` | minutes | `5` | TTL gate for config SHA checks when sync is enabled. |
| `FILE_TTL_MIN` | minutes | `1440` | Max age for `cache_file` rows (`-1` no expiry, `0` no cache). |
| `PERMISSIONS_TTL_MIN` | minutes | `60` | Max age for `cache_permission` rows (`0` always recheck GitHub). |
| `BRANCH_HEAD_TTL_MS` | milliseconds | `15000` | In-memory TTL for branch HEAD lookups. |
| `REPO_META_TTL_MS` | milliseconds | `15000` | In-memory TTL for repo metadata snapshot lookups. |
| `WEBHOOK_PUSH_INCREMENTAL_MAX_FILES` | files | `120` | Max changed paths for incremental push processing. |
| `WEBHOOK_PUSH_SCOPED_INVALIDATION_MAX_FILES` | files | `800` | Max changed paths for scoped invalidation before full branch invalidation. |

Legacy aliases are still accepted for backward compatibility.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration/settings/" class="badge-outline">
    Configuration settings
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/guides/creating-custom-field/" class="badge-outline">
    Developer guides
    {% lucide "arrow-right" %}
  </a>
</div>
