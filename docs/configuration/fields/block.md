---
title: Block field
description: Let editors choose between multiple object shapes.
---

Use `type: block` for page-builder style sections where each item can be a different schema.

Each block item is stored as an object containing the selected block type and that block's fields.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">blocks</code> | List of available block definitions (e.g. `[{ name: "hero", component: "hero" }]`).
<code class="text-[var(--prism-keyword)]">blockKey</code> | Key used to store the selected block type. Defaults to `_block` (e.g. `blockKey: type` saves `type: hero`).

## Simple example

```yaml
- name: sections
  label: Sections
  type: block
  list: true
  blockKey: type
  blocks:
    - name: hero
      component: hero
    - name: text
      fields:
        - name: body
          type: rich-text
```

Saved output:

```yaml
sections:
  - type: hero
    heading: Welcome
    image: /images/hero.jpg
  - type: text
    body: Hello world
```

## Block with a nested object

```yaml
- name: sections
  type: block
  list: true
  blockKey: type
  blocks:
    - name: cta
      fields:
        - name: button
          type: object
          fields:
            - name: label
              type: string
            - name: url
              type: string
```

Saved output:

```yaml
sections:
  - type: cta
    button:
      label: Read more
      url: /about
```

## Block with a nested list

```yaml
- name: sections
  type: block
  list: true
  blockKey: type
  blocks:
    - name: faqs
      fields:
        - name: items
          type: object
          list: true
          fields:
            - name: heading
              type: string
            - name: text
              type: rich-text
```

Saved output:

```yaml
sections:
  - type: faqs
    items:
      - heading: What is Pages CMS?
        text: A Git-backed CMS.
      - heading: Is it open source?
        text: Yes.
```

## Block with a nested list field

```yaml
- name: faqs
  fields:
    - name: items
      type: object
      list: true
      fields:
        - name: heading
          type: string
        - name: text
          type: rich-text
```

Saved output:

```yaml
sections:
  - type: faqs
    items:
      - heading: What is Pages CMS?
        text: A Git-backed CMS.
      - heading: Is it open source?
        text: Yes.
```

This is not supported as a block root shape:

```yaml
- name: faqs
  list: true
  component: faqs
```

If you need repeated structured data inside a block, nest a list field inside the block object.
