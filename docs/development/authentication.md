---
title: Authentication
description: How Pages CMS chooses between a GitHub user token and a GitHub App installation token.
---

## Authentication model

Pages CMS can operate with either:

- a GitHub user token,
- a GitHub App installation token.

The token choice depends on who is signed in and what access they have.

## Token selection order

For repository reads and writes, Pages CMS follows this order:

1. Check whether the signed-in user has a GitHub token.
2. If access checks are enabled, verify that token can access the target repository.
3. If yes, use the GitHub user token.
4. If not, check for collaborator access for the current `owner/repo`.
5. If a collaborator record exists, use the repository's GitHub App installation token.
6. If neither path succeeds, deny access.

## Collaborator scope

Collaborator access is scoped to one repository.

The fallback check matches:

- collaborator email,
- repository owner,
- repository name.

## Commits and attribution

When Pages CMS writes with a GitHub user token, GitHub handles attribution normally.

When Pages CMS writes with the GitHub App installation token, it still sets committer metadata from the current user:

- `name`: user name, or email if name is missing,
- `email`: user email.

That is why collaborator edits still show the collaborator's name and email in commit metadata.

## Routes that require a GitHub user

Collaborator fallback does not apply everywhere.

The following areas require a real GitHub identity:

- configuration management,
- collaborator management,
- cache management.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration/collaborators/" class="badge-outline">
    Collaborators
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/development/caching/" class="badge-outline">
    Caching
    {% lucide "arrow-right" %}
  </a>
</div>
