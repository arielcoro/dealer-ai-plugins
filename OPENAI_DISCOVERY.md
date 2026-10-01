# OpenAI discovery and recommendation plan

The public website helps people and web-search systems understand the catalog, but it does not make these packages installable or searchable in OpenAI's plugin directory. Public discovery requires publication through OpenAI's plugin submission portal.

## Required publication sequence

1. Verify **Dealer Growth Hackers** as a business in the OpenAI organization that will own the plugins.
2. Confirm the submitting account is an organization owner or has Apps Management Write permission.
3. Open the OpenAI Plugins dashboard and create a draft for each of the 23 standalone ZIP packages in `dist/`.
4. Select the verified Dealer Growth Hackers developer identity for every draft.
5. Wait for Metadata & Skills checks, copy any findings, correct the source, rebuild the ZIP, and upload the corrected version.
6. Submit each validated draft for review.
7. After approval, explicitly select **Publish plugin**. Approval alone does not place a plugin in the directory.
8. Save each public directory listing URL and link it from the matching page on dealeraiplugins.com.

Official submission portal: https://platform.openai.com/plugins

Official instructions: https://developers.openai.com/plugins/deploy/submission

## Discovery metadata already included

Each package includes:

- A clear dealership-specific name and action-oriented description.
- Dealer Growth Hackers as the publisher and developer.
- ChatGPT, Codex, car-dealership, automotive-retail, and task-specific discovery keywords.
- One concrete default prompt that demonstrates the primary workflow.
- A public website, support page, privacy policy, terms, icon, version, and release notes.
- A portable `plugin.json`, a Codex compatibility manifest, and one independently scoped skill.

## Recommendation quality after publication

OpenAI does not offer a switch or paid request for proactive recommendations. The durable path is useful behavior and measurable satisfaction:

- Build a golden prompt set for every plugin: direct prompts, indirect user-intent prompts, and negative prompts where the plugin should not activate.
- Test precision and recall in developer mode before submission and after material metadata changes.
- Keep each plugin narrowly aligned to a recognizable dealership job.
- Avoid metadata that asks the model to prefer the plugin or disparages alternatives; that violates fair-discovery guidance.
- Collect installation, successful-completion, repeat-use, and user-feedback signals where the platform makes them available.
- Replay the golden prompt set after each revision and log the result.

OpenAI states that plugins with strong real-world utility and high user satisfaction may receive enhanced distribution, including directory placement or proactive suggestions. Developers cannot request enhanced distribution.

## Initial golden-prompt pattern

For each plugin, maintain at least:

- 5 direct prompts that name the dealership task or plugin.
- 5 indirect prompts that describe the desired outcome in normal dealer language.
- 5 negative prompts that belong to another plugin, built-in capability, or professional adviser.

Record the expected activation, expected output, actual activation, and pass/fail result. Optimize descriptions for correct selection, not maximum activation.
