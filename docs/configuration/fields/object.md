---
title: Object field
description: Group nested fields under one key.
---

Use for structured data like addresses, SEO, or author profiles.

## Options

Key | Description
--- | ---
None | This field has no field-specific options. Define nested `fields` instead.

## `required` behavior

`required` on an object controls whether the object itself must exist.

- `required: true`: object must be present.
- `required: false` (or omitted): object is optional.

For optional objects, child `required` rules are applied only when the object is meaningfully present.

- If all nested values are empty, the object is treated as absent.
- If any nested value is filled, child validations run.

This makes patterns like "optional button, but required fields once used" work naturally.

### Optional object with required children

```yaml
- name: button
  label: Button
  type: object
  required: false
  fields:
    - name: text
      type: string
      required: true
    - name: link
      type: string
      required: true
```

Validation outcome:

- Leave `button` empty: valid.
- Fill `button.text` only: invalid (`button.link` is required).
- Fill `button.text` and `button.link`: valid.

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
