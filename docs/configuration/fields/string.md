---
title: String field
description: Single-line text input.
---

Use for short values like titles, slugs, and names.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">minlength</code> | Minimum allowed length (e.g. `3`).
<code class="text-[var(--prism-keyword)]">maxlength</code> | Maximum allowed length (e.g. `120`).

## Examples

### Basic string

```yaml
- name: title
  type: string
  options:
    maxlength: 120
```
