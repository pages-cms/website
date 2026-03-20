---
title: Settings
description: Configure repository-wide behavior in Pages CMS.
---

## What `settings` does

Use `settings` for behavior that applies across the whole repository.

Typical uses:

- hide admin pages,
- preserve unmanaged keys when saving structured content,
- define default commit messages.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">hide</code> | If `true`, hides the Settings page in the UI.
<code class="text-[var(--prism-keyword)]">content.merge</code> | Controls how structured content is written back to disk. [See `Content merge`](#content-merge).
<code class="text-[var(--prism-keyword)]">commit.templates</code> | Global commit message templates. [See `Commit templates`](#commit-templates).

## Content merge

`settings.content.merge` controls what happens when Pages CMS saves a structured file.

### `false` (default)

Rewrite the file from the configured schema only.

Anything outside the submitted editor output is removed.

Use this when Pages CMS fully owns the file.

### `true`

Merge the submitted fields into the existing file before saving.

Keys outside the schema are preserved unless the editor overwrites them.

Use this when developers still manage part of the file directly in Git.

## Commit templates

Use `settings.commit.templates` to define the default commit message format for content and media changes.

```yaml
settings:
  commit:
    templates:
      create: "content(create): {path}"
      update: "content(update): {path}"
      delete: "content(delete): {path}"
      rename: "content(rename): {oldPath} -> {newPath}"
```

Per-entry templates in `content[].commit.templates` and `media[].commit.templates` override these global templates.

### Keys

Key | Description | Default value
--- | --- | ---
<code class="text-[var(--prism-keyword)]">create</code> | Commit message for new files. | `Create {path} (via Pages CMS)`
<code class="text-[var(--prism-keyword)]">update</code> | Commit message for edited files. | `Update {path} (via Pages CMS)`
<code class="text-[var(--prism-keyword)]">delete</code> | Commit message for deleted files. | `Delete {path} (via Pages CMS)`
<code class="text-[var(--prism-keyword)]">rename</code> | Commit message for renamed files. | `Rename {oldPath} to {newPath} (via Pages CMS)`

### Tokens

Token | Description
--- | ---
<code class="text-[var(--prism-keyword)]">{action}</code> | Current action: `create`, `update`, `delete`, or `rename`.
<code class="text-[var(--prism-keyword)]">{path}</code> | File path.
<code class="text-[var(--prism-keyword)]">{filename}</code> | File name only.
<code class="text-[var(--prism-keyword)]">{name}</code> | Content or media entry name.
<code class="text-[var(--prism-keyword)]">{owner}</code> | Repository owner.
<code class="text-[var(--prism-keyword)]">{repo}</code> | Repository name.
<code class="text-[var(--prism-keyword)]">{branch}</code> | Current branch.
<code class="text-[var(--prism-keyword)]">{user}</code> | Current user.
<code class="text-[var(--prism-keyword)]">{oldPath}</code> | Previous path. Rename only.
<code class="text-[var(--prism-keyword)]">{newPath}</code> | New path. Rename only.
<code class="text-[var(--prism-keyword)]">{oldFilename}</code> | Previous file name. Rename only.
<code class="text-[var(--prism-keyword)]">{newFilename}</code> | New file name. Rename only.

## Simple example

```yaml
settings:
  hide: true
  content:
    merge: true
```
