---
title: Reference field
description: Search and link entries from another collection.
---

Use when one content type needs to point to another collection (posts -> authors, products -> categories).

`reference` is collection-backed. It searches another configured collection and saves the selected entry value.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">collection</code> | Target collection name (e.g. `"authors"`).
<code class="text-[var(--prism-keyword)]">multiple</code> | If `true`, allows many references.
<code class="text-[var(--prism-keyword)]">min</code> | Minimum number of selected references when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">max</code> | Maximum number of selected references when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">search</code> | Comma-separated fields used for lookup (e.g. `"name,email"`).
<code class="text-[var(--prism-keyword)]">value</code> | Template for the stored value (e.g. `"{path}"`).
<code class="text-[var(--prism-keyword)]">label</code> | Template for the displayed label (e.g. `"{name}"`).

## Template tokens

`value` and `label` support template strings.

Token | Description
--- | ---
`{path}` | Entry path.
`{name}` | Entry name.
`{primary}` | Primary field value from the referenced collection. Uses `view.primary`, otherwise `title`, otherwise the first field.
`{fields.<path>}` | Field value from the referenced entry. Nested paths are supported, for example `{fields.author.name}`.
`{<path>}` | Shorthand alias for `{fields.<path>}` when no direct token resolves, for example `{author.name}`.

Pages CMS resolves reference templates in this order:

1. Try the token as written.
2. If nothing resolves, try the same token under `fields.*`.

## Examples

```yaml
- name: author
  type: reference
  options:
    collection: authors
```

### Multiple references

```yaml
- name: categories
  type: reference
  options:
    collection: categories
    multiple: true
    min: 1
    max: 5
```

### Search across multiple fields

```yaml
- name: author
  type: reference
  options:
    collection: authors
    search: "name,email,fields.role"
```

### Custom stored value and label

```yaml
- name: author
  type: reference
  options:
    collection: authors
    value: "{primary}"
    label: "{primary}"
```

This stores and displays the referenced entry's primary field value.

### Multiple references with nested labels

```yaml
- name: speakers
  type: reference
  options:
    collection: people
    multiple: true
    search: "name,fields.profile.title,fields.company.name"
    value: "{path}"
    label: "{profile.name} ({company.name})"
```
