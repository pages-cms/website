---
title: Select field
description: Choose from a predefined list of local options.
---

Use for tags, categories, statuses, and other fixed option lists.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">values</code> | Required. Static options (e.g. `["Draft", "Review", "Published"]` or `[{ name: draft, label: Draft }]`).
<code class="text-[var(--prism-keyword)]">multiple</code> | If `true`, allows multiple values.
<code class="text-[var(--prism-keyword)]">min</code> | Minimum number of selected values when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">max</code> | Maximum number of selected values when `multiple` is enabled.
<code class="text-[var(--prism-keyword)]">placeholder</code> | Custom placeholder text (e.g. `"Select a status"`).

`select` only supports predefined local options. If you need to load entries dynamically or from another source, use [reference](/docs/configuration/fields/reference/) instead.

## Examples

### Single value

```yaml
- name: status
  type: select
  options:
    values: [Draft, Review, Published]
```

### Multiple + named values

```yaml
- name: categories
  type: select
  options:
    values:
      - name: art
        label: Art
      - name: fashion
        label: Fashion
      - name: movies
        label: Movies
      - name: music
        label: Music
```
