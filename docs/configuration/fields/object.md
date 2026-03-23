---
title: Object field
description: Group nested fields under one key.
---

Use for structured data like addresses, SEO, or author profiles.

## Options

Key | Description
--- | ---
None | This field has no field-specific options. Define nested `fields` instead.

## Behavior

- `required` applies to the object itself, not automatically to every child.
- For optional objects, child `required` rules apply only once the object has meaningful content.
- `readonly` is inherited by the whole nested subtree.

```yaml
- name: authors
  type: object
  readonly: true
  list: true
  fields:
    - name: name
      type: string
    - name: email
      type: string
```

In this example, `name` and `email` behave as readonly without needing their own `readonly: true`.

## List summary tokens

If the object field is also a list and uses `list.collapsible.summary`, the summary string supports tokens.

Without a custom summary, Pages CMS falls back to `Item #n`.

Token | Description
--- | ---
`{index}` | 1-based list item index.
`{fields.<name>}` | Field value from the current object item (e.g. `{fields.title}`).
`{<name>}` | Shorthand alias for `{fields.<name>}` when no direct token resolves (e.g. `{title}`).

Notes:

- `{index}` is always available.
- `{fields.<name>}` reads from the current object item, so nested paths like `{fields.seo.title}` also work.
- `{<name>}` first tries the token as written, then falls back to `fields.*`.
- Missing values resolve to an empty string.

Example:

```yaml
- name: sections
  type: object
  list:
    collapsible:
      collapsed: true
      summary: "{title} ({index})"
  fields:
    - name: title
      type: string
```

## Example

```yaml
- name: contact
  type: object
  fields:
    - name: name
      type: string
    - name: email
      type: string
```
