import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pluginsRoot = path.join(root, "plugins");
const expectedRepository = "https://github.com/arielcoro/dealer-ai-plugins";
const errors = [];

function fail(plugin, message) {
  errors.push(`${plugin}: ${message}`);
}

for (const plugin of fs.readdirSync(pluginsRoot).sort()) {
  const pluginRoot = path.join(pluginsRoot, plugin);
  if (!fs.statSync(pluginRoot).isDirectory()) continue;

  const manifestPath = path.join(pluginRoot, "plugin.json");
  if (!fs.existsSync(manifestPath)) {
    fail(plugin, "missing plugin.json");
    continue;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(plugin, `invalid plugin.json: ${error.message}`);
    continue;
  }

  const ui = manifest.extensions?.["com.openai"]?.interface;
  if (!ui) fail(plugin, "missing extensions.com.openai.interface");
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(manifest.name ?? "")) fail(plugin, "invalid package name");
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version ?? "")) fail(plugin, "version is not semantic");
  if (manifest.repository !== expectedRepository) fail(plugin, "repository URL is not the comprehensive repository");
  if ((ui?.displayName ?? "").length > 30 || !(ui?.displayName ?? "")) fail(plugin, "displayName must be 1-30 characters");
  if ((ui?.shortDescription ?? "").length > 30 || !(ui?.shortDescription ?? "")) fail(plugin, "shortDescription must be 1-30 characters");
  if ((ui?.longDescription ?? "").length > 4000 || !(ui?.longDescription ?? "")) fail(plugin, "longDescription must be 1-4000 characters");
  if ((ui?.developerName ?? "").length > 80 || !(ui?.developerName ?? "")) fail(plugin, "developerName must be 1-80 characters");
  if (!ui?.category) fail(plugin, "missing category");
  if (!Array.isArray(ui?.capabilities) || ui.capabilities.length > 20) fail(plugin, "capabilities must contain at most 20 entries");
  if (!Array.isArray(ui?.defaultPrompt) || ui.defaultPrompt.length > 3) fail(plugin, "defaultPrompt must contain at most 3 prompts");
  if (Object.hasOwn(ui ?? {}, "screenshots")) fail(plugin, "skills-only packages must not declare screenshots");

  for (const key of ["logo", "composerIcon"]) {
    const relative = ui?.[key];
    if (!relative?.startsWith("./") || !fs.existsSync(path.join(pluginRoot, relative))) fail(plugin, `${key} is missing or invalid`);
  }

  for (const excluded of [".app.json", ".mcp.json", "mcp.json"]) {
    if (fs.existsSync(path.join(pluginRoot, excluded))) fail(plugin, `skills-only package contains ${excluded}`);
  }

  const skillsRoot = path.join(pluginRoot, "skills");
  const skills = fs.existsSync(skillsRoot)
    ? fs.readdirSync(skillsRoot).filter((name) => fs.existsSync(path.join(skillsRoot, name, "SKILL.md")))
    : [];
  if (skills.length === 0) fail(plugin, "no valid skills/<name>/SKILL.md found");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OpenAI submission readiness checks passed for ${fs.readdirSync(pluginsRoot).length} plugins.`);
