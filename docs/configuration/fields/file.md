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
<code class="text-[var(--prism-keyword)]">rename</code> | If `true`, uploaded files get a random filename plus the original extension.

## Example

```yaml
- name: resources
  type: file
  options:
    rename: true
    categories: [document]
    multiple:
      max: 5
```
