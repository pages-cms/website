---
title: Fields
description: Define the editor schema for collections and files.
---

`fields` defines the editor schema.

## Keys

These keys apply to all field types unless noted otherwise.

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Field key used in stored data.
<code class="text-[var(--prism-keyword)]">label</code> | UI label for the field.
<code class="text-[var(--prism-keyword)]">type</code> <span class="text-muted-foreground">*</span> | Field type.
<code class="text-[var(--prism-keyword)]">required</code> | Marks the field as required.
<code class="text-[var(--prism-keyword)]">pattern</code> | Regex validation for supported field types.
<code class="text-[var(--prism-keyword)]">hidden</code> | Hides the field from the editor.
<code class="text-[var(--prism-keyword)]">readonly</code> | Shows the field value but prevents editing it. Inherited by nested object, block, and list fields.
<code class="text-[var(--prism-keyword)]">description</code> | Helper text shown below the field.
<code class="text-[var(--prism-keyword)]">options</code> | Field-specific options. See each field page for details.

<span class="text-sm text-muted-foreground">*: Required</span>

## `pattern`

`pattern` validates a field value against a regex.

Currently, it is supported by:

- `string`
- `text`

You can use either a string:

```yaml
pattern: "^[a-z0-9-]+$"
```

Or an object with a custom message:

```yaml
pattern:
  regex: "^[A-Z]{3}-\\d{4}$"
  message: "Use format ABC-1234"
```

## `body` is a special key

For frontmatter formats, `body` maps to the file content below the frontmatter.

All other fields stay in frontmatter.

```yaml
fields:
  - name: title
    type: string
  - name: body
    type: rich-text
```

## Field types

Type | Description
--- | ---
[`block`](/docs/configuration/fields/block/) | Multiple object shapes in one list.
[`boolean`](/docs/configuration/fields/boolean/) | True/false toggle.
[`code`](/docs/configuration/fields/code/) | Code editor with syntax highlighting.
[`date`](/docs/configuration/fields/date/) | Date or date-time input.
[`file`](/docs/configuration/fields/file/) | File picker or uploader.
[`image`](/docs/configuration/fields/image/) | Image picker or uploader.
[`number`](/docs/configuration/fields/number/) | Numeric input.
[`object`](/docs/configuration/fields/object/) | Nested group of fields.
[`reference`](/docs/configuration/fields/reference/) | Link to another collection.
[`rich-text`](/docs/configuration/fields/rich-text/) | Rich text editor.
[`select`](/docs/configuration/fields/select/) | Fixed local options.
[`string`](/docs/configuration/fields/string/) | Single-line text input.
[`text`](/docs/configuration/fields/text/) | Multi-line plain text input.
[`uuid`](/docs/configuration/fields/uuid/) | UUID v4 field.

## Examples

### Frontmatter with body content

```yaml
fields:
  - name: title
    type: string
  - name: published
    type: boolean
  - name: body
    type: rich-text
```

### Nested object field

```yaml
fields:
  - name: author
    type: object
    fields:
      - name: name
        type: string
      - name: email
        type: string
```

### String field with pattern

```yaml
fields:
  - name: slug
    type: string
    required: true
    pattern: "^[a-z0-9-]+$"
    options:
      minlength: 3
      maxlength: 80
```

### Text field with custom pattern message

```yaml
fields:
  - name: summary
    type: text
    required: true
    pattern:
      regex: "^(?s).{20,500}$"
      message: "Summary must be between 20 and 500 characters"
    options:
      minlength: 20
      maxlength: 500
```
