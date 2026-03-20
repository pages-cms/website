---
title: Block field
description: Let editors choose between multiple object shapes.
---

Use `type: block` for page-builder style sections where each item can be a different schema.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">blocks</code> | List of available block definitions (e.g. `[{ name: "hero", component: "hero" }]`).
<code class="text-[var(--prism-keyword)]">blockKey</code> | Key used to store the selected block type (e.g. `"type"`).

## Example

```yaml
- name: sections
  label: Sections
  type: block
  list: true
  blockKey: type
  blocks:
    - name: hero
      component: hero
    - name: text
      fields:
        - name: body
          type: rich-text
```
