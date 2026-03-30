---
title: List
description: Configure repeated fields and top-level arrays.
---

`list` is used in two places:

- on fields, to repeat a field as an array
- on `type: file` content entries, to store the whole file as a top-level array

## Field lists

Set `list: true` to repeat a field.

```yaml
- name: tags
  type: string
  list: true
```

You can also use the object form:

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">min</code> | Minimum number of items.
<code class="text-[var(--prism-keyword)]">max</code> | Maximum number of items.
<code class="text-[var(--prism-keyword)]">collapsible</code> | Make object or block items collapsible. Values: `true`, `false`, or an object.

### `collapsible`

Use `collapsible` on `object` or `block` lists to collapse each item in the editor.

You can use a boolean:

```yaml
- name: sections
  type: object
  list:
    collapsible: true
  fields:
    - name: title
      type: string
```

Or the object form:

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">collapsed</code> | Values: `true`, `false`. Whether items start collapsed by default.
<code class="text-[var(--prism-keyword)]">summary</code> | Summary text shown for each collapsed item.

`summary` supports:

Token | Description
--- | ---
`{index}` | 1-based list item index.
`{fields.<name>}` | Field value from the current object item (e.g. `{fields.title}`).
`{<name>}` | Shorthand for `{fields.<name>}` (e.g. `{title}`).

## Top-level arrays in files

For `type: file`, set `list: true` when the file content itself is an array.

```yaml
content:
  - name: authors
    label: Authors
    type: file
    path: data/authors.json
    format: json
    list: true
    fields:
      - name: name
        type: string
      - name: email
        type: string
      - name: avatar
        type: image
```

For content entries, the documented form is `list: true`.

## Example

```yaml
- name: sections
  type: object
  list:
    min: 1
    max: 6
    collapsible:
      collapsed: true
      summary: "{title} ({index})"
  fields:
    - name: title
      type: string
    - name: body
      type: rich-text
```
