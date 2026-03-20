# AI Agent Guidelines for /dev/push Documentation

Guidelines for AI agents working on the documentation website.

## Writing Style

- **Concise**: Keep sentences short. Remove filler words.
- **Direct**: Lead with the action or key information.
- **Technical**: Assume readers are developers. Don't over-explain basics.
- **Process-driven**: Prefer step-by-step instructions that a human or agent can follow successfully without guesswork.

Always try to first describe the feature or concept as concisely first, then provide
details (e.g. options) and then example if relevant.

## Content Rules

- Prefer procedural guidance over broad explanation when the page is about setup, installation, migration, or upgrade.
- Keep upgrade and setup pages action-oriented: prerequisites, exact changes, verification.
- Do not add generic `Related docs` sections.
- Do not add speculative `Common issues` or troubleshooting sections.
- Only call out a trap when it is a clear, common failure mode already known from the product or codebase.
- If cross-linking is needed, place the link where the reader needs it in the relevant step or paragraph.

## Structure

### Alert Blocks

Use alert blocks for important contextual information:

```njk
<div class="alert">
  {% lucide "triangle-alert" %}
  <h3>Alert title</h3>
  <section>
    <p>Alert content here.</p>
  </section>
</div>
```

### Contextual Links

Add links inline where they help the reader complete the current step. Do not add link dumps at the end of a page.

```njk
<div class="flex flex-wrap gap-2 my-6">
  <a href="/docs/configuration#ssl-providers" class="badge-outline">
    SSL Providers
    {% lucide "arrow-right" %}
  </a>
</div>
```

### Tables

Prefer tables over long lists when showing structured data (paths, permissions, options).

### Code Blocks

- Use `bash` for shell commands
- Keep examples minimal—show only what's necessary
- Add comments sparingly, only when the command isn't self-explanatory

## Menu

Update `docs/docs.json` when adding or reorganizing pages:

```json
{
  "menu": [
    {
      "type": "group",
      "label": "Getting started",
      "items": ["index", "installation", "configuration"]
    }
  ]
}
```

## File Organization

- Main docs: `docs/`
- Nested topics: `docs/<topic>/` (e.g., `docs/basics/`)
- Each page needs frontmatter with `title` and `description`

## Formatting

- Use backticks for: file paths, commands, environment variables, code references
- Use bold for: UI elements, key terms on first use
- Use tables for: structured data, comparisons, reference lists
- Avoid: excessive headings, redundant explanations, long paragraphs
- Avoid: imagined problems, generic best-practice padding, and “you may run into” sections unless the trap is obvious and proven
