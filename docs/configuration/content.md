---
title: Content
description: Define editable collections and files in your repository.
---

## What `content` does

`content` defines what editors can edit.

Each entry is either:

- a `collection` for many files with the same schema,
- a `file` for one file with its own schema.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Unique internal name (e.g. `"posts"`).
<code class="text-[var(--prism-keyword)]">label</code> | UI label (e.g. `"Blog posts"`).
<code class="text-[var(--prism-keyword)]">type</code> <span class="text-muted-foreground">*</span> | Values: `collection`, `file`.
<code class="text-[var(--prism-keyword)]">path</code> <span class="text-muted-foreground">*</span> | Folder for collections or file path for single files (e.g. `"content/posts"`, `"data/site.yml"`).
<code class="text-[var(--prism-keyword)]">fields</code> | Field definitions shown in the editor. [See `Fields`](#fields).
<code class="text-[var(--prism-keyword)]">filename</code> | Collection filename template or object config. [See `Filename`](#filename).
<code class="text-[var(--prism-keyword)]">exclude</code> | Files to ignore in a collection (e.g. `["README.md"]`).
<code class="text-[var(--prism-keyword)]">format</code> | File format. Values include `yaml-frontmatter`, `json-frontmatter`, `toml-frontmatter`, `yaml`, `json`, `toml`, `datagrid`, `code`, `raw`.
<code class="text-[var(--prism-keyword)]">delimiters</code> | Custom frontmatter delimiters (e.g. `"+++"`, `["<!--", "-->"]`).
<code class="text-[var(--prism-keyword)]">subfolders</code> | Enables or disables nested folders in collections.
<code class="text-[var(--prism-keyword)]">list</code> | For `type: file`, store the whole file as a top-level array.
<code class="text-[var(--prism-keyword)]">view</code> | Collection list settings for fields, sorting, search, and tree mode. [See `View`](#view).
<code class="text-[var(--prism-keyword)]">commit</code> | Per-entry commit settings. [See `settings`]( /docs/configuration/settings/).

<span class="text-sm text-muted-foreground">*: Required</span>

## Start with a collection

```yaml
content:
  - name: posts
    label: Posts
    type: collection
    path: content/posts
    fields:
      - name: title
        type: string
      - name: body
        type: rich-text
```

## Start with a single file

```yaml
content:
  - name: site
    label: Site settings
    type: file
    path: data/site.yml
    fields:
      - name: title
        type: string
      - name: description
        type: text
```

## Fields

`fields` defines the editor schema.

### Field types

Type | Description
--- | ---
`block` | Multiple object shapes in one list.
`boolean` | True/false toggle.
`code` | Code editor with syntax highlighting.
`date` | Date or date-time input.
`file` | File picker or uploader.
`image` | Image picker or uploader.
`number` | Numeric input.
`object` | Nested group of fields.
`reference` | Link to another collection.
`rich-text` | Rich text editor.
`select` | Fixed local options.
`string` | Single-line text input.
`text` | Multi-line plain text input.
`uuid` | UUID v4 field.

### `body` is a special key

For frontmatter formats, `body` maps to the file content below the frontmatter.

All other fields stay in frontmatter.

```yaml
fields:
  - name: title
    type: string
  - name: body
    type: rich-text
```

## File editor

If `fields` is omitted or empty, Pages CMS falls back to a raw file editor.

Use this for files that should not be modeled as structured fields, for example:

- `robots.txt`,
- redirect files,
- small JSON or YAML config files,
- snippets or templates.

Example:

```yaml
content:
  - name: robots
    label: robots.txt
    type: file
    path: public/robots.txt
```

If you want code editing behavior, set a code-oriented format:

```yaml
content:
  - name: redirects
    type: file
    path: public/_redirects
    format: code
```

## Datagrid editor

Use `format: datagrid` for CSV-style tables.

For `.csv` files, Pages CMS can infer this automatically.

```yaml
content:
  - name: pricing
    type: file
    path: data/pricing.csv
```

Or set it explicitly:

```yaml
content:
  - name: pricing
    type: file
    path: data/pricing
    format: datagrid
```

## Filename

`filename` only applies to collections.

Use it to control how new files are named.

### String form

```yaml
filename: "{primary}.md"
```

### Object form

Use the object form when you also want a filename field in the editor.

```yaml
filename:
  template: "{year}-{month}-{day}-{primary}.md"
  field: create
```

### `filename.field`

Value | Behavior
--- | ---
`false` | Hide the filename input.
`create` | Show it only when creating a new entry.
`true` | Show it when creating and editing.

### Filename tokens

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

Example:

```yaml
filename: "{year}-{month}-{day}-{title}.md"
```

## View

`view` only applies to collections.

It controls how the collection list is displayed.

### Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">fields</code> | Fields shown in the list, in order (e.g. `["title", "published", "author.name"]`).
<code class="text-[var(--prism-keyword)]">primary</code> | Field used as the main label. Defaults to `title` if present.
<code class="text-[var(--prism-keyword)]">sort</code> | Fields available for sorting.
<code class="text-[var(--prism-keyword)]">search</code> | Fields indexed for search.
<code class="text-[var(--prism-keyword)]">default.search</code> | Default search query.
<code class="text-[var(--prism-keyword)]">default.sort</code> | Default sort field.
<code class="text-[var(--prism-keyword)]">default.order</code> | Values: `asc`, `desc`.
<code class="text-[var(--prism-keyword)]">layout</code> | Values: `list`, `tree`.
<code class="text-[var(--prism-keyword)]">node</code> | Tree node config, as a string or object.
<code class="text-[var(--prism-keyword)]">node.filename</code> | Node filename in tree mode.
<code class="text-[var(--prism-keyword)]">node.hideDirs</code> | Values: `all`, `nodes`, `others`.

Example:

```yaml
view:
  fields: [title, published, date]
  primary: title
  sort: [date, title]
  default:
    sort: date
    order: desc
```

## Root arrays in single files

If a file stores a top-level array, set `list: true`.

```yaml
content:
  - name: authors
    label: Authors
    type: file
    path: data/authors.json
    format: json
    list: true
    fields:
      - name: name
        type: string
      - name: email
        type: string
      - name: avatar
        type: image
```
