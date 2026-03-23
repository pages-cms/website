---
title: Filename
description: Control how new collection entries are named.
---

`filename` only applies to collections.

Use it to control how new files are named.

## Value

You can either use a string:

```yaml
filename: "{primary}.md"
```

Or use the object form when you also want a filename field in the editor:

```yaml
filename:
  template: "{year}-{month}-{day}-{primary}.md"
  field: create
```

`filename.field` can be:

- `false`: Hide the filename input.
- `create`: Show it only when creating a new entry.
- `true`: Show it when creating and editing.

## Tokens

Token | Description
--- | ---
`{primary}` | Primary field from `view.primary`, or `title`, or the first field.
`{slug}` | Alias for `{primary}`.
`{year}` | Current year.
`{month}` | Current month, zero-padded.
`{day}` | Current day, zero-padded.
`{hour}` | Current hour, zero-padded.
`{minute}` | Current minute, zero-padded.
`{second}` | Current second, zero-padded.
`{fields.<name>}` | Field value from the current entry, slugified.
`{<name>}` | Shorthand for `{fields.<name>}`.

## Examples

### Date-based post filenames

```yaml
filename: "{year}-{month}-{day}-{title}.md"
```

### Editable filename on create

```yaml
filename:
  template: "{primary}.md"
  field: create
```
