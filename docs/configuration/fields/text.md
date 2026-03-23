---
title: Text field
description: Multi-line plain text.
---

Use for summaries, excerpts, and notes.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">minlength</code> | Minimum allowed length (e.g. `20`).
<code class="text-[var(--prism-keyword)]">maxlength</code> | Maximum allowed length (e.g. `280`).

## Examples

### Basic text

```yaml
- name: excerpt
  type: text
  options:
    maxlength: 280
```
