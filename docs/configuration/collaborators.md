---
title: Collaborators
description: What collaborators can do and how their changes are committed.
---

## What collaborators are

Collaborators are invited by email.

Use them when someone needs to edit content or media but does not have a GitHub account.

## What collaborators can do

Collaborators can:

- open repositories they were invited to,
- edit content,
- edit media.

## What collaborators cannot do

Collaborators cannot:

- manage `.pages.yml`,
- manage collaborators,
- access cache admin features.

Those actions stay limited to GitHub users with repository access.

## How collaborator commits work

Collaborator writes use the GitHub App installation token for the target repository.

By default, Pages CMS does not send the collaborator's name and email as committer metadata.

That means:

- the write is authorized by the GitHub App,
- the commit uses the authenticated app/installation identity unless commit identity is explicitly set to `user`.

If you want collaborator writes to include the collaborator's name and email as committer metadata, set `settings.commit.identity: user` or override a specific schema with `commit.identity: user`.

## Migration

Collaborators live in the database, not in `.pages.yml`.

If you move to a new Pages CMS install, export and import collaborators separately.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/guides/migrating-collaborators/" class="badge-outline">
    Migrate collaborators
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/development/authentication/" class="badge-outline">
    Authentication details
    {% lucide "arrow-right" %}
  </a>
</div>
