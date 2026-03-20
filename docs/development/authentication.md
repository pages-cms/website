---
title: Authentication
description: How Pages CMS chooses between a GitHub user token and a GitHub App installation token.
---

Pages CMS uses two authentication paths:

- a GitHub user token,
- a GitHub App installation token.

Which one is used depends on who is editing and what access they have.

## Token selection

For repository reads and writes, Pages CMS first checks whether the signed-in user has a GitHub account token.

If access verification is enabled, Pages CMS confirms that token can access the target repository. If it can, the request runs as the GitHub user.

If that check fails, Pages CMS falls back to collaborator access for the current `owner/repo`. When a collaborator record exists, Pages CMS requests a GitHub App installation token for that repository and uses that token instead.

## Repository scope

Collaborator access is scoped per repository.

The fallback check matches:

- collaborator email,
- repository owner,
- repository name.

If no matching collaborator permission exists, access is denied.

## Writes and committer identity

When the request uses a GitHub user token, GitHub handles commit attribution normally.

When the request uses the GitHub App installation token, Pages CMS still sets the committer metadata from the current user:

- `name`: user name, or email if name is missing,
- `email`: user email.

This is why collaborator edits still show the collaborator's name and email in the commit metadata even though the write is performed through the GitHub App.

## Admin routes

Some routes require a real GitHub identity and do not allow collaborator fallback.

That includes:

- configuration management,
- collaborator management,
- cache management.

Use this model when you need content editing for invited users, but keep repository administration limited to GitHub users.

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
