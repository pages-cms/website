---
title: Creating a custom field
description: Build and register a custom field step by step.
---

## When to create one

Create a custom field when the built-in fields cannot represent your data shape or editing workflow.

Good examples:

- special formatting rules,
- custom picker UIs,
- data that needs `read` / `write` transforms,
- a field you want to reuse across many projects.

## Start from a simple field

The fastest path is to copy a small existing field such as:

- `fields/core/boolean`
- `fields/core/string`
- `fields/core/select`

Avoid starting from a complex field like rich text unless you really need that level of behavior.

## Folder structure

Create a folder under `fields/custom`:

```text
fields/
├─ core/
├─ custom/
│  └─ my-field/
│     ├─ edit-component.tsx
│     ├─ view-component.tsx
│     └─ index.tsx
└─ registry.ts
```

## What the field module exports

Your `index.tsx` can export:

- `label`
- `schema`
- `defaultValue`
- `read`
- `write`
- `EditComponent`
- `ViewComponent`

You usually do not need all of them.

## What each export does

### `label`

Human-readable name for the field type.

### `schema`

Returns a Zod schema for the field.

Use it to:

- validate field values,
- coerce types,
- enforce field-specific rules.

This schema is used inside the larger form schema built by Pages CMS.

### `defaultValue`

Default value used when the field has no stored value and no explicit field default.

### `read`

Transforms the raw stored value into the editor value.

Use this when the saved data and UI data are not the same shape.

### `write`

Transforms the editor value back into the saved value.

Use this together with `read` when the field needs a different storage format.

### `EditComponent`

The form UI shown while editing an entry.

It receives the current value and should call `onChange` with the next value.

### `ViewComponent`

Compact display used in read-only contexts such as lists or previews.

## Minimal example

```tsx
import { z } from "zod";
import { Input } from "@/components/ui/input";

const schema = () => z.string().min(1, "Required");

const EditComponent = ({ value, onChange }: any) => (
  <Input value={value || ""} onChange={(event) => onChange(event.target.value)} />
);

const ViewComponent = ({ value }: { value: unknown }) => {
  if (!value) return null;
  return <span>{String(value)}</span>;
};

const label = "My field";

export { label, schema, EditComponent, ViewComponent };
```

## Register the field

Pages CMS loads fields through [fields/registry.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/fields/registry.ts).

To register a custom field, import it and call `registerField(...)`.

Typical flow:

1. import your field module,
2. call `registerField("my-field", myFieldModule)`,
3. use `type: my-field` in `.pages.yml`.

## Test with a minimal config

```yaml
fields:
  - name: promo
    type: my-field
```

Keep the first test small. Confirm:

- it renders,
- it saves,
- it reloads correctly,
- validation behaves as expected.

## When to add `read` and `write`

Add them when the UI value and stored value differ.

Examples:

- editor uses objects but file stores strings,
- editor uses local dates but file stores ISO strings,
- editor uses relative media paths but storage wants normalized paths.

## Related docs

- [Fields internals](/docs/development/fields/)
- [Configuration overview](/docs/configuration/overview/)
