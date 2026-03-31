---
title: Code field
description: Code editor with syntax highlighting.
---

Use for snippets, templates, or small config blocks.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">format</code> | Values: `yaml`, `yml`, `javascript`, `js`, `jsx`, `typescript`, `ts`, `tsx`, `json`, `html`, `htm`, `markdown`, `mdx`.

## Examples

### JavaScript snippet

```yaml
- name: snippet
  type: code
  options:
    format: javascript
```

### MDX snippet

```yaml
- name: article
  type: code
  options:
    format: mdx
```
