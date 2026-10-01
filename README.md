# Dealer AI Plugins for ChatGPT and Codex

This repository packages the 23 Dealer AI Skills as 23 independently installable plugins for ChatGPT and Codex using OpenAI's Agent Plugins format.

Published by [Dealer Growth Hackers](https://dealergrowthhackers.com/).

Each plugin includes:

- A portable Agent Plugins `plugin.json` manifest.
- A Codex compatibility manifest at `.codex-plugin/plugin.json`.
- One complete Dealer AI skill with its original references and templates.
- OpenAI skill interface metadata and distributable icon assets.

The local marketplace catalog is located at `.agents/plugins/marketplace.json`.

The public-directory submission and discovery plan is documented in `OPENAI_DISCOVERY.md`.

## Rebuild

The source skills were imported from local commit `1a1df863b0b5a64cfd1951b50ae767b4029cdea9` of `arielcoro/dealer-ai-skills`.

Run:

```bash
node scripts/build-plugins.mjs
```

The build recreates `plugins/`, `plugin-inventory.json`, and the marketplace catalog.

## Identifier exceptions

OpenAI limits the combined `plugin-name:skill-name` identity to 64 characters. Three plugin identifiers are shortened while their bundled skill names remain unchanged:

- `dealer-call-classifier` contains `dealer-call-transcript-classifier`.
- `dealer-customer-sentiment` contains `dealer-customer-sentiment-analyzer`.
- `dealer-equity-mining` contains `dealer-equity-mining-campaign-builder`.
