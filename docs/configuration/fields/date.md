---
title: Date field
description: Date or date-time input with formatting and bounds.
---

Use for publish dates, events, or scheduling metadata.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">time</code> | If `true`, includes a time picker.
<code class="text-[var(--prism-keyword)]">format</code> | Output format string, using [`date-fns`](https://date-fns.org/) tokens (e.g. `"yyyy-MM-dd"`).
<code class="text-[var(--prism-keyword)]">min</code> | Lower allowed value (e.g. `"2025-01-01"`).
<code class="text-[var(--prism-keyword)]">max</code> | Upper allowed value (e.g. `"2025-12-31"`).
<code class="text-[var(--prism-keyword)]">step</code> | Input step value (e.g. `60`).

## Notes

- Date fields initialize to the current local date.
- Datetime fields (`time: true`) initialize to the current local date and time.
- To keep a date field empty by default, set `default: ""`.

## Example

```yaml
- name: publish_at
  type: date
  default: ""
  options:
    time: true
    format: yyyy-MM-dd'T'HH:mm
```
