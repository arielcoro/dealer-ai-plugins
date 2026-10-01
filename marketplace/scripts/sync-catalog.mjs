import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const repoRoot = path.resolve(siteRoot, "..");
const inventory = JSON.parse(fs.readFileSync(path.join(repoRoot, "plugin-inventory.json"), "utf8"));

const categories = {
  "dealer-ai-readiness-audit": ["Strategy", "Diagnostic", "75-point audit"],
  "dealer-search-strategy": ["Strategy", "SEO + AEO + GEO", "90-day roadmap"],
  "dealer-store-positioning": ["Strategy", "Brand", "Positioning"],
  "dealer-aeo-audit": ["AI Search", "AEO/GEO", "30 checks"],
  "dealer-ai-visibility": ["AI Search", "Monitoring", "Citation share"],
  "dealer-ai-sentiment-monitor": ["AI Search", "Sentiment", "Hallucination detection"],
  "dealer-ai-referral-analytics": ["Measurement", "GA4 + GSC", "AI referrals"],
  "dealer-llms-txt-generator": ["AI Search", "Generator", "llms.txt"],
  "dealer-aeo-content-brief": ["AI Search", "Content", "AEO brief"],
  "dealer-seo-audit": ["SEO & Local", "Traditional SEO", "100-point audit"],
  "dealer-gbp-audit": ["SEO & Local", "Google Business Profile", "Local pack"],
  "dealer-bilingual-seo": ["SEO & Local", "Spanish SEO", "Hreflang"],
  "dealer-site-score": ["Technical", "Website grader", "Core Web Vitals"],
  "dealer-cta-audit": ["Technical", "Conversion", "Mobile UX"],
  "dealer-vdp-merchandising-review": ["Technical", "Inventory", "VDP review"],
  "dealer-ga4-tracking-audit": ["Measurement", "GA4 + Ads", "Attribution"],
  "dealer-call-tracking-audit": ["Measurement", "Call tracking", "Attribution"],
  "dealer-call-transcript-classifier": ["Measurement", "Call classification", "Bilingual"],
  "dealer-new-customer-onboarding": ["Lifecycle", "90-day onboarding", "Multi-channel"],
  "dealer-email-flows": ["Lifecycle", "17 email flows", "Year 1–5+"],
  "dealer-equity-mining-campaign-builder": ["Lifecycle", "Campaign builder", "TCPA-aware"],
  "dealer-comparison-page-builder": ["Lifecycle", "Competitive content", "Fair-play"],
  "dealer-customer-sentiment-analyzer": ["Lifecycle", "Reputation", "Review analysis"],
  "dealer-agent-governance": ["Assistant Infrastructure", "Governance", "Approvals"],
  "dealer-plugin-router": ["Assistant Infrastructure", "Routing", "Catalog"],
  "dots-assistant": ["Assistant Infrastructure", "Assistant", "Coordination"],
  "dealer-ai-shopping-readiness-audit": ["AI Search", "Shopping AI", "100-point audit"],
  "dealer-lead-response-auditor": ["Sales Operations", "Lead handling", "100-point audit"],
  "muse-meta-assistant": ["Assistant Infrastructure", "Orchestration", "Quality review"],
};

const categoryDescriptions = {
  Strategy: "Decide what to fix, fund, and sequence before buying another tool.",
  "AI Search": "Become visible, accurate, and citeable inside answer engines.",
  "SEO & Local": "Win traditional search and the local pack with dealer-specific checks.",
  Technical: "Strengthen the website, conversion layer, and inventory experience.",
  Measurement: "Reconcile what platforms report with what the CRM says happened.",
  Lifecycle: "Build stronger customer journeys from delivery through the next purchase.",
  "Assistant Infrastructure": "Coordinate, govern, route, and review work across the Dealer AI plugin catalog.",
  "Sales Operations": "Improve lead handling, appointment conversion, ownership, and operational follow-through.",
};

