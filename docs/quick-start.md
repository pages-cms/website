---
title: Quick start
description: The fastest path from zero to a working Pages CMS setup.
---

## Use the online version

The easiest way to get started is to use [the online version of Pages CMS]({{ site.app_url }}):

1. Go to [{{ site.app_url }}]({{ site.app_url }}).
2. Sign in with your GitHub account.
3. Install the GitHub App on the GitHub account that owns the repository for your website/app.
4. Select the repository for your website/app.
5. You will be asked to add the configuration file (`.pages.yml`). [Read more about configuration](/docs/configuration/overview) or use the minimal configuration below:


    ```yaml
    media: media
    content:
      - name: pages
        label: Pages
        type: collection
        path: docs
        fields:
          - name: title
            label: Title
            type: string
          - name: body
            label: Body
            type: rich-text
    ```

6. Start editing your content and media.

## Deploy your own version

The simplest way it to [deploy it on Vercel](/docs/guides/install-vercel/), but you can [self-host it pretty anywhere that supports Node.js](/docs/guides/install-self-host).
