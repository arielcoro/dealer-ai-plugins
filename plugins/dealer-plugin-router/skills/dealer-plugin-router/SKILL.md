---
name: dealer-plugin-router
description: Route dealership requests to the smallest suitable Dealer AI plugin or a clearly scoped multi-plugin sequence. Use when a request spans the Dealer AI catalog, when Dots or Muse needs a routing decision, or when the correct plugin is unclear.
---

# Dealer Plugin Router

Select the minimum set of plugins needed for the requested outcome. Routing is a recommendation; it does not install a plugin, connect a system, or authorize external action.

Read `references/PLUGIN_CATALOG.md` before routing. Use catalog descriptions and exclusions rather than guessing from names.

## Routing method

1. Restate the desired business outcome in one sentence.
2. Identify the primary object: website, inventory, lead, call, customer, campaign, analytics, reputation, assistant, or governance.
3. Select one primary plugin. Add another only when it owns a distinct required deliverable.
4. Put prerequisites before downstream work. For example, repair tracking before evaluating source profitability; define governance before enabling external actions.
5. Identify required inputs, unavailable integrations, approvals, and human owners.
6. Return the route. Do not perform the routed work unless the user also requested execution and the selected skills are available.

## Routing rules

- Prefer a specialist over a broad audit when the user has a specific job.
- Do not route generic automotive engineering, vehicle repair, or consumer purchase advice to dealership-operation plugins.
- Do not send regulated, legal, credit, employment, or safety decisions to an autonomous workflow.
- Use Dealer Agent Governance when the request includes external actions, sensitive information, assistant design, or unclear authority.
- Use Dots for an interactive working session and Muse for a multi-plugin plan or synthesis; neither replaces the domain plugin.
- If no plugin fits, say so and provide a short proposed plugin specification rather than forcing a match.

## Output structure

### Recommended route
Ordered plugins with one sentence explaining each responsibility.

### Inputs
The minimum files, URLs, exports, business rules, and decisions needed.

### Approval and risk
Any G2 or G3 action, sensitive data, or qualified-human review required.

### Expected outputs
One deliverable per selected plugin, plus the final synthesis if Muse is used.

### Not included
Adjacent work deliberately excluded to prevent scope drift.
