---
title: Examples
order: 3
---

A few examples of [configuration files](/docs/configuration).

## Jekyll blog

A simple Jekyll blog with posts in the `_posts` folder and media in `media`. It also expose the Jekyll config file (`_config.yml `), allowing the user to adjust a few global values (e.g. website title).

```yaml
media: media
content:
  - name: posts
    label: Posts
    type: collection
    path: '_posts'
    view:
      fields: [ title, published, date ]
    fields:
      - name: published
        label: Published
        type: boolean
        default: true
      - name: date
        label: Date
        type: date
      - name: title
        label: Title
        type: string
      - name: body
        label: Body
        type: rich-text
  - name: config
    label: Jekyll config
    path: _config.yml
    type: file
    fields:
      - name: title
        label: Website title
        type: string
      - name: description
        label: Website description
        type: string
        description: Will be provused for any page with no description.
      - name: url
        label: Website URL
        type: string
        pattern: ^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$
      - name: cover
        label: Preview image
        type: image
        description: Image used in the social preview on social networks (e.g. Facebook, Twitter...)
```

## 11ty blog

An 11ty blog with all of the code (content, templates, ...) in the `src` subfolder. It sets one collection for blog posts in `src/posts`, and one single file to manage the global site data at `src/_data/site.json` (for things like website title, description, etc).

```yaml
media:
  input: src/media
  output: /media
content:
  - name: posts
    label: Posts
    type: collection
    path: 'src/posts'
    view:
      fields: [ title, published, date ]
    fields:
      - name: published
        label: Published
        type: boolean
        default: true
      - name: date
        label: Date
        type: date
      - name: title
        label: Title
        type: string
      - name: body
        label: Body
        type: rich-text
  - name: site
    label: Site settings
    path: src/_data/site.json
    type: file
    fields:
      - name: title
        label: Website title
        type: string
      - name: description
        label: Website description
        type: string
        description: Will be provused for any page with no description.
      - name: url
        label: Website URL
        type: string
        pattern: ^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$
      - name: cover
        label: Preview image
        type: image
        description: Image used in the social preview on social networks (e.g. Facebook, Twitter...)
```

## Hugo blog

A Hugo blog with the posts on `content/posts` and the media on the `assets` folder.

```
media:
  input: assets
  output: static
content:
  - name: posts
    label: Post
    type: collection
    path: content/posts
    view:
      fields: [title, date, author]
    fields:
      - name: title
        label: Title
        type: string
        description: Title for the post
      - name: description
        label: Description
        type: string
        description: Brief summary or description of the post
      - name: author
        label: Author 
        type: string
        description: Author of the post
      - name: date
        label: Date
        type: date
        description: Creation or published date
      - name: draft
        label: Draft
        type: boolean
        default: true
        description: If this is set, the post won't appear on the blog
      - name: body
        label: Body
        type: rich-text
        description: The actual blog post
```
