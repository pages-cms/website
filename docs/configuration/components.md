---
title: Components
description: Reuse field definitions across multiple content models.
---

## What `components` does

Components help avoid repeating the same field groups across multiple content types. For example shared SEO fields or a shared author block (name, email, avatar).

They are defined once under `components` and referenced with the `component:` key from within field definition. Any value defined in the component can be overriden when referenced (see example below).

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

This configuratio will effectively result in the following content configuration:

```yaml
content:
  - name: pages
    type: collection
    path: content/pages
    fields:
      - name: heading
        type: string
      - name: seo
        type: object
        label: Meta
        fields:
          - name: title
            type: string
          - name: description
            type: text
```

Notice how the label defined in the field (`Meta`) overrides the value defined in the `seo` component.
