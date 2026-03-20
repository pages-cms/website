---
title: Overview
description: Understand how the `.pages.yml` file works.
---

## The `.pages.yml` file

Pages CMS is configured through a `.pages.yml` file at the repository root (per branch).

If your repository doesn't have a `.pages.yml` file, you will be asked if you want to create it the first time you visit it through Pages CMS.

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">media</code> | Configures media folders (images, videos, files). [See configuration for `media`](/docs/configuration/media).
<code class="text-[var(--prism-keyword)]">content</code> | Defines the structure of the content editors can edit (collections and single files). [See configuration for `content`](/docs/configuration/content).
<code class="text-[var(--prism-keyword)]">components</code> | Allows you to define reusable sets of fields. [See configuration for `components`](/docs/configuration/components).
<code class="text-[var(--prism-keyword)]">settings</code> | Global settings (e.g. enable the cache admin page, define content merging strategy, etc). [See configuration for `settings`](/docs/configuration/settings).

## Examples

### Simple blog

```yaml
media: media
content:
  - name: posts
    label: Posts
    type: collection
    path: content/posts
    view:
      fields: [title, published, date]
    fields:
      - name: published
        type: boolean
        default: true
      - name: date
        type: date
      - name: title
        type: string
      - name: body
        type: rich-text
```

### Simple blog with site settings file

```yaml
media:
  input: src/media
  output: /media
content:
  - name: posts
    label: Posts
    type: collection
    path: src/posts
    fields:
      - name: title
        type: string
      - name: body
        type: rich-text
  - name: site
    label: Site settings
    type: file
    path: src/_data/site.json
    fields:
      - name: title
        type: string
      - name: description
        type: text
      - name: url
        type: string
```
