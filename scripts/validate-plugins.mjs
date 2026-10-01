import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pluginsRoot = path.join(root, "plugins");
const errors = [];
const warnings = [];
const results = [];

function fail(plugin, message) { errors.push(`${plugin}: ${message}`); }
function warn(plugin, message) { warnings.push(`${plugin}: ${message}`); }
function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }

for (const pluginName of fs.readdirSync(pluginsRoot).sort()) {
  const pluginRoot = path.join(pluginsRoot, pluginName);
  const manifest = readJson(path.join(pluginRoot, "plugin.json"));
  const codex = readJson(path.join(pluginRoot, ".codex-plugin", "plugin.json"));
  const ui = manifest.extensions?.["com.openai"]?.interface;
  const skillNames = fs.readdirSync(path.join(pluginRoot, "skills"));

  if (manifest.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") fail(pluginName, "portable schema is missing or outdated");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name) || manifest.name.length > 64) fail(pluginName, "invalid plugin name");
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) fail(pluginName, "version is not semantic");
  if (manifest.author?.name !== "Dealer Growth Hackers" || manifest.author?.url !== "https://dealergrowthhackers.com/") fail(pluginName, "publisher identity must be Dealer Growth Hackers");
  if (!Array.isArray(manifest.keywords) || !manifest.keywords.some((keyword) => /ChatGPT/i.test(keyword)) || !manifest.keywords.some((keyword) => /Codex/i.test(keyword))) fail(pluginName, "discovery keywords must cover ChatGPT and Codex");
  if (!ui) fail(pluginName, "missing extensions.com.openai.interface");
  if (ui?.displayName?.length > 30) fail(pluginName, "displayName exceeds 30 characters");
  if (!ui?.shortDescription || ui.shortDescription.length > 30) fail(pluginName, "shortDescription must be 1-30 characters");
  if (!ui?.longDescription || ui.longDescription.length > 4000) fail(pluginName, "longDescription must be 1-4000 characters");
  if (ui?.developerName !== "Dealer Growth Hackers") fail(pluginName, "developerName must match the verified publisher identity");
  if (!Array.isArray(ui?.capabilities) || ui.capabilities.length > 20) fail(pluginName, "capabilities are missing or invalid");
  if (!Array.isArray(ui?.defaultPrompt) || ui.defaultPrompt.length < 1 || ui.defaultPrompt.length > 3 || ui.defaultPrompt.some((prompt) => prompt.length > 128)) fail(pluginName, "defaultPrompt must contain 1-3 prompts of at most 128 characters");
  for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    if (!ui?.[field]?.startsWith("https://")) fail(pluginName, `${field} must be an HTTPS URL`);
  }
  for (const field of ["composerIcon", "logo"]) {
    const relative = ui?.[field];
    if (!relative?.startsWith("./") || !fs.existsSync(path.join(pluginRoot, relative))) fail(pluginName, `${field} is missing or invalid`);
  }
  if (codex.skills !== "./skills/") fail(pluginName, "Codex manifest must declare ./skills/");
  if (skillNames.length !== 1) fail(pluginName, `expected one skill, found ${skillNames.length}`);

  const skillName = skillNames[0];
  const skillRoot = path.join(pluginRoot, "skills", skillName);
  const skillFile = path.join(skillRoot, "SKILL.md");
  const skillText = fs.readFileSync(skillFile, "utf8");
  const frontmatter = skillText.match(/^---\n([\s\S]*?)\n---\n/);
  const fmName = frontmatter?.[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const fmDescription = frontmatter?.[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (fmName !== skillName) fail(pluginName, "skill folder and frontmatter name differ");
  if (!fmDescription || fmDescription.length > 1024) fail(pluginName, "skill description is missing or exceeds 1024 characters");
  if (`${pluginName}:${skillName}`.length > 64) fail(pluginName, "combined plugin and skill identity exceeds 64 characters");
  if (fs.existsSync(path.join(skillRoot, ".claude-plugin"))) fail(pluginName, "Claude-only manifest is bundled inside the skill");
  if (/\b(WebFetch|WebSearch|Chrome MCP|Claude in Chrome)\b/.test(skillText)) fail(pluginName, "provider-specific legacy tool name remains in SKILL.md");
  if (/FAQPage.*(?:ranking signal|AI engines prefer|AEO benefit)/i.test(skillText)) fail(pluginName, "unsupported FAQPage benefit claim remains");

  const agentFile = path.join(skillRoot, "agents", "openai.yaml");
  if (!fs.existsSync(agentFile)) fail(pluginName, "missing agents/openai.yaml");
  const referenceRoot = path.join(skillRoot, "references");
  const rootReferences = fs.readdirSync(skillRoot).filter((file) => file.endsWith(".md") && file !== "SKILL.md").length;
  const nestedReferences = fs.existsSync(referenceRoot)
    ? fs.readdirSync(referenceRoot).filter((file) => file.endsWith(".md")).length
    : 0;
  const references = rootReferences + nestedReferences;
  if (references === 0) warn(pluginName, "skill has no supporting Markdown reference files");
  results.push({ plugin: pluginName, skill: skillName, version: manifest.version, references, status: "reviewed" });
}

console.log(JSON.stringify({ reviewed: results.length, errors, warnings, plugins: results }, null, 2));
if (errors.length) process.exitCode = 1;