const departments = {
  "dealer-aeo-audit": ["Marketing"],
  "dealer-aeo-content-brief": ["Marketing"],
  "dealer-ai-readiness-audit": ["Executive & Operations"],
  "dealer-ai-referral-analytics": ["Marketing", "Analytics & Technology"],
  "dealer-ai-sentiment-monitor": ["Marketing", "Customer Experience"],
  "dealer-ai-visibility": ["Marketing"],
  "dealer-bilingual-seo": ["Marketing"],
  "dealer-call-tracking-audit": ["Sales & BDC", "Fixed Operations", "Analytics & Technology"],
  "dealer-call-transcript-classifier": ["Sales & BDC", "Fixed Operations"],
  "dealer-comparison-page-builder": ["Marketing", "Sales & BDC"],
  "dealer-cta-audit": ["Marketing", "Sales & BDC", "Fixed Operations"],
  "dealer-customer-sentiment-analyzer": ["Customer Experience", "Fixed Operations"],
  "dealer-email-flows": ["Customer Experience", "Fixed Operations", "Sales & BDC"],
  "dealer-equity-mining-campaign-builder": ["Sales & BDC"],
  "dealer-ga4-tracking-audit": ["Marketing", "Analytics & Technology"],
  "dealer-gbp-audit": ["Marketing"],
  "dealer-llms-txt-generator": ["Marketing", "Analytics & Technology"],
  "dealer-new-customer-onboarding": ["Customer Experience", "Sales & BDC", "Fixed Operations"],
  "dealer-search-strategy": ["Marketing", "Executive & Operations"],
  "dealer-seo-audit": ["Marketing"],
  "dealer-site-score": ["Marketing", "Analytics & Technology"],
  "dealer-store-positioning": ["Marketing", "Executive & Operations"],
  "dealer-vdp-merchandising-review": ["Sales & BDC", "Marketing"],
  "dealer-agent-governance": ["Executive & Operations", "Analytics & Technology"],
  "dealer-plugin-router": ["Executive & Operations", "Analytics & Technology"],
  "dots-assistant": ["Executive & Operations", "Analytics & Technology"],
  "dealer-ai-shopping-readiness-audit": ["Marketing", "Sales & BDC"],
  "dealer-lead-response-auditor": ["Sales & BDC"],
  "muse-meta-assistant": ["Executive & Operations", "Analytics & Technology"],
};

