---
title: Settings
description: Global repository-level behavior for Pages CMS.
---

## What `settings` does

`settings` defines repository-wide behavior for one config file.

Use it for:

- hiding the settings UI,
- changing how content saves behave,
- setting default commit message templates.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">hide</code> | If `true`, hides the Settings page in the UI.
<code class="text-[var(--prism-keyword)]">content.merge</code> | Controls how Pages CMS saves structured content. [See `Content merge`](#content-merge).
<code class="text-[var(--prism-keyword)]">commit.templates</code> | Global commit message templates for create, update, delete, and rename actions. [See `Commit templates`](#commit-templates).

## Content merge

`settings.content.merge` controls how Pages CMS writes structured files when a schema is present.

- `false`: rewrite the file from the submitted schema only. Keys not present in the editor output are removed,
- `true`: merge the submitted fields into the existing file before saving. Keys outside the schema are preserved unless overwritten.

This is helpful when you want to only manage part of a file in Pages CMS, but still want the ability to edit other parts directly in Git, allowing you to restrict access to sensitive content/settings to developers.

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

These settings can be overriden in each `media` or `content` entry.

### Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">create</code> | Commit message for new files. Defaults to `Create {path} (via Pages CMS)`.
<code class="text-[var(--prism-keyword)]">update</code> | Commit message for edited files. Defaults to `Update {path} (via Pages CMS)`.
<code class="text-[var(--prism-keyword)]">delete</code> | Commit message for deleted files. Defaults to `Delete {path} (via Pages CMS)`.
<code class="text-[var(--prism-keyword)]">rename</code> | Commit message for renamed files. Defaults to `Rename {oldPath} to {newPath} (via Pages CMS)`.

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
<code class="text-[var(--prism-keyword)]">{oldPath}</code> | Previous file path. Rename only.
<code class="text-[var(--prism-keyword)]">{newPath}</code> | New file path. Rename only.
<code class="text-[var(--prism-keyword)]">{oldFilename}</code> | Previous file name. Rename only.
<code class="text-[var(--prism-keyword)]">{newFilename}</code> | New file name. Rename only.

Per-entry templates in `content[].commit.templates` and `media[].commit.templates` override these global templates.


## Example

```yaml
settings:
  cache: true # Exposes cache controls for GitHub users
  hide: true # Hide settings in the UI
  content:
    merge: true
```
