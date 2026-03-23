---
title: Quick start
description: The fastest path from zero to a working Pages CMS setup.
---

## Quick start

If you just want to try Pages CMS, use the hosted app.

1. Go to [app.pagescms.org](https://app.pagescms.org).
2. Sign in with GitHub.
3. Install the GitHub App on the account or organization that owns your repository.
4. Open the repository you want to edit.
5. Create `.pages.yml` when prompted.
6. Start editing.

## Minimal config

Use this as a first working config:

```yaml
media: media
content:
  - name: pages
    label: Pages
    type: collection
    path: docs
    fields:
      - name: title
        type: string
      - name: body
        type: rich-text
```

This gives you:

- one media folder at `media/`,
- one editable collection at `docs/`,
- a `title` field,
- a rich-text `body` field.

## What to do next

1. Add more fields.
2. Configure media storage.
3. Adjust filenames and collection view.

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration" class="badge-outline">
    Configuration overview
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/guides/installing/vercel/" class="badge-outline">
    Deploy your own instance
    {% lucide "arrow-right" %}
  </a>
</div>
