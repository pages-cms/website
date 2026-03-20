---
title: Creating a custom field
description: Build a custom field and let Pages CMS register it automatically.
---

## When to create one

Create a custom field when the built-in fields are not enough.

Typical cases:

- a custom picker UI,
- a custom storage format,
- field-specific validation,
- a reusable editing pattern.

## Fastest path

Start from a simple existing field such as:

- `fields/core/boolean`
- `fields/core/string`
- `fields/core/select`

Avoid starting from a complex field unless you need that behavior.

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

## What a field can export

Your `index.tsx` can export:

- `label`
- `schema`
- `defaultValue`
- `read`
- `write`
- `EditComponent`
- `ViewComponent`

You usually only need some of them.

## What each export does

### `label`

Human-readable field name.

### `schema`

Returns the Zod schema for this field.

### `defaultValue`

Fallback value when there is no stored value and no explicit field default.

### `read`

Transforms stored data into editor data.

### `write`

Transforms editor data back into stored data.

### `EditComponent`

The editing UI. It receives the current value and calls `onChange` with the next value.

### `ViewComponent`

Compact display used in lists or read-only contexts.

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

## How registration works

Pages CMS loads fields through [fields/registry.ts](/Users/hunvreus/Workspace/_sandbox/pages-cms/fields/registry.ts).

Core fields are registered directly.

Custom fields under `fields/custom/<field-type>/index.ts` or `index.tsx` are auto-registered at startup and build time.

The folder name becomes the field `type`.

```text
fields/custom/my-field/index.tsx
```

registers:

```yaml
type: my-field
```

If you add, remove, or rename a custom field while the dev server is running, restart it.

## Test with a minimal config

```yaml
fields:
  - name: promo
    type: my-field
```

Check four things:

1. it renders,
2. it saves,
3. it reloads,
4. validation behaves correctly.

## When to add `read` and `write`

Add them only when the editor value and stored value are different.

Examples:

- editor uses objects but storage uses strings,
- editor uses local dates but storage uses ISO strings,
- editor uses relative media paths but storage wants normalized paths.
