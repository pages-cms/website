---
title: Media
description: Configure where uploaded files are stored and what URLs are written.
---

## What `media` does

`media` defines file storage for:

- [image](/docs/configuration/fields/image/) fields,
- [file](/docs/configuration/fields/file/) fields,
- [rich-text](/docs/configuration/fields/rich-text/) image uploads.

Use it to answer two questions:

1. Where should uploaded files be saved in the repository?
2. What public path should be written into content?

## Value

You can define `media` as:

- a string,
- one object,
- an array of named media sources.

### String form

```yaml
media: media
```

Equivalent to:

```yaml
media:
  input: media
  output: /media
```

### Single media object

```yaml
media:
  input: src/media
  output: /media
  rename: true
  categories: [image]
```

### Multiple media sources

Use an array when different field types should write to different folders.

```yaml
media:
  - name: images
    label: Images
    input: media/images
    output: /media/images
    rename: true
    extensions: [png, jpg, webp]
  - name: docs
    label: Documents
    input: media/docs
    output: /media/docs
    categories: [document]
```

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">**</span> | Internal media source name. Required when using an array (e.g. `"images"`).
<code class="text-[var(--prism-keyword)]">label</code> | UI label for the media source (e.g. `"Product images"`).
<code class="text-[var(--prism-keyword)]">input</code> <span class="text-muted-foreground">*</span> | Repository path where files are stored (e.g. `"src/media"`).
<code class="text-[var(--prism-keyword)]">output</code> <span class="text-muted-foreground">*</span> | Public path written into content (e.g. `"/media"`).
<code class="text-[var(--prism-keyword)]">extensions</code> | Allowed extensions (e.g. `["png", "webp"]`).
<code class="text-[var(--prism-keyword)]">categories</code> | Category-based extension sets. Values: `image`, `document`, `video`, `audio`, `compressed`, `code`, `font`, `spreadsheet`.
<code class="text-[var(--prism-keyword)]">rename</code> | If `true`, uploads get a random filename plus their original extension.
<code class="text-[var(--prism-keyword)]">commit</code> | Per-media commit settings. [See `settings.commit`](#/docs/configuration/settings/) .

<span class="text-sm text-muted-foreground">*: Required</span>
<span class="text-sm text-muted-foreground">**: Required with multiple sources</span>

Field-level media options can override the media source defaults.

## Commit templates

`media[].commit.templates` overrides the global commit templates for that media source.

```yaml
media:
  - name: images
    input: media/images
    output: /media/images
    commit:
      templates:
        create: "chore(media): add {filename}"
        update: "chore(media): update {filename}"
        delete: "chore(media): remove {filename}"
        rename: "chore(media): rename {oldFilename} -> {newFilename}"
```

<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration/content/" class="badge-outline">
    Content
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/configuration/fields/image/" class="badge-outline">
    Image field
    {% lucide "arrow-right" %}
  </a>
  <a href="/docs/configuration/fields/file/" class="badge-outline">
    File field
    {% lucide "arrow-right" %}
  </a>
</div>
