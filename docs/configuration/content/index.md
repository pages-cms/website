---
title: Overview
description: Define editable collections and files in your repository.
---

## Overview

`content` defines what editors can edit.

Each entry is either:

- a `collection` for many files with the same schema
- a `file` for one file with its own schema
- a `group` for organizing files and collections in the sidebar

`group` is navigation-only. It can contain nested `group`, `collection`, and `file` entries, but it does not create its own editor route.

Collections and files can also define `actions`. See [`actions`](/docs/configuration/actions/).

## Keys

Each `content` entry may use the following keys:

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Unique internal name (e.g. `"posts"`).
<code class="text-[var(--prism-keyword)]">label</code> | UI label (e.g. `"Blog posts"`).
<code class="text-[var(--prism-keyword)]">type</code> <span class="text-muted-foreground">*</span> | Values: `collection`, `file`, `group`.
<code class="text-[var(--prism-keyword)]">path</code> <span class="text-muted-foreground">*</span> | Folder for collections or file path for single files (e.g. `"content/posts"`, `"data/site.yml"`). Not used by `group`.
<code class="text-[var(--prism-keyword)]">fields</code> | Field definitions shown in the editor (e.g. `[{ name: "title", type: "string" }]`). Fields support options like `required`, `hidden`, and `readonly`. Read more about: [`fields`](/docs/configuration/content/fields/), [editors](/docs/configuration/content/editors/)
<code class="text-[var(--prism-keyword)]">filename</code> | Collection filename template or object config (e.g. `"{primary}.md"` or `{ template: "{year}-{month}-{day}-{primary}.md", field: create }`). [Read more about `filename`](/docs/configuration/content/filename/)
<code class="text-[var(--prism-keyword)]">exclude</code> | Files to ignore in a collection (e.g. `["README.md"]`).
<code class="text-[var(--prism-keyword)]">format</code> | File format. Values include `yaml-frontmatter`, `json-frontmatter`, `toml-frontmatter`, `yaml`, `json`, `toml`, `datagrid`, `code`, `raw`. [Read more about editors](/docs/configuration/content/editors/)
<code class="text-[var(--prism-keyword)]">delimiters</code> | Custom frontmatter delimiters (e.g. `"+++"`, `["<!--", "-->"]`).
<code class="text-[var(--prism-keyword)]">subfolders</code> | Values: `true`, `false`. Enables or disables nested folders in collections.
<code class="text-[var(--prism-keyword)]">list</code> | Repeat a field as an array, or for `type: file`, store the whole file as a top-level array. [Read more about `list`](/docs/configuration/content/list/)
<code class="text-[var(--prism-keyword)]">view</code> | Collection list settings for fields, sorting, search, and tree mode (e.g. `{ primary: "title", sort: "date", order: "desc" }`). [Read more about `view`](/docs/configuration/content/view/)
<code class="text-[var(--prism-keyword)]">commit</code> | Per-entry commit settings (e.g. `{ identity: "user" }`). [See `settings`](/docs/configuration/settings/).
<code class="text-[var(--prism-keyword)]">actions</code> | Adds collection or file action buttons (e.g. `[{ name: "preview", label: "Preview", workflow: "pages-cms-file-action.yml" }]`). [See `actions`](/docs/configuration/actions/).
<code class="text-[var(--prism-keyword)]">items</code> | Child entries inside a `group` (e.g. nested `group`, `collection`, or `file` entries).

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
    actions:
      - name: rebuild-posts
        label: Rebuild posts
        scope: collection
        workflow: pages-cms-collection-action.yml

      - name: preview-post
        label: Preview
        scope: entry
        workflow: pages-cms-entry-action.yml
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
    actions:
      - name: validate-config
        label: Validate config
        workflow: pages-cms-file-action.yml
```

### Nested groups

Use `type: group` to organize large content menus without changing how content is stored internally.

```yaml
content:
  - name: docs
    label: Docs
    type: group
    items:
      - name: pages
        label: Pages
        type: collection
        path: content/pages
        fields:
          - name: title
            type: string

      - name: references
        label: References
        type: group
        items:
          - name: publications
            label: Publications
            type: file
            path: data/publications.json
            format: json
            list: true
            fields:
              - name: title
                type: string
```
