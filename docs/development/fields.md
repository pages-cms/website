---
title: Fields
description: How field registration, validation, transforms, and rendering work internally.
---

## Main pieces

The field system is built from:

- field modules under `fields/core` and `fields/custom`,
- the registry in [fields/registry.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/fields/registry.ts),
- schema assembly in [lib/schema.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/lib/schema.ts),
- field rendering in the entry form.

## Field modules

A field module can export:

- `label`
- `schema`
- `defaultValue`
- `read`
- `write`
- `EditComponent`
- `ViewComponent`

The registry collects these exports and exposes them to the rest of the app.

## Registry

[fields/registry.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/fields/registry.ts) registers core fields directly and then registers custom fields from the generated manifest in [custom.generated.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/fields/custom.generated.ts).

That generated file is written by [next.config.mjs](/Users/hunvreus/Workspace/_sandbox/pages-cms/next.config.mjs) by scanning `fields/custom/*/index.ts(x)`.

The custom field folder name becomes the field type. For example:

```text
fields/custom/my-field/index.tsx
```

registers the field as `type: my-field`.

That produces shared maps for:

- labels,
- schemas,
- default values,
- read functions,
- write functions,
- edit components,
- view components.

These maps are then used throughout the app.

## Validation pipeline

Form validation is assembled in [lib/schema.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/lib/schema.ts).

High-level flow:

1. `generateZodSchema(fields)` walks the configured field tree.
2. For each field type, it looks up the registered `schema`.
3. Object and block fields are wrapped recursively.
4. List behavior is applied on top when `field.list` is enabled.
5. Required/optional handling is applied around the result.

This means your field-level `schema` usually only needs to describe the field itself, not the whole surrounding object structure.

## Default values

Initial editor state is built with `initializeState(...)` in [lib/schema.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/lib/schema.ts).

Resolution order is:

1. explicit field `default`,
2. list default if present,
3. registered `defaultValue`,
4. fallback empty value.

## Read and write transforms

`read` and `write` are for storage/UI conversion.

Typical pattern:

- `read` runs when content is loaded into the editor,
- `write` runs when editor values are serialized back to content.

Use them when stored values should not match the editor representation one-to-one.

## Rendering pipeline

The entry form resolves the field type to its registered `EditComponent`.

That component receives props such as:

- `value`
- `onChange`
- `field`

The component is responsible for:

- rendering the editing UI,
- converting browser events into field values,
- calling `onChange` with the value expected by the field schema and write pipeline.

`ViewComponent` is the compact display version used outside the main form editing flow.

## Lists vs field-specific multiple behavior

There are two different concepts:

- `field.list`
  This means the field itself is repeated as a list item by the form system.
- field-specific `options.multiple`
  This means a single field manages multiple selections internally, such as select/reference.

These are separate layers and should not be conflated.

## Good design rules for field authors

- keep `schema` narrow and explicit,
- keep `EditComponent` dumb where possible,
- use `read` / `write` only when representation actually differs,
- avoid leaking transport or API concerns into generic field logic,
- copy a simple field first, then add complexity.

## Related docs

- [Creating a custom field](/docs/guides/creating-custom-field/)
