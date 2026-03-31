---
layout: content
title: CONTENT.md
description: A proposed standard for describing editable content and media in Git-based repositories.
permalink: /CONTENT.md
---

## What `CONTENT.md` is for

`CONTENT.md` is a proposed standard for describing the editable content and media structure of a repository.

It is intended for:

- contributors editing content directly in Git,
- AI agents making content changes in a repository,
- CMSs and tooling that need a portable content contract.

The goal is simple: make it clear what content exists, where it lives, how it is shaped, and where media belongs.

## Why it exists

Many repositories already contain content and media in files, but only the site owner or CMS knows the actual rules:

- which directories hold content,
- which files are singleton documents,
- how new entries should be named,
- which fields exist,
- which values are required,
- where media can be uploaded.

That is usually enough to confuse contributors and agents.

`CONTENT.md` gives repositories a predictable, human-readable file that explains the content model without requiring knowledge of a specific CMS.

## What it should describe

A `CONTENT.md` file should describe only the declared content model of a repository.

It should focus on repository semantics such as:

- collections of entries,
- singleton files,
- media libraries,
- field definitions,
- filename patterns,
- formats and serialization,
- defaults and validation constraints.

It should not include UI-only details such as navigation, layout preferences, or editor presentation unless they affect the stored repository data.

## Core concepts

### Collection

A set of content entries stored under a path, usually with a filename pattern.

Examples:

- blog posts in `content/posts`
- docs pages in `docs/articles`

### File

A single content document stored at a fixed path.

Examples:

- `content/pages/home.md`
- `src/data/site.json`

### Media library

A configured path where media files may be stored and referenced by content.

Examples:

- `public/uploads`
- `assets/images`

### Field

A named piece of content data stored in a collection entry or singleton file.

Examples:

- `title`
- `date`
- `description`
- `image`

## How it works

A repository that adopts the standard adds a `CONTENT.md` file at its root.

That file describes:

1. what content types exist,
2. where they are stored,
3. what fields they contain,
4. what rules apply when creating or updating them,
5. where media may be uploaded.

The file may be:

- maintained by hand,
- generated from a CMS configuration file,
- or produced by another content tool.

If the file is generated, it should say what the authoritative source is.

## Example

```md
# CONTENT.md

This file describes the editable content and media structure of this repository.

## Collections

### posts

Path: `content/posts`
Format: `yaml-frontmatter + markdown body`
Filename: `{year}-{month}-{day}-{primary}.md`

Fields:
- `title`: string, required
- `date`: date, required
- `description`: string, optional
- `draft`: boolean, default `false`
- `image`: image reference, optional

## Files

### home

Path: `content/pages/home.md`
Format: `yaml-frontmatter + markdown body`

Fields:
- `title`: string, required
- `hero_title`: string, optional
- `hero_text`: text, optional

## Media libraries

### default

Input path: `public/uploads`
Public path: `/uploads`
Allowed extensions:
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
```

## Generating `CONTENT.md` from Pages CMS

Pages CMS can generate a `CONTENT.md` file from repository configuration.

When generated from Pages CMS, the mapping is straightforward:

- `content` collections become collection sections,
- `content` files become file sections,
- `media` definitions become media library sections,
- field definitions become field descriptions,
- defaults and constraints are carried over when they affect repository data.

UI-only configuration such as navigation or view settings should be omitted unless it changes the actual stored content shape.

## Design principles

If you implement this standard, keep it:

- CMS-neutral,
- repository-focused,
- readable without prior product knowledge,
- structured enough for agents to follow reliably,
- concise enough to remain useful in real repositories.

## Status

`CONTENT.md` is currently presented here as a proposed open convention.

Pages CMS aims to support generating it automatically from repository configuration, but the format is intended to be usable by any CMS or Git-based content workflow.
