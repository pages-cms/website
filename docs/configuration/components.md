---
title: Components
description: Reuse field definitions across multiple content models.
---

## What `components` does

Use `components` when the same field group appears in multiple places.

Typical examples:

- SEO fields,
- author objects,
- call-to-action blocks,
- repeated metadata groups.

Define the field once, then reference it from `content`.

## Example

```yaml
components:
  seo:
    type: object
    label: SEO
    fields:
      - name: title
        type: string
      - name: description
        type: text

content:
  - name: pages
    type: collection
    path: content/pages
    fields:
      - name: heading
        type: string
      - name: seo
        component: seo
        label: Meta
```

## Override behavior

When you reference a component, field-level values can override component values.

In the example above:

- the component label is `SEO`,
- the field label overrides it to `Meta`.

The resolved field behaves like this:

```yaml
- name: seo
  type: object
  label: Meta
  fields:
    - name: title
      type: string
    - name: description
      type: text
```
