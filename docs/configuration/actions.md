---
title: Actions
description: Add custom GitHub Actions buttons to Pages CMS.
---

## What actions are

Actions allow you to add custom buttons that trigger GitHub Actions. They can appear:

- at the repository level in the sidebar,
- in the header of collection pages, collection entry pages, file pages and media pages.

These actions start a GitHub Actions workflow with `workflow_dispatch` and [a `payload` input](#configuration-on-github) that contains contextual information about the trigger (e.g. sha, path of the entry, custom user inputs, etc).

## Keys

Each action may use the following keys:

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">name</code> <span class="text-muted-foreground">*</span> | Internal action name.
<code class="text-[var(--prism-keyword)]">label</code> <span class="text-muted-foreground">*</span> | Button label shown in the UI.
<code class="text-[var(--prism-keyword)]">workflow</code> <span class="text-muted-foreground">*</span> | Workflow file name in `.github/workflows/`.
<code class="text-[var(--prism-keyword)]">ref</code> | Git ref used to dispatch the workflow. Use `current` to use the branch currently open in Pages CMS.
<code class="text-[var(--prism-keyword)]">scope</code> | Collection-only. Values: `collection`, `entry`.
<code class="text-[var(--prism-keyword)]">cancelable</code> | Whether the run can be cancelled from Pages CMS. Defaults to `true`.
<code class="text-[var(--prism-keyword)]">confirm</code> | Confirmation dialog config. Use `false` to skip confirmation.
<code class="text-[var(--prism-keyword)]">fields</code> | Extra input fields collected before dispatch.

<span class="text-sm text-muted-foreground">*: Required</span>

## Confirmation

Actions show a confirmation dialog by default when triggered.

Set `confirm: false` to skip it or customize the title, message and button label of the dialog:

```yaml
actions:
  - name: deploy-site
    label: Deploy site
    workflow: pages-cms-action.yml
    confirm:
      title: Deploy site?
      message: This will trigger the deployment workflow.
      button: Deploy
```

## Extra fields

Use `fields` to collect extra values that will be passed to the GitHub Actions workflow via `payload.inputs`. Each field may use the following keys:

- `name`: field name (used in `payload.inputs`).
- `label`: field label.
- `type`: one of `text`, `textarea`, `select`, `checkbox`, or `number`.
- `required`: whether the field is required.
- `default`: default value for the field.
- `options`: an array of label/value objects for `select` fields.

The form for these values is shown in the same dialog before the action is dispatched. If `fields` are defined, the dialog is still shown even when `confirm: false`.

Example:

```yaml
actions:
  - name: deploy-site
    label: Deploy site
    workflow: pages-cms-action.yml
    fields:
      - name: environment
        label: Environment
        type: select
        required: true
        default: staging
        options:
          - label: Staging
            value: staging
          - label: Production
            value: production
      - name: force
        label: Force deploy
        type: checkbox
        default: false
```

## Configuration on GitHub

GitHub Actions need to be enabled for the repository. You will need to create a workflow that accepts a `payload` input:

```yaml
on:
  workflow_dispatch:
    inputs:
      payload:
        description: Pages CMS payload as JSON
        required: true
        type: string
```

Pages CMS will send one JSON object inside `inputs.payload` which includes:

- action metadata,
- repository metadata,
- triggering user,
- context,
- extra field values in `payload.inputs`.

Example shape:

```json
{
  "source": "pages-cms",
  "action": {
    "name": "deploy-site",
    "label": "Deploy site"
  },
  "repository": {
    "owner": "pagescms",
    "repo": "website",
    "ref": "main",
    "workflowRef": "main",
    "sha": "abc123..."
  },
  "triggeredAt": "2026-03-30T12:00:00.000Z",
  "triggerType": "rerun",
  "rerunOfActionRunId": 42,
  "triggeredBy": {
    "userId": "...",
    "name": "Ronan Berder",
    "email": "...",
    "githubUsername": "hunvreus",
    "image": "..."
  },
  "context": {
    "type": "entry",
    "name": "posts",
    "path": "content/posts/hello.md",
    "data": {}
  },
  "inputs": {
    "environment": "staging",
    "force": false
  }
}
```

Use `jq`, `node`, or `actions/github-script` inside the workflow to parse `payload.inputs`.

## Permissions and cancellation

- `Run again` is only available to GitHub users.
- `Cancel run` is available to GitHub users for any active run.
- Collaborators can only cancel their own active runs.
- `Cancel run` is only available once the GitHub workflow run exists.
- Set `cancelable: false` to disable cancellation for an action.


## Examples

### Root action

```yaml
actions:
  - name: deploy-site
    label: Deploy site
    workflow: pages-cms-action.yml
    ref: current
    cancelable: false
```

### Collection action

```yaml
content:
  - name: posts
    label: Posts
    type: collection
    path: content/posts
    fields:
      - name: title
        type: string
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

### File and media

```yaml
content:
  - name: site
    label: Site settings
    type: file
    path: data/site.yml
    fields:
      - name: title
        type: string
    actions:
      - name: validate-config
        label: Validate config
        workflow: pages-cms-file-action.yml

media:
  - name: images
    label: Images
    input: media/images
    output: /media/images
    actions:
      - name: optimize-images
        label: Optimize images
        workflow: pages-cms-media-action.yml
```
