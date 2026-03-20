---
title: Collaborators
description: What collaborators can access in Pages CMS and how their changes are committed.
---

## What are collaborators

For each repository, you can invite users by email if they do not have a GitHub account. This is particularly helpful for non-technical users (e.g. marketing team).

If they accept the invitation, they will be able to use Pages CMS like other users, with a couple caveats.

## Permissions

Collaborators can edit content and media for the repositories they've been invited to. You can revoke their access at any given point.

Specifically, collaborators can not access or edit the repository configuration (`.pages.yml`), see or manage collaborators, or access the cache admin panel (if enabled). These are reserved for GitHub users with access to the repository on GitHub.

## Commits

Collaborator changes are made using the GitHub App isntallation token. They will show up as a GitHub App commit, but include name and email defined in their account.

## Migration

Collaborators are only saved in the database, not the configuration file. If you need to migrate to a new install of Pages CMS, you will need to use [the collaborators import/export scripts](/docs/migrating-collaborators).
