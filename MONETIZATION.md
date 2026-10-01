# Monetization Architecture

Dealer AI Plugins uses a free-distribution, paid-implementation model inspired by the marketplace flywheel used by Digital Inspiration:

1. Publish a useful free product where customers already work.
2. Surround each product with searchable documentation and examples.
3. Sell annual implementation resources and higher-touch support on the publisher's website.
4. Offer larger licenses for teams and service providers.
5. Use annual renewal, self-service billing, clear cancellation, and post-purchase onboarding.
6. Cross-link related products and workflows without weakening the free product.

## Offers

| Audience | Founding price | Value metric | Included scope |
| --- | ---: | --- | --- |
| Dealership | $795/year | One rooftop | Implementation library, rollout planner, two annual office-hours sessions, priority email support |
| Dealer group | $2,995/year | Up to five rooftops | Group rollout workbook, governance templates, quarterly group workshop, priority support |
| Agency | $5,995/year | Up to ten active client rooftops | White-label reporting templates, agency playbook, quarterly enablement, priority support |
| Readiness audit | From $2,500 once | One scoped organization | Evidence review, scored findings, executive readout, 90-day action plan |

The annual prices are hypotheses. Start with a founding cohort, interview buyers, and validate willingness to pay before turning on public self-serve checkout.

## Stripe setup

Create one annual Stripe product for each audience and use hosted Payment Links. Configure automatic tax where required, the Stripe Customer Portal, fulfillment emails, and webhook-based provisioning only after a paid platform exists.

The Astro site reads these optional build variables:

```text
PUBLIC_STRIPE_DEALER_URL
PUBLIC_STRIPE_GROUP_URL
PUBLIC_STRIPE_AGENCY_URL
```

Until a URL is configured, plan buttons open a pre-addressed email to Dealer Growth Hackers. This prevents an unfinished or unfulfillable offer from accepting payment.

## OpenAI boundary

The OpenAI packages remain free and do not contain pricing, checkout links, upgrade prompts, trials, or feature degradation. Current OpenAI guidance does not allow plugins to sell or promote digital subscriptions. An eventual authenticated MCP may let an existing paid customer sign in and access existing entitlements, but it must not initiate a subscription or direct a user to checkout.

## Launch sequence

1. Publish the plans page and recruit 5–10 founding customers manually.
2. Complete the promised implementation resources and operating cadence.
3. Run pricing interviews across all three audiences.
4. Configure Stripe products, Payment Links, Customer Portal, cancellation, and fulfillment emails.
5. Add analytics for plan-page views, contact clicks, qualified opportunities, wins, renewal, and churn.
6. Build authenticated MCP services only after repeated customer demand identifies the live-data features worth operating.
