---
title: Introduction
description: What Pages CMS is, why it was created and how it works.
---

## What is Pages CMS?

[Pages CMS](https://pagescms.org) is an open-source CMS for Git-based static sites.

Instead of storing content in a database, it edits your files directly in your GitHub repository through a user-friendly UI.

## Why it was created

The vast majority of sites can run with static content in a GitHub repository. You can easily scale up to 10,000+ pages without a problem. But non-technical users (marketing teams, writers, etc) don't necessarily want to learn Git to manage content.

Pages CMS bridges that gap:

- you get to use Git-tracked files for your content and media, and avoid having to integrate a headless CMS,
- non-technical users can still use a modern and user-friendly interface without having to learn Git.

## How it works

1. You add a `.pages.yml` config file to your repo.
2. You define your content model (`content`, `fields`, `media`, optional `components`).
3. Editors sign in (with GitHub or email) and edit content using a user-friendly interface.
4. Changes are saved back to your repository.
