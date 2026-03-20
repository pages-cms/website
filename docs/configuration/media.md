---
title: Media
description: Configure where files are stored and how URLs are written.
---

## What `media` does

`media` defines file storage paths used by [image](/fields/image), [file](/fields/file) and [rich-text](fields/rich-text) fields.

You can set it as:

- [a string](#single-media-(string)),
- [a single object](#single-media-(object)),
- [an array of named media sources](#multiple-media-sources).

## Keys

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">**</span> | Source name, required when using an array (e.g. `"images"`).
<code class="text-[var(--prism-keyword)]">label</code> | Display label in the UI (e.g. `"Product images"`).
<code class="text-[var(--prism-keyword)]">input</code> <span class="text-muted-foreground">*</span> | Repository path where files are saved (e.g. `"src/media"`).
<code class="text-[var(--prism-keyword)]">output</code> <span class="text-muted-foreground">*</span> | Public path written in content (e.g. `"/media"`).
<code class="text-[var(--prism-keyword)]">extensions</code> | Explicit allowed extensions (e.g. `["png", "webp"]`).
<code class="text-[var(--prism-keyword)]">categories</code> | Category-based extension set. Values: `image`, `document`, `video`, `audio`, `compressed`, `code`, `font`, `spreadsheet`.
<code class="text-[var(--prism-keyword)]">rename</code> | If `true`, uploaded files are saved with a random filename plus the original extension.
<code class="text-[var(--prism-keyword)]">commit</code> | Per-entry commit settings, overriding `settings.commit` (e.g. `"chore(media): add {filename}"`). [Read more in `settings`](/docs/configuration/settings).

<span class="text-sm text-muted-foreground">*: Required</span>
<span class="text-sm text-muted-foreground">**: Required with multiple sources</span>

All options (except for `name` and `label`) can be overriden by [image](/docs/fields/image), [file](/docs/fields/file) and [rich-text](/docs/fields/rich-text) fields.

## Examples

### Single media (string)

```yaml
media: media
```

This is equivalent to:

```yaml
media:
  input: media
  output: /media
```

### Single media (object)

```yaml
media:
  input: src/media
  output: /media
  rename: true
  categories: [image]
```

### Multiple media sources

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

### Custom commit templates

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
