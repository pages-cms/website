---
title: Overview
description: Understand the structure of the `.pages.yml` file.
---

## What `.pages.yml` does

`.pages.yml` is the single source of truth for Pages CMS configuration.

Place it at the repository root.

Pages CMS reads it per repository and per branch.

## Top-level keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">media</code> | Defines where uploaded files are stored and what URLs are written. [See `media`](/docs/configuration/media/).
<code class="text-[var(--prism-keyword)]">content</code> | Defines editable collections and files. [See `content`](/docs/configuration/content/).
<code class="text-[var(--prism-keyword)]">components</code> | Reuses shared field definitions. [See `components`](/docs/configuration/components/).
<code class="text-[var(--prism-keyword)]">settings</code> | Sets repository-wide behavior such as merge mode and commit templates. [See `settings`](/docs/configuration/settings/).
<code class="text-[var(--prism-keyword)]">actions</code> | Adds repository-level GitHub Actions buttons. [See `actions`](/docs/configuration/actions/).

## Read order

Start with this order:

1. Define `media`.
2. Define `content`.
3. Add `components` if fields repeat.
4. Add `settings` if you need global behavior.
5. Add `actions` if you want custom workflow buttons.

## Minimal example

```yaml
media: media
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

## Example with a collection and a single file

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
actions:
  - name: deploy-site
    label: Deploy site
    workflow: pages-cms-action.yml
```
