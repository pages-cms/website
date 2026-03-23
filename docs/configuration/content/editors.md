---
title: Editors
description: Choose between structured fields, raw files, code, and datagrid editors.
---

Pages CMS can edit files in a few different ways depending on the content shape.

## Structured fields

Use `fields` when the file or collection should be modeled as structured content.

```yaml
content:
  - name: posts
    type: collection
    path: content/posts
    fields:
      - name: title
        type: string
      - name: body
        type: rich-text
```

## Raw file editor

If `fields` is omitted or empty, Pages CMS falls back to a raw file editor.

Use this for files that should not be modeled as structured fields, for example:

- `robots.txt`
- redirect files
- small JSON or YAML config files
- snippets or templates

```yaml
content:
  - name: robots
    label: robots.txt
    type: file
    path: public/robots.txt
```

## Code editor

Use `format: code` when you want a code-oriented editor for a single file.

```yaml
content:
  - name: redirects
    type: file
    path: public/_redirects
    format: code
```

## Datagrid editor

Use `format: datagrid` for CSV-style tables.

For `.csv` files, Pages CMS can infer this automatically.

```yaml
content:
  - name: pricing
    type: file
    path: data/pricing.csv
```

Or set it explicitly:

```yaml
content:
  - name: pricing
    type: file
    path: data/pricing
    format: datagrid
```
