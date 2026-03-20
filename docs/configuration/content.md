---
title: Content
description: Define editable collections and files in your repository.
---

## What `content` does

`content` is the "meat" of the configuration. It defines an array of content types users can edit:

- Collections (`type: collection`) are used for groups of files with the same schema (e.g. blog posts),
- Files (`type: file`) are used for single files with their own individual schema (e.g. site settings, home page, etc).

## Keys

Each entry in the `content` array can use the following keys:

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Internal name for the content entry. Required and must be unique (e.g. `"posts"`).
<code class="text-[var(--prism-keyword)]">label</code> | Label shown in the UI (e.g. `"Blog posts"`).
<code class="text-[var(--prism-keyword)]">type</code> <span class="text-muted-foreground">*</span> | Values: `collection`, `file`.
<code class="text-[var(--prism-keyword)]">path</code> <span class="text-muted-foreground">*</span> | Repository path. For a collection, this is a folder. For a file, this is the file path (e.g. `"content/posts"`, `"data/site.yml"`).
<code class="text-[var(--prism-keyword)]">fields</code> | An array of fields that will be displayed to the user when editing content (e.g. `[{ name: "title", type: "string" }]`). See the [field references](#fields).
<code class="text-[var(--prism-keyword)]">filename</code> | Collection filename template, as a string or object (e.g. `"{primary}.md"`).
<code class="text-[var(--prism-keyword)]">exclude</code> | Files to ignore in a collection (e.g. `["README.md"]`).
<code class="text-[var(--prism-keyword)]">format</code> | Values include `yaml-frontmatter`, `json-frontmatter`, `toml-frontmatter`, `yaml`, `json`, `toml`, `datagrid`, `code`, `raw` (e.g. `"json"`).
<code class="text-[var(--prism-keyword)]">delimiters</code> | Custom frontmatter delimiters, as a string or two-item array (e.g. `"+++"`, `["<!--", "-->"]`).
<code class="text-[var(--prism-keyword)]">subfolders</code> | Enables or disables nested folders in collections.
<code class="text-[var(--prism-keyword)]">list</code> | For `type: file`, store the file as a top-level array.
<code class="text-[var(--prism-keyword)]">view</code> | Collection view configuration for visible fields, sorting, search, and tree layout (e.g. `fields: ["title", "date"]`).
<code class="text-[var(--prism-keyword)]">commit</code> | Per-entry commit settings, overriding `settings.commit` (e.g. `"feat(posts): update {filename}"`). [Read more in `settings`](/docs/configuration/settings).

<span class="text-sm text-muted-foreground">*: Required</span>

## Fields

### Types of fields

Type | Description
--- | ---
`block` | Let editors choose between multiple object shapes. [Read more](/docs/configuration/fields/block/).
`boolean` | True/false toggle for flags and state. [Read more](/docs/configuration/fields/boolean/).
`code` | Code editor with syntax highlighting. [Read more](/docs/configuration/fields/code/).
`date` | Date or date-time input with formatting and bounds. [Read more](/docs/configuration/fields/date/).
`file` | Select or upload non-image files from media. [Read more](/docs/configuration/fields/file/).
`image` | Select or upload images from media. [Read more](/docs/configuration/fields/image/).
`number` | Numeric input for integers and decimals. [Read more](/docs/configuration/fields/number/).
`object` | Group nested fields under one key. [Read more](/docs/configuration/fields/object/).
`reference` | Search and link entries from another collection. [Read more](/docs/configuration/fields/reference/).
`rich-text` | WYSIWYG editor for formatted content. [Read more](/docs/configuration/fields/rich-text/).
`select` | Choose from a predefined list of local options. [Read more](/docs/configuration/fields/select/).
`string` | Single-line text input. [Read more](/docs/configuration/fields/string/).
`text` | Multi-line plain text. [Read more](/docs/configuration/fields/text/).
`uuid` | Generate and store a UUID v4. [Read more](/docs/configuration/fields/uuid/).

### Body field

For frontmatter formats (`yaml-frontmatter`, `json-frontmatter`, and `toml-frontmatter`), `body` is a special key that refers to the content of file without the frontmatter. All other fields are saved in the frontmatter.

You can define what type of field this should be. In most cases you will use rich-text:

```yaml
fields:
  - name: title
    type: string
  - name: body
    type: rich-text
```

### Filename field

For collections, you can also display a field for the filename at the top of the editor using the `filename.field` key. [See the "Filename" section](#filename).

## File editor

If `fields` is omitted or empty, Pages CMS falls back to a regular file editor, allowing you to edit the whole 

You can use this for files that should be edited as raw source instead of a structured form (e.g. `robots.txt`).

## Datagrid editor

For `.csv` files you can use the datagrid editor. Either define a file with a `.csv` extension (e.g. `path: data/pricing.csv`), or set it explicitely:

```yaml
content:
  - name: pricing
    type: file
    path: data/pricing
    format: datagrid
```

## Filename

### String vs object

`filename` can be either a string or an object. If a string, it only defines the template for the filename:

```yaml
filename: "{primary}.md"
```

As an object you can also define `filenmae.field`, allowing you to control whether or not you want to display the file's filename as a field in the editor:

```yaml
filename:
  template: "{year}-{month}-{day}-{primary}.md"
  field: create
```

You can pick one of 3 values:

- `false` (default): hide the filename input,
- `create`: show the filename input only when creating a new entry,
- `true`: show the filename input when creating and editing.

### Template

Filename templates can use any of the following tokens:

Token | Description
--- | ---
`{primary}` | Alias for the primary field in `view.primary`, or `title`, or the first field.
`{slug}` | Alias for `{primary}`.
`{year}` | Current year.
`{month}` | Current month, zero-padded.
`{day}` | Current day, zero-padded.
`{hour}` | Current hour, zero-padded.
`{minute}` | Current minute, zero-padded.
`{second}` | Current second, zero-padded.
`{fields.<name>}` | Field value from the current entry, slugified (e.g. `{fields.title}`). This works for nested fields too (e.g. `{fields.author.name}`).
`{<name>}` | Shorthand alias for `{fields.<name>}` (e.g. `{title}` or `{author.name}`).

Pages CMS resolves filename tokens in this order:

1. Try the token as written.
2. If nothing resolves, try the same token under `fields.*`.

For example:

```yaml
filename: "{year}-{month}-{day}-{title}.md"
```

For a post created on January 17, 2026, with the title "Hello world!", this would save the file as `2026-01-17-hello-world.md`.

## View

`view` only applies to `type: collection`.

It controls the collection listing: visible fields, sorting, search, and tree view behavior.

### Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">fields</code> | Fields shown in the collection list, in order (e.g. `["title", "published", "author.name"]`).
<code class="text-[var(--prism-keyword)]">primary</code> | Field used as the primary label (e.g. `"title"`). Defaults to `title` when available, otherwise the first configured field.
<code class="text-[var(--prism-keyword)]">sort</code> | Fields available for sorting (e.g. `["date", "title"]`).
<code class="text-[var(--prism-keyword)]">search</code> | Fields indexed for search (e.g. `["title", "body", "author"]`). By default, all fields are indexed.
<code class="text-[var(--prism-keyword)]">default.search</code> | Default search query (e.g. `"author:Patricia"`).
<code class="text-[var(--prism-keyword)]">default.sort</code> | Default sort field (e.g. `"date"`).
<code class="text-[var(--prism-keyword)]">default.order</code> | Values: `asc`, `desc`.
<code class="text-[var(--prism-keyword)]">layout</code> | Values: `list`, `tree`.
<code class="text-[var(--prism-keyword)]">node</code> | Tree node config, as a string or object. A string is treated as `node.filename` (e.g. `"index.md"`).
<code class="text-[var(--prism-keyword)]">node.filename</code> | Node filename used in tree mode (e.g. `"index.md"`).
<code class="text-[var(--prism-keyword)]">node.hideDirs</code> | Values: `all`, `nodes`, `others`.

## Examples

### Basic collection

```yaml
content:
  - name: posts
    label: Posts
    type: collection
    path: content/posts
    fields:
      - name: title
        type: string
      - name: published
        type: boolean
        default: true
      - name: body
        type: rich-text
```

### Basic single file

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

### Root arrays in single files

If a single file stores an array at the top level, set `list: true`.

```yaml
content:
  - name: authors
    label: Authors
    type: file
    path: data/authors.json
    format: json
    list: true # Enables top level array
    fields:
      - name: name
        type: string
      - name: email
        type: string
      - name: avatar
        type: image
```

This saves the file as a top-level JSON array:

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "/media/avatars/john.png",
  },
  {
    "name": "Marie Smith",
    "email": "marie@example.com",
    "avatar": "/media/avatars/marie.png",
  }
]
```


### Collection view config

`view` only applies to `type: collection`.

```yaml
content:
  - name: posts
    type: collection
    path: content/posts
    view:
      fields: [title, date, published]
      primary: title
      sort: [date, title]
      search: [title, body, author]
      default:
        sort: date
        order: desc
```

Tree example:

```yaml
content:
  - name: docs
    type: collection
    path: content/docs
    view:
      layout: tree
      node:
        filename: index.md
        hideDirs: all
```

### Per-entry commit templates

Use `content[].commit.templates` when one entry needs different commit messages.

```yaml
content:
  - name: posts
    type: collection
    path: content/posts
    commit:
      templates:
        create: "feat(posts): add {filename}"
        update: "feat(posts): update {filename}"
        delete: "feat(posts): remove {filename}"
        rename: "feat(posts): rename {oldFilename} -> {newFilename}"
```
