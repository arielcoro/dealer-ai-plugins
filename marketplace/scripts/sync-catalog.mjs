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

const downloadDir = path.join(siteRoot, "public", "downloads");
fs.mkdirSync(downloadDir, { recursive: true });

const plugins = inventory.map((item) => {
  const manifestPath = path.join(repoRoot, "plugins", item.pluginName, "plugin.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const ui = manifest.extensions["com.openai"].interface;
  const zipName = `${item.pluginName}.zip`;
  fs.copyFileSync(path.join(repoRoot, "dist", zipName), path.join(downloadDir, zipName));
  const [category, ...tags] = categories[item.sourceName];
  return {
    slug: item.pluginName,
    skillName: item.sourceName,
    name: ui.displayName,
    shortDescription: ui.shortDescription,
    description: manifest.description,
    longDescription: ui.longDescription,
    category,
    categoryDescription: categoryDescriptions[category],
    tags,
    prompt: ui.defaultPrompt[0],
    download: `/downloads/${zipName}`,
    source: `https://github.com/arielcoro/dealer-ai-skills/tree/main/skills/${item.sourceName}`,
    version: manifest.version,
  };
});

const dataDir = path.join(siteRoot, "src", "data");
fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, "plugins.json"), `${JSON.stringify(plugins, null, 2)}\n`);
console.log(`Synced ${plugins.length} plugins.`);
