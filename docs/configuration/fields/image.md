---
title: Image field
description: Select or upload images from media.
---

Use for cover images, thumbnails, galleries, logos.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">media</code> | Named media config to use (e.g. `"images"`).
<code class="text-[var(--prism-keyword)]">path</code> | Default browsing folder (e.g. `"blog"`).
<code class="text-[var(--prism-keyword)]">multiple</code> | Allow multiple images (e.g. `{ max: 6 }`).
<code class="text-[var(--prism-keyword)]">extensions</code> | Allowed image extensions (e.g. `["jpg", "png", "webp"]`).
<code class="text-[var(--prism-keyword)]">categories</code> | Allowed image categories. Values: `image`.
<code class="text-[var(--prism-keyword)]">unique</code> | If `true`, disallows duplicate image paths when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">rename</code> | If `true`, uploaded files get a random filename plus the original extension.

## Example

```yaml
- name: gallery
  type: image
  options:
    rename: true
    multiple:
      max: 6
    extensions: [jpg, png, webp]
```
