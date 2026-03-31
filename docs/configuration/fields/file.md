---
title: File field
description: Select or upload non-image files from media.
---

Use for PDFs, ZIPs, docs, audio, and similar files.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">media</code> | Named media config to use (e.g. `"docs"`).
<code class="text-[var(--prism-keyword)]">path</code> | Default browsing folder (e.g. `"contracts"`).
<code class="text-[var(--prism-keyword)]">multiple</code> | Allow multiple files (e.g. `{ max: 5 }`).
<code class="text-[var(--prism-keyword)]">extensions</code> | Allowed file extensions (e.g. `["pdf", "zip"]`).
<code class="text-[var(--prism-keyword)]">categories</code> | Allowed file categories. Values: `image`, `document`, `video`, `audio`, `compressed`.
<code class="text-[var(--prism-keyword)]">unique</code> | If `true`, disallows duplicate file paths when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">rename</code> | Controls upload renaming. Use `false` to keep the original filename, `true` or `safe` to slugify it, or `random` for a generated name.

## Examples

### Named media config and default folder

```yaml
- name: brochure
  label: Brochure
  type: file
  options:
    media: docs
    path: public/files/brochures
```

### Multiple downloadable resources

```yaml
- name: resources
  label: Resources
  type: file
  options:
    categories: [document]
    multiple:
      max: 5
    unique: true
    rename: true
```

### Specific file extensions

```yaml
- name: archive
  label: Archive
  type: file
  options:
    extensions: [zip, tar, gz]
```
