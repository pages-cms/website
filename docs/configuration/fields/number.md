---
title: Number field
description: Numeric input for integers and decimals.
---

Use for prices, weights, scores, or rankings.

## Options

Key | Description
--- | ---
<code class="text-[var(--prism-keyword)]">min</code> | Minimum value (e.g. `0`).
<code class="text-[var(--prism-keyword)]">max</code> | Maximum value (e.g. `100`).

## Example

```yaml
- name: price
  type: number
  options:
    min: 0
```
