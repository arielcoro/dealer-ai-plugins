import fs from "node:fs";
import path from "node:path";

const SOURCE = "/Users/arielcoro/Claude/DealerAIGuy/dealer-ai-skills/skills";
const ROOT = process.cwd();
const PLUGINS = path.join(ROOT, "plugins");

const config = {
  "dealer-aeo-audit": ["Dealer AEO Audit", "Audit dealer AI visibility", "Audit my dealership website for AEO and GEO visibility."],
  "dealer-aeo-content-brief": ["Dealer AEO Content Brief", "Create an AI search brief", "Create an AEO content brief for a dealership page."],
  "dealer-ai-readiness-audit": ["Dealer AI Readiness Audit", "Score dealership AI readiness", "Run an AI readiness audit for my dealership."],
  "dealer-ai-referral-analytics": ["Dealer AI Referral Analytics", "Measure AI referral traffic", "Audit my dealership's traffic from AI search engines."],
  "dealer-ai-sentiment-monitor": ["Dealer AI Sentiment", "Audit AI brand sentiment", "Audit how AI assistants describe my dealership."],
  "dealer-ai-visibility": ["Dealer AI Visibility", "Track dealer AI citations", "Measure my dealership's visibility across AI engines."],
  "dealer-bilingual-seo": ["Dealer Bilingual SEO", "Improve Spanish dealer SEO", "Audit my dealership's Spanish-language SEO presence."],
  "dealer-call-tracking-audit": ["Dealer Call Tracking Audit", "Audit call attribution", "Audit my dealership's call tracking configuration."],
  "dealer-call-transcript-classifier": ["Dealer Call Classifier", "Classify dealership calls", "Classify these dealership call transcripts honestly."],
  "dealer-comparison-page-builder": ["Dealer Comparison Builder", "Build a fair comparison page", "Build a comparison page between my dealership and a competitor."],
  "dealer-cta-audit": ["Dealer CTA Audit", "Audit website calls to action", "Audit the calls to action on my dealership website."],
  "dealer-customer-sentiment-analyzer": ["Dealer Review Sentiment", "Analyze dealership reviews", "Analyze customer review sentiment for my dealership."],
  "dealer-email-flows": ["Dealer Email Flows", "Build dealer lifecycle email", "Build the lifecycle email flows for my dealership."],
  "dealer-equity-mining-campaign-builder": ["Dealer Equity Campaigns", "Build an equity campaign", "Build an equity mining campaign for my dealership."],
  "dealer-ga4-tracking-audit": ["Dealer GA4 Tracking Audit", "Audit dealer conversion data", "Audit my dealership's GA4 and Google Ads tracking."],
  "dealer-gbp-audit": ["Dealer GBP Audit", "Audit a dealer's GBP", "Audit my dealership's Google Business Profile."],
  "dealer-llms-txt-generator": ["Dealer llms.txt Generator", "Generate dealer llms.txt", "Generate an llms.txt file for my dealership website."],
  "dealer-new-customer-onboarding": ["Dealer Customer Onboarding", "Design a 90-day journey", "Design a 90-day onboarding program for new customers."],
  "dealer-search-strategy": ["Dealer Search Strategy", "Plan SEO, AEO, and GEO", "Build a unified search strategy for my dealership."],
  "dealer-seo-audit": ["Dealer SEO Audit", "Audit dealership SEO", "Run a traditional SEO audit on my dealership website."],
  "dealer-site-score": ["Dealer Site Score", "Grade a dealership website", "Grade the technical health of my dealership website."],
  "dealer-store-positioning": ["Dealer Store Positioning", "Define dealer positioning", "Create a positioning and brand content kit for my dealership."],
  "dealer-vdp-merchandising-review": ["Dealer VDP Review", "Review vehicle detail pages", "Review my dealership's VDP merchandising quality."],
};

const pluginIdOverrides = {
  "dealer-call-transcript-classifier": "dealer-call-classifier",
  "dealer-customer-sentiment-analyzer": "dealer-customer-sentiment",
  "dealer-equity-mining-campaign-builder": "dealer-equity-mining",
};

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="20" fill="#0F62FE"/>
  <path d="M30 32h30c24 0 40 12 40 32S84 96 60 96H30V32Zm18 16v32h12c14 0 22-6 22-16S74 48 60 48H48Z" fill="#FFFFFF"/>
  <rect x="92" y="24" width="14" height="14" rx="3" fill="#8AB4F8"/>
  <rect x="104" y="44" width="10" height="10" rx="2" fill="#FFFFFF"/>
