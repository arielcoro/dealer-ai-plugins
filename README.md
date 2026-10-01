# Dealer AI Plugins for ChatGPT and Codex

This repository packages 29 independently installable Dealer AI plugins for ChatGPT and Codex using OpenAI's Agent Plugins format. It includes the original 23 Dealer AI Skills plus governance, routing, shopping-readiness, lead-response, Dots, and Muse workflows.

Published by [Dealer Growth Hackers](https://dealergrowthhackers.com/).

Each plugin includes:

- A portable Agent Plugins `plugin.json` manifest.
- A Codex compatibility manifest at `.codex-plugin/plugin.json`.
- One complete Dealer AI skill with its original references and templates.
- OpenAI skill interface metadata and distributable icon assets.

The local marketplace catalog is located at `.agents/plugins/marketplace.json`.

OpenAI public-directory ZIPs are located at `dist/openai-submissions/`. Validate the source packages before submission with:

```bash
node scripts/validate-openai-submissions.mjs
```

The public-directory submission and discovery plan is documented in `OPENAI_DISCOVERY.md`.

## Rebuild

The source skills were imported from local commit `1a1df863b0b5a64cfd1951b50ae767b4029cdea9` of `arielcoro/dealer-ai-skills`.

Run:

```bash
node scripts/build-plugins.mjs
```

The build refreshes the 23 imported packages, preserves the six locally authored packages, and updates `plugin-inventory.json` and the marketplace catalog.

## Identifier exceptions

OpenAI limits the combined `plugin-name:skill-name` identity to 64 characters. Three plugin identifiers are shortened while their bundled skill names remain unchanged:

- `dealer-call-classifier` contains `dealer-call-transcript-classifier`.
- `dealer-customer-sentiment` contains `dealer-customer-sentiment-analyzer`.
- `dealer-equity-mining` contains `dealer-equity-mining-campaign-builder`.
