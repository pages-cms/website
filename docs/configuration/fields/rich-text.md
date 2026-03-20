---
title: Rich-text field
description: WYSIWYG editor for formatted content.
---

Use for article bodies, long descriptions, and page content.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">format</code> | Values: `markdown`, `html`.
<code class="text-[var(--prism-keyword)]">switcher</code> | Show or hide the `Editor` / `Source` mode switch. Defaults to `true`.
<code class="text-[var(--prism-keyword)]">media</code> | Media source for inserted images (e.g. `"content_images"`). Set to `false` to disable media.
<code class="text-[var(--prism-keyword)]">path</code> | Default image folder (e.g. `"blog"`).
<code class="text-[var(--prism-keyword)]">extensions</code> | Allowed image extensions (e.g. `["png", "webp"]`).
<code class="text-[var(--prism-keyword)]">categories</code> | Allowed image categories. Values: `image`.
<code class="text-[var(--prism-keyword)]">rename</code> | If `true`, uploaded images get a random filename plus the original extension.

## Example

```yaml
- name: body
  type: rich-text
  options:
    media: content_images
    path: blog
    rename: true
    switcher: true
```
