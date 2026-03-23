---
title: UUID field
description: Generate and store a UUID v4.
---

Use for stable IDs independent from filenames or titles.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">editable</code> | If `true`, users can type a custom UUID value.
<code class="text-[var(--prism-keyword)]">generate</code> | If `false`, hides the "generate new UUID" button.

## Notes

- A UUID is auto-generated when the field has no explicit `default`.
- To force an empty initial value, set `default: ""`.

## Examples

### Generated UUID

```yaml
- name: id
  type: uuid
  options:
    editable: false
```
