---
title: View
description: Control how collections are listed in the editor.
---

`view` only applies to collections.

It controls how the collection list is displayed.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">fields</code> | Fields shown in the list, in order (e.g. `["title", "published", "author.name"]`).
<code class="text-[var(--prism-keyword)]">primary</code> | Field used as the main label. Defaults to `title` if present.
<code class="text-[var(--prism-keyword)]">sort</code> | Fields available for sorting.
<code class="text-[var(--prism-keyword)]">search</code> | Fields indexed for search.
<code class="text-[var(--prism-keyword)]">default.search</code> | Default search query.
<code class="text-[var(--prism-keyword)]">default.sort</code> | Default sort field.
<code class="text-[var(--prism-keyword)]">default.order</code> | Values: `asc`, `desc`.
<code class="text-[var(--prism-keyword)]">layout</code> | Values: `list`, `tree`.
<code class="text-[var(--prism-keyword)]">node</code> | Tree node config, as a string or object.
<code class="text-[var(--prism-keyword)]">node.filename</code> | Node filename in tree mode.
<code class="text-[var(--prism-keyword)]">node.hideDirs</code> | Values: `all`, `nodes`, `others`.

## Examples

### Basic list view

```yaml
view:
  fields: [title, published, date]
  primary: title
  sort: [date, title]
  default:
    sort: date
    order: desc
```

### Tree view

```yaml
view:
  layout: tree
  node:
    filename: index.md
    hideDirs: others
  fields: [title]
  primary: title
```
