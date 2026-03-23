---
title: Content
description: Define editable collections and files in your repository.
---

## Overview

`content` defines what editors can edit.

Each entry is either:

- a `collection` for many files with the same schema
- a `file` for one file with its own schema

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Unique internal name (e.g. `"posts"`).
<code class="text-[var(--prism-keyword)]">label</code> | UI label (e.g. `"Blog posts"`).
<code class="text-[var(--prism-keyword)]">type</code> <span class="text-muted-foreground">*</span> | Values: `collection`, `file`.
<code class="text-[var(--prism-keyword)]">path</code> <span class="text-muted-foreground">*</span> | Folder for collections or file path for single files (e.g. `"content/posts"`, `"data/site.yml"`).
<code class="text-[var(--prism-keyword)]">fields</code> | Field definitions shown in the editor. Read more about: [`fields`](/docs/configuration/content/fields/), [editors](/docs/configuration/content/editors/)
<code class="text-[var(--prism-keyword)]">filename</code> | Collection filename template or object config. [Read more about `filename`](/docs/configuration/content/filename/)
<code class="text-[var(--prism-keyword)]">exclude</code> | Files to ignore in a collection (e.g. `["README.md"]`).
<code class="text-[var(--prism-keyword)]">format</code> | File format. Values include `yaml-frontmatter`, `json-frontmatter`, `toml-frontmatter`, `yaml`, `json`, `toml`, `datagrid`, `code`, `raw`. [Read more about editors](/docs/configuration/content/editors/)
<code class="text-[var(--prism-keyword)]">delimiters</code> | Custom frontmatter delimiters (e.g. `"+++"`, `["<!--", "-->"]`).
<code class="text-[var(--prism-keyword)]">subfolders</code> | Enables or disables nested folders in collections.
<code class="text-[var(--prism-keyword)]">list</code> | For `type: file`, store the whole file as a top-level array.
<code class="text-[var(--prism-keyword)]">view</code> | Collection list settings for fields, sorting, search, and tree mode. [Read more about `view`](/docs/configuration/content/view/)
<code class="text-[var(--prism-keyword)]">commit</code> | Per-entry commit settings. [See `settings`](/docs/configuration/settings/).

<span class="text-sm text-muted-foreground">*: Required</span>

## Examples

### Collection

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

### Single file

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
