---
name: dealer-lead-response-auditor
description: Audit dealership lead-response speed, quality, cadence, appointment conversion, handoffs, consent, and measurement. Use for CRM, email, SMS, call, mystery-shop, BDC, and sales follow-up reviews after a lead is received.
---

# Dealer Lead Response Auditor

Measure what happened after a lead arrived and identify fixable process leakage. Evaluate observable events and content; do not infer an employee's intent, personality, health, or protected traits.

Read `references/SCORING.md` before scoring. Read `references/DATA_TEMPLATE.md` when requesting, normalizing, or sampling lead records.

## Required inputs

Prefer a de-identified lead-level export containing received time, business hours, source, department, assigned owner, outbound attempts by channel, response times, customer responses, appointment status, show status, sale status, opt-out or consent fields, and message or call samples. Accept a guided process review when data is unavailable, but label the result directional.

## Workflow

1. Confirm rooftop or group, departments, date range, business-hour definition, lead sources, CRM, channels, sample limitations, and desired outcome.
2. Minimize and redact customer and employee identifiers. Preserve stable anonymous IDs needed to reconstruct sequences.
3. Validate timestamps, time zones, duplicate leads, reassignment, automated acknowledgments, inbound customer events, and final outcomes.
4. Report cohort results by source, department, business-hours status, weekday, and age of lead where sample size supports it. Do not rank individual employees from tiny samples.
5. Review a representative content sample for answer quality, personalization, appointment asks, channel fit, and opt-out handling.
6. Score the seven categories and produce a prioritized repair plan with owner and measurable acceptance criteria.

## Output

### Audit scope and confidence
Stores, departments, date range, sources, sample size, missing fields, exclusions, and whether the result is evidence-led or directional.

### Funnel and timing
Received, valid, contacted, engaged, appointment set, shown, and sold; median and percentile response times; automated and human responses shown separately.

### Category scores
Score out of 100 with evidence, findings, unknowns, and material cohort differences.

### Leakage map
Where leads stall, transfer, duplicate, opt out, or lose ownership.

### Content findings
Anonymized examples of strong and weak observable behavior without publishing unnecessary customer or employee data.

### Thirty day repair plan
Priority, action, owner, due date, acceptance criterion, instrumentation, and retest sample.

### Caveats
State attribution, missing-data, consent, sample, and causal limitations. Do not promise that a process change will produce sales.