</svg>\n`;

const compatibilityReplacements = [
  [/WebFetch or WebSearch/g, "web fetching or web search tools"],
  [/WebSearch or WebFetch/g, "web search or web fetching tools"],
  [/WebFetch, WebSearch/g, "web fetching and web search tools"],
  [/WebFetch/g, "web fetching tools"],
  [/WebSearch/g, "web search tools"],
  [/Claude in Chrome/g, "browser automation"],
  [/Chrome MCP/g, "browser automation tools"],
  [/FAQPage schema for the common questions section/g, "WebPage and BreadcrumbList schema for the comparison page; keep the visible Q&A as accessible HTML"],
  [/structured for FAQPage schema/g, "structured as accessible, question-led HTML"],
  [/The Q&A also gets FAQPage schema \(specified in Part 3 of the skill output\)\./g, "Keep the Q&A visible in accessible HTML. Do not add FAQPage solely for Google rich-result or AI-citation gains."],
  [/### FAQPage schema\n\n```[\s\S]*?```\n/g, "### Q&A implementation guidance\n\nRender the questions and answers as visible semantic HTML. Review legacy FAQPage markup only as an implementation detail; do not recommend it for Google rich-result eligibility or claim unproven AI-citation gains.\n"],
  [/FAQPage where Q&A exists/g, "visible question-led content where it helps users"],
  [/FAQPage schema where Q&A exists/g, "visible question-led content where it helps users"],
  [/FAQPage schema specifications/g, "visible Q&A structure and applicable WebPage or Service schema specifications"],
  [/FAQPage schema-marked questions/g, "question-led sections in visible HTML"],
  [/FAQPage schema and question-led headings/g, "question-led headings and accessible Q&A content"],
  [/FAQPage, Product/g, "WebPage, Product"],
  [/FAQPage, AutoDealer/g, "WebPage, AutoDealer"],
  [/FAQPage validation/g, "existing FAQPage review (informational only)"],
  [/FAQPage schema\. Both as a ranking signal and as an AEO extraction signal\./g, "accessible Q&A content. Do not present FAQPage as a Google ranking, rich-result, or confirmed AI-citation signal."],
  [/It produces FAQPage schema, which AI engines prefer\./g, "It produces direct, accessible Q&A blocks. Do not claim that FAQPage markup itself improves AI citations."],
  [/Q&A without schema\. Questions and answers in HTML without FAQPage schema\. Half the AEO benefit lost\. Fix: schema spec includes FAQPage\./g, "Q&A buried or unclear. Fix: use visible question-led headings and concise, self-contained answers; apply only schema that accurately represents the page."],
  [/FAQPage with all Q&A\. Optionally HowTo if the page walks through a process\./g, "WebPage with visible Q&A. Do not recommend HowTo or FAQPage solely for Google rich-result gains."],
  [/Service \+ FAQPage/g, "Service + WebPage"],
  [/Article \+ FAQPage/g, "Article + WebPage"],
  [/\+ FAQPage/g, "+ WebPage"],
  [/Spanish-language Vehicle, AutoDealer, and FAQPage schema\. Meta titles, descriptions, and OG tags\./g, "Spanish-language Vehicle, AutoDealer or LocalBusiness, and WebPage schema that matches the visible content. Meta titles, descriptions, and OG tags."],
  [/FAQPage schema in Spanish where Spanish FAQs exist\./g, "Visible, accessible Spanish Q&A where it helps users; use only schema that accurately represents the page type."],
  [/schema markup, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, AutoDealer schema, Vehicle schema, LocalBusiness schema, FAQPage schema, SRP/g, "schema markup, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, AutoDealer schema, Vehicle schema, LocalBusiness schema, SRP"],
  [/technical terms \(AEO, schema, FAQPage, etc\.\)/g, "technical terms (AEO, structured data, schema types, etc.)"],
  [/\*\*FAQPage schema\.\*\* On any page with real Q&A\. Both as a ranking signal and as an AEO extraction signal\./g, "**Visible Q&A content.** Use real customer questions, concise answer-first copy, and semantic HTML. Do not claim FAQPage is a ranking or confirmed AI-extraction signal."],
  [/\*\*3\.4 FAQPage schema on Q&A pages\.\*\* Service page, finance page, and any buying-help page that contains real Q&A should have FAQPage schema with question and answer pairs\. Random-check three such pages\./g, "**3.4 Visible Q&A and page-appropriate schema.** Random-check the service, finance, and buying-help pages. Score whether real questions have concise visible answers and whether structured data accurately matches the page type. Do not award or deduct points merely for FAQPage markup."],
  [/### 3\.4 FAQPage schema on Q&A pages[\s\S]*?\n---\n/g, "### 3.4 Visible Q&A and page-appropriate schema\n\n**Check.** Sample the service, finance, and buying-help pages. Confirm that useful questions and concise answers are visible in semantic HTML, and validate that any structured data accurately matches the page type. Treat existing FAQPage markup as informational only.\n\n**Pass.** Useful Q&A is visible, accessible, and paired with accurate page-type schema.\n\n**Partial.** Q&A exists but is buried, incomplete, or paired with inaccurate structured data.\n\n**Fail.** Sampled pages do not answer common customer questions clearly, or their structured data misrepresents the visible content.\n\n---\n"],
  [/- Buying help \/ FAQ: FAQPage/g, "- Buying help / FAQ: WebPage with visible, accessible Q&A"],
  [/\*\*Q&A without schema\.\*\* Questions and answers in HTML without FAQPage schema\. Half the AEO benefit lost\. Fix: schema spec includes FAQPage\./g, "**Buried or unclear Q&A.** Questions and answers are difficult to scan or extract. Fix: use question-led headings, concise self-contained answers, and only schema that accurately represents the page."],
  [/- Structured for FAQPage schema/g, "- Structured as visible, accessible question-and-answer HTML"],
];

function firstSentence(text) {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return (match ? match[1] : text).trim();
}

function extractFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error("Missing frontmatter");
  const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = match[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!name || !description) throw new Error("Missing name or description");
  return { block: match[0], name, description };
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

fs.mkdirSync(PLUGINS, { recursive: true });

const marketplace = {
  name: "dealer-ai-skills",
  interface: { displayName: "Dealer AI Skills" },
  plugins: [],
};

const inventory = [];

for (const [sourceName, [displayName, shortDescription, prompt]] of Object.entries(config)) {
  const sourceDir = path.join(SOURCE, sourceName);
  if (!fs.existsSync(sourceDir)) throw new Error(`Missing source skill: ${sourceName}`);

  const pluginName = pluginIdOverrides[sourceName] ?? sourceName;
  const pluginDir = path.join(PLUGINS, pluginName);
  fs.rmSync(pluginDir, { recursive: true, force: true });
  const skillDir = path.join(pluginDir, "skills", sourceName);
  fs.mkdirSync(path.dirname(skillDir), { recursive: true });
  fs.cpSync(sourceDir, skillDir, { recursive: true });
  fs.rmSync(path.join(skillDir, ".claude-plugin"), { recursive: true, force: true });

  for (const file of fs.readdirSync(skillDir).filter((name) => name.endsWith(".md"))) {
    const filePath = path.join(skillDir, file);
    let contents = fs.readFileSync(filePath, "utf8");
    for (const [pattern, replacement] of compatibilityReplacements) {
      contents = contents.replace(pattern, replacement);
    }
    fs.writeFileSync(filePath, contents);
  }

  // These standalone plugins must not depend on another plugin being installed.
  if (["dealer-email-flows", "dealer-new-customer-onboarding"].includes(sourceName)) {
    const complianceSource = path.join(
      SOURCE,
      "dealer-equity-mining-campaign-builder",
      "COMPLIANCE.md",
    );
    fs.copyFileSync(complianceSource, path.join(skillDir, "COMPLIANCE.md"));
    for (const file of fs.readdirSync(skillDir).filter((name) => name.endsWith(".md"))) {
      const filePath = path.join(skillDir, file);
      const contents = fs.readFileSync(filePath, "utf8");
      fs.writeFileSync(
        filePath,
        contents.replaceAll("dealer-equity-mining-campaign-builder/COMPLIANCE.md", "COMPLIANCE.md"),
      );
    }
  }

  const skillFile = path.join(skillDir, "SKILL.md");
  const original = fs.readFileSync(skillFile, "utf8");
  const fm = extractFrontmatter(original);
  const compactDescription = `${firstSentence(fm.description)} Use when a dealership, dealer group, or automotive agency needs to ${shortDescription.toLowerCase()}.`;
  if (compactDescription.length > 1024) throw new Error(`Description still too long: ${sourceName}`);
  const rewritten = original.replace(
    fm.block,
    `---\nname: ${sourceName}\ndescription: ${compactDescription}\n---\n`,
  );
  fs.writeFileSync(skillFile, rewritten);

  const skillUiDescription = shortDescription.length >= 25
    ? shortDescription
    : `${shortDescription} for dealers`;
  const agentDir = path.join(skillDir, "agents");
  fs.mkdirSync(agentDir, { recursive: true });
  fs.writeFileSync(
    path.join(agentDir, "openai.yaml"),
    `interface:\n  display_name: "${displayName}"\n  short_description: "${skillUiDescription}"\n  default_prompt: "Use $${sourceName} to ${prompt[0].toLowerCase()}${prompt.slice(1)}"\n`,
  );

  const assetsDir = path.join(pluginDir, "assets");
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.writeFileSync(path.join(assetsDir, "icon.svg"), icon);

  const longDescription = `${compactDescription} Works in ChatGPT and Codex and includes a complete dealership workflow curated by Dealer Growth Hackers, with supporting references.`;
  const pluginBase = {
    name: pluginName,
    version: "1.2.0",
    description: firstSentence(fm.description),
    author: {
      name: "Dealer Growth Hackers",
      url: "https://dealergrowthhackers.com/",
    },
    homepage: `https://dealeraiplugins.com/plugins/${pluginName}/`,
    repository: "https://github.com/arielcoro/dealer-ai-plugins",
    license: "MIT",
    keywords: [
      "ChatGPT for car dealers",
      "Codex for car dealers",
      "car dealership",
      "automotive retail",
      "dealer AI",
      displayName.toLowerCase(),
      shortDescription.toLowerCase(),
      sourceName,
    ],
  };
  const interfaceData = {
    displayName,
    shortDescription,
    longDescription,
    developerName: "Dealer Growth Hackers",
    category: "Business & Operations",
    capabilities: [shortDescription],
    websiteURL: `https://dealeraiplugins.com/plugins/${pluginName}/`,
    supportURL: "https://dealeraiplugins.com/support/",
    privacyPolicyURL: "https://dealeraiplugins.com/privacy/",
    termsOfServiceURL: "https://dealeraiplugins.com/terms/",
    defaultPrompt: [prompt],
    brandColor: "#0F62FE",
    brandColorDark: "#78A9FF",
    composerIcon: "./assets/icon.svg",
    logo: "./assets/icon.svg",
  };

  writeJson(path.join(pluginDir, "plugin.json"), {
    $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
    ...pluginBase,
    extensions: {
      "com.openai": {
        interface: interfaceData,
        publication: {
          release_notes: `Version 1.2 identifies Dealer Growth Hackers as the publisher and expands discovery metadata for ChatGPT and Codex.`,
        },
      },
    },
  });

  writeJson(path.join(pluginDir, ".codex-plugin", "plugin.json"), {
    ...pluginBase,
    skills: "./skills/",
    interface: interfaceData,
    extensions: {
      "com.openai": {
        publication: {
          release_notes: `Version 1.1 aligns ${displayName} with current OpenAI plugin packaging, provider-neutral tooling, and current SEO guidance.`,
        },
      },
    },
  });

  marketplace.plugins.push({
    name: pluginName,
    source: { source: "local", path: `./plugins/${pluginName}` },
    policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
    category: "Business & Operations",
  });
  inventory.push({ pluginName, sourceName, displayName, prompt });
}

const localInventoryFile = path.join(ROOT, "locally-authored-plugins.json");
if (fs.existsSync(localInventoryFile)) {
  const localInventory = JSON.parse(fs.readFileSync(localInventoryFile, "utf8"));
  for (const item of localInventory) {
    const pluginDir = path.join(PLUGINS, item.pluginName);
    if (!fs.existsSync(pluginDir)) throw new Error(`Missing locally authored plugin: ${item.pluginName}`);
    marketplace.plugins.push({
      name: item.pluginName,
      source: { source: "local", path: `./plugins/${item.pluginName}` },
      policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
      category: "Business & Operations",
    });
    inventory.push(item);
  }
}

try {
  writeJson(path.join(ROOT, ".agents", "plugins", "marketplace.json"), marketplace);
} catch (error) {
  if (error?.code !== "EPERM" && error?.code !== "EACCES") throw error;
  console.warn("Marketplace catalog is read-only; preserved the existing .agents/plugins/marketplace.json.");
}
writeJson(path.join(ROOT, "plugin-inventory.json"), inventory);

console.log(`Built ${inventory.length} plugins.`);
