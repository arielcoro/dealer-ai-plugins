# Lead audit data template

Use a de-identified dataset. Keep raw PII in the authorized source system whenever possible.

## Minimum event fields

- anonymous_lead_id
- rooftop_id and department
- lead_source and source_detail
- received_at with timezone
- within_business_hours
- assigned_at and anonymous_owner_id
- event_at with timezone
- event_type: automated_ack, email, sms, call, voicemail, reassignment, customer_reply, appointment, show, sale, opt_out, or other
- direction: inbound or outbound
- delivery_status when available
- appointment_status and appointment_at
- final_disposition and disposition_at

## Optional analytical fields

- vehicle stock or VIN token, never more than needed
- campaign or vendor ID
- call duration and classified observable outcome
- anonymized message text or quality-review code
- consent source, timestamp, and permitted channels
- duplicate-group ID

## Validation checks

- Normalize all timestamps to one reporting zone while preserving originals.
- Separate automated acknowledgments from human responses.
- Deduplicate vendor retransmissions without erasing genuine repeat inquiries.
- Preserve inbound customer events so a stopped cadence is not scored as missing follow-up.
- Report missingness by field and source before calculating performance.
- Suppress or combine cohorts too small for fair interpretation.

## Sampling content

Use a documented stratified sample across source, department, outcome, business-hours status, and response-speed bands. Redact names, phones, emails, addresses, credit information, and free-text details not needed for the finding.
