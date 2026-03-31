---
title: Settings
description: Configure repository-wide behavior in Pages CMS.
---

## What `settings` does

Use `settings` for behavior that applies across the whole repository.

Typical uses:

- hide admin pages,
- preserve unmanaged keys when saving structured content,
- define default commit messages,
- choose commit identity behavior.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">hide</code> | If `true`, hides the Settings page in the UI.
<code class="text-[var(--prism-keyword)]">content</code> | Controls how structured content is saved. [See `Content`](#content).
<code class="text-[var(--prism-keyword)]">commit</code> | Controls commit settings. [See `Commit`](#commit).

## Content

For now, `settings.content` only supports `merge`.

Value | Behavior
--- | ---
`false` | Default. Rewrite the file from the configured schema only. Anything outside the submitted editor output is removed.
`true` | Merge the submitted fields into the existing file before saving. Keys outside the schema are preserved unless the editor overwrites them.

## Commit

### Commit templates

`settings.commit.templates` defines the default commit message format for content and media changes.

Key | Default value
--- | ---
`create` | `Create {path} (via Pages CMS)`
`update` | `Update {path} (via Pages CMS)`
`delete` | `Delete {path} (via Pages CMS)`
`rename` | `Rename {oldPath} to {newPath} (via Pages CMS)`

`content[].commit.templates` and `media[].commit.templates` override these global templates.

Within these templates, you can use any of the following tokens:

Token | Description
--- | ---
<code class="text-[var(--prism-keyword)]">{action}</code> | Current action: `create`, `update`, `delete`, or `rename`.
<code class="text-[var(--prism-keyword)]">{path}</code> | File path.
<code class="text-[var(--prism-keyword)]">{filename}</code> | File name only.
<code class="text-[var(--prism-keyword)]">{name}</code> | Content or media entry name.
<code class="text-[var(--prism-keyword)]">{owner}</code> | Repository owner.
<code class="text-[var(--prism-keyword)]">{repo}</code> | Repository name.
<code class="text-[var(--prism-keyword)]">{branch}</code> | Current branch.
<code class="text-[var(--prism-keyword)]">{user}</code> | Current user identifier. Kept for compatibility.
<code class="text-[var(--prism-keyword)]">{userName}</code> | Current user display name when available.
<code class="text-[var(--prism-keyword)]">{userEmail}</code> | Current user email when available.
<code class="text-[var(--prism-keyword)]">{oldPath}</code> | Previous path. Rename only.
<code class="text-[var(--prism-keyword)]">{newPath}</code> | New path. Rename only.
<code class="text-[var(--prism-keyword)]">{oldFilename}</code> | Previous file name. Rename only.
<code class="text-[var(--prism-keyword)]">{newFilename}</code> | New file name. Rename only.

Prefer `{userName}` and `{userEmail}` in new templates. `{user}` remains available as a legacy fallback.

### Commit identity

`settings.commit.identity` controls whether Pages CMS sends explicit committer metadata on writes.

Value | Behavior
--- | ---
`app` | Default. Do not send explicit committer metadata. GitHub uses the authenticated writer identity for the request.
`user` | Send the current user's name and email as committer metadata when available.

`content[].commit.identity` and `media[].commit.identity` override the global setting for a specific schema.

## Examples

### Global commit templates and identity

```yaml
settings:
  commit:
    identity: app
    templates:
      create: "content(create): {path}"
      update: "content(update): {path}"
      delete: "content(delete): {path}"
      rename: "content(rename): {oldPath} -> {newPath}"
```

### Global default with a media override

```yaml
settings:
  commit:
    identity: app

media:
  - name: assets
    input: public/uploads
    output: /uploads
    commit:
      identity: user
      templates:
        update: "media(update): {path} by {userEmail}"
```
