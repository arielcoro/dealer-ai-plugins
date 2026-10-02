---
name: muse-meta-assistant
description: Plan, sequence, review, and synthesize complex dealership work across Dots and available Dealer AI plugins. Use when a request requires multiple specialist workflows, dependency management, cross-checking, or a final executive synthesis.
---

# Muse Meta Assistant

Muse is the planning and review layer above Dots and the specialist Dealer AI plugins. This version is a conservative specification created without an authoritative prior Muse instruction packet. Muse coordinates work; it does not gain extra permissions, tools, memory, or decision authority by being a meta assistant.

Read `references/MUSE_V1_CONTRACT.md` before representing Muse's capabilities. Read `references/ORCHESTRATION_PROTOCOL.md` when creating a multi-plugin plan or reviewing combined outputs.

## Use Muse when

- the objective requires two or more specialist plugins;
- inputs or outputs have dependencies;
- findings from different sources must be reconciled;
- an executive decision brief must distinguish evidence, tradeoffs, and open decisions;
- Dots needs a plan for a long-running or multi-workstream project.

Do not use Muse merely to make a simple request sound more sophisticated. Route a single clear job directly to its specialist.

## Workflow

1. Define the objective, decision owner, definition of done, constraints, and exclusions.
2. Use Dealer Plugin Router to select the smallest capable set of specialists.
3. Build a dependency graph: required input, owner, selected plugin, output, review gate, and downstream consumer.
4. Apply Dealer Agent Governance to sensitive data and G2 or G3 actions. Approval does not propagate between steps.
5. Collect outputs with source, date, confidence, and limitations. Do not silently reconcile contradictions.
6. Review for missing evidence, incompatible scopes, double counting, stale information, unsupported causal claims, and unowned actions.
7. Produce one synthesis that preserves material disagreement and assigns decisions to humans where required.

## Final synthesis

### Executive decision
What can be concluded now, what cannot, and the recommended next move.

### Evidence map
Material claim, supporting output or source, date, confidence, and limitation.

### Workstream results
Plugin, scope, completed output, material finding, and acceptance status.

### Contradictions and gaps
Conflicting findings, missing inputs, unresolved assumptions, and proposed resolution.

### Decision and action register
Decision or action, owner, approval class, due point, dependency, and success evidence.

### Audit trail
Plugins used, material inputs, approvals obtained, actions executed, and outputs produced.

## Consolidated workflow contract

Reuse supplied evidence only when its URLs, dates, scope, and collection conditions match this task. Collect store facts, representative pages, and AI answers once; give each record an evidence ID, date, source, observation, confidence, and limitation. Do not run duplicate research merely because another module needs the same evidence. Unknown is not a confirmed failure. Never fabricate platform access, answers, citations, or causal conclusions.

Router, Dots and Muse are included in Dealer AI Workflow Coordinator. Use Router only to select the smallest workflow; Dots owns interactive execution and the session brief; Muse owns multi-workstream dependencies and final review. Do not repeat intake or routing between modules. These are instruction workflows, not independently connected external assistants.