const workflowBlueprints = {
  "dealer-aeo-audit": ["Dealer website, market and priority services", "30 AEO and GEO visibility checks", "Prioritized findings and remediation plan"],
  "dealer-aeo-content-brief": ["Target topic, audience and dealership context", "Answer intent, entities, evidence and citations", "Structured AEO/GEO content brief"],
  "dealer-ai-readiness-audit": ["Current systems, processes and AI usage", "75 readiness controls across the dealership", "Scorecard, gaps and 90-day priorities"],
  "dealer-ai-referral-analytics": ["GA4, GSC and server-log exports", "AI referrers, landing pages and conversion paths", "Referral baseline and measurement fixes"],
  "dealer-ai-sentiment-monitor": ["Dealership identity, market and comparison set", "AI descriptions, claims, tone and hallucinations", "Sentiment findings and correction priorities"],
  "dealer-ai-visibility": ["Brand, competitors, market and buyer questions", "Mentions, citations and answer-share patterns", "Visibility benchmark and opportunity map"],
  "dealer-bilingual-seo": ["English and Spanish pages, market and audience", "Language quality, intent, hreflang and local signals", "Bilingual SEO remediation plan"],
  "dealer-call-tracking-audit": ["Call-platform setup and analytics configuration", "Attribution, routing, integrations and data quality", "Tracking fixes and validation checklist"],
  "dealer-call-transcript-classifier": ["Call transcripts with approved identifiers removed", "Intent, outcome, quality and classification rules", "Consistent call labels and summary counts"],
  "dealer-comparison-page-builder": ["Dealer, named competitor and verifiable evidence", "Claims, differentiators, fairness and search intent", "Publishable comparison-page framework"],
  "dealer-cta-audit": ["Priority pages, CTAs and business goals", "Clarity, placement, friction, mobile UX and tracking", "Ranked conversion recommendations"],
  "dealer-customer-sentiment-analyzer": ["Customer reviews and review-source context", "Themes, sentiment, staff mentions and recurring issues", "Evidence-backed reputation summary"],
  "dealer-email-flows": ["Lifecycle stage, audience, offers and policies", "Timing, message purpose, handoffs and compliance", "Complete dealership email-flow plan"],
  "dealer-equity-mining-campaign-builder": ["Eligible audience rules, offer and inventory context", "Segmentation, cadence, consent and handoffs", "Equity campaign with compliant messaging"],
  "dealer-ga4-tracking-audit": ["GA4, Ads and website event configuration", "Events, conversions, attribution and data continuity", "Tracking defect log and repair plan"],
  "dealer-gbp-audit": ["Google Business Profile and local market", "Categories, content, reviews, links and local signals", "Local visibility score and action list"],
  "dealer-llms-txt-generator": ["Dealer website structure and priority resources", "Canonical pages, usefulness and crawler guidance", "Curated llms.txt draft"],
  "dealer-new-customer-onboarding": ["Delivery process, channels and ownership rules", "First-90-day moments, handoffs and escalation", "Multi-channel onboarding program"],
  "dealer-search-strategy": ["Business goals, market, competitors and baseline", "SEO, AEO, GEO, measurement and sequencing", "Integrated 90-day search roadmap"],
  "dealer-seo-audit": ["Dealer website, market and search priorities", "Technical, on-page, local and authority signals", "100-point audit and remediation backlog"],
  "dealer-site-score": ["Website URL and representative page set", "Performance, accessibility, SEO and dealer UX", "Site score and prioritized fixes"],
  "dealer-store-positioning": ["Store story, market, customers and competitors", "Differentiation, proof, voice and claim strength", "Positioning and brand-content kit"],
  "dealer-vdp-merchandising-review": ["Representative VDP sample and inventory goals", "Photos, pricing, descriptions, trust and CTAs", "Merchandising score and top fixes"],
  "dealer-agent-governance": ["AI use cases, roles, systems and risk tolerance", "Approvals, evidence, privacy and escalation", "Governance policy and approval matrix"],
  "dealer-plugin-router": ["Dealership request, goal and available inputs", "Scope, risk and smallest suitable workflow", "Plugin selection or bounded sequence"],
  "dots-assistant": ["Goal, current context and approved plugin access", "Task state, dependencies, approvals and handoffs", "Coordinated work with visible next steps"],
  "dealer-ai-shopping-readiness-audit": ["Website, inventory feeds and public shopping evidence", "Access, structure, comparability and accuracy", "100-point shopping-readiness plan"],
  "dealer-lead-response-auditor": ["Lead records, timestamps, messages and outcomes", "Speed, quality, cadence, ownership and conversion", "Lead-response score and coaching priorities"],
  "muse-meta-assistant": ["Complex objective, constraints and available workflows", "Plan quality, sequencing, evidence and review gates", "Orchestrated plan and synthesized result"],
};

const downloadDir = path.join(siteRoot, "public", "downloads");
fs.mkdirSync(downloadDir, { recursive: true });

const plugins = inventory.map((item) => {
  const manifestPath = path.join(repoRoot, "plugins", item.pluginName, "plugin.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const ui = manifest.extensions["com.openai"].interface;
  const zipName = `${item.pluginName}.zip`;
  fs.copyFileSync(path.join(repoRoot, "dist", zipName), path.join(downloadDir, zipName));
  const [category, ...tags] = categories[item.sourceName];
  const pluginDepartments = departments[item.sourceName];
  if (!pluginDepartments) throw new Error(`Missing department classification for ${item.sourceName}`);
  const workflow = workflowBlueprints[item.sourceName];
  if (!workflow) throw new Error(`Missing workflow blueprint for ${item.sourceName}`);
  return {
    slug: item.pluginName,
    skillName: item.sourceName,
    name: ui.displayName,
    shortDescription: ui.shortDescription,
    description: manifest.description,
    longDescription: ui.longDescription,
    category,
    categoryDescription: categoryDescriptions[category],
    departments: pluginDepartments,
    workflow: { input: workflow[0], process: workflow[1], output: workflow[2] },
    tags,
    prompt: ui.defaultPrompt[0],
    download: `/downloads/${zipName}`,
    source: `https://github.com/arielcoro/dealer-ai-plugins/tree/main/plugins/${item.pluginName}/skills/${item.sourceName}`,
    version: manifest.version,
  };
});

const dataDir = path.join(siteRoot, "src", "data");
fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "plugins.json"), `${JSON.stringify(plugins, null, 2)}\n`);
console.log(`Synced ${plugins.length} plugins.`);
