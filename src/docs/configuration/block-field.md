---
title: Block field
---

The `block` field type allows a single field to contain one of several different possible structures or schemas, chosen by the user. This is useful for flexible content layouts like page builders.

<!-- ## Options

| Option | Type | Description |
| - | - | - |
| **`blockKey`** | `string` | Specifies the key used within the stored data object to identify which block type was chosen. Defaults to `_block`. | -->

## Example

Define a list field named `sections` that allows users to choose between adding a `hero` block or a `text` block.

```yaml
- name: sections
  label: Page Sections
  type: block
  list: true # Often used with type: block to allow multiple sections
  blockKey: type # Optional: customize the key used to store the block name, defaults to `_block`
  blocks:
    # Each item defines a possible block structure the user can select.
    # These typically use 'component' or define 'fields' directly.
    - name: hero
      label: Add Hero Section
      component: hero # Assumes a 'hero' component is defined and that its type is `object`
    - name: text
      label: Add Text Block
      fields:
        - name: content
          label: Text Content
          type: rich-text
```

When a user adds a `hero` block, the saved data might look like: `{ section_type: 'hero', ...otherHeroData }`.