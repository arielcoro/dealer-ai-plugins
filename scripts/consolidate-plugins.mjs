import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
const aliases = { 'dealer-aeo-audit': 'dealer-shopping-readiness', 'dealer-ai-sentiment-monitor': 'dealer-ai-visibility', 'dots-assistant': 'dealer-plugin-router', 'muse-meta-assistant': 'dealer-plugin-router' };
const archive = path.join(root, 'archive', 'pre-consolidation');
fs.mkdirSync(archive, { recursive: true });
for (const id of Object.keys(aliases)) {
  const source = path.join(root, 'plugins', id);
  if (fs.existsSync(source) && !fs.existsSync(path.join(archive, id))) fs.cpSync(source, path.join(archive, id), { recursive: true });
}
function append(file, text) {
  const existing = fs.readFileSync(file, 'utf8');
  if (!existing.includes('## Consolidated workflow contract')) fs.writeFileSync(file, existing + '\n## Consolidated workflow contract\n\n' + text + '\n');
}
for (const [old, target] of Object.entries(aliases)) {
  if (old === 'dealer-aeo-audit') continue;
  fs.cpSync(path.join(archive, old, 'skills'), path.join(root, 'plugins', target, 'skills'), { recursive: true });
}
const shared = 'Reuse supplied evidence only when its URLs, dates, scope, and collection conditions match this task. Collect store facts, representative pages, and AI answers once; give each record an evidence ID, date, source, observation, confidence, and limitation. Do not run duplicate research merely because another module needs the same evidence. Unknown is not a confirmed failure. Never fabricate platform access, answers, citations, or causal conclusions.';
append('plugins/dealer-ai-visibility/skills/dealer-ai-visibility/SKILL.md', shared + '\n\nThis package includes dealer-ai-sentiment-monitor. Use visibility for mentions, source citations and competitor share; use sentiment for tone, unsupported claims and factual accuracy. For a combined assessment, use one agreed prompt bank and response log, including repeat observations when needed by the sentiment rubric. Keep the two metrics separate; do not count responses twice or average unlike scores.');
append('plugins/dealer-ai-visibility/skills/dealer-ai-sentiment-monitor/SKILL.md', shared + '\n\nThis is the sentiment module inside Dealer AI Visibility, not a separate installation. Reuse the visibility response log where suitable. Request additional questions or repetitions only for genuine coverage gaps. Report tone and accuracy separately from citation share.');
append('plugins/dealer-shopping-readiness/skills/dealer-ai-shopping-readiness-audit/SKILL.md', shared + '\n\nThis workflow replaces the standalone Dealer AEO Audit. Website AI Readiness is the general public-site foundation; do not run it again when equivalent evidence is already available. Add dealership-specific inventory, offer, reputation, location and buyer-journey checks. Verify business identity against OEM/location listings and reputation sources; identify useful buying, financing and service answers and third-party citation gaps using observed evidence. Include local profile inconsistencies in the remediation backlog. These checks extend the existing categories rather than creating extra points. Do not import the retired AEO score bands, treat unknowns as failures, require llms.txt, conflate training crawlers with search access, or infer actual citation presence from a technical score.');
append('plugins/website-ai-readiness/skills/website-ai-readiness/SKILL.md', shared + '\n\nFor a dealership shopping assessment, use Dealer Shopping Readiness as the primary workflow and pass this foundation evidence to it; do not issue competing readiness grades for the same engagement. Keep the general website assessment standalone for non-dealer sites or explicitly requested website-only work.');
for (const skill of ['dealer-plugin-router', 'dots-assistant', 'muse-meta-assistant']) append(`plugins/dealer-plugin-router/skills/${skill}/SKILL.md`, shared + '\n\nRouter, Dots and Muse are included in Dealer AI Workflow Coordinator. Use Router only to select the smallest workflow; Dots owns interactive execution and the session brief; Muse owns multi-workstream dependencies and final review. Do not repeat intake or routing between modules. These are instruction workflows, not independently connected external assistants.');

const updates = {
  'dealer-ai-visibility': ['Dealer AI Visibility', 'Track visibility and sentiment', 'Measure dealership AI search visibility, citations, sentiment, factual accuracy, and competitor differences using a shared evidence log. Includes separate visibility and sentiment workflows; no guaranteed recommendations or traffic.'],
  'dealer-shopping-readiness': ['Dealer AI Shopping Readiness', 'Audit AI shopping readiness', 'Audit dealership website AI readiness, inventory accuracy, pricing clarity, business identity, reputation evidence, and shopper handoffs. Consolidates AEO and shopping-readiness checks into one evidence-backed assessment and prioritized fix plan.'],
  'dealer-plugin-router': ['Dealer AI Workflow Coordinator', 'Coordinate dealer AI workflows', 'Coordinate dealership work with three included workflows: Router selects specialists, Dots guides interactive work, and Muse plans and reviews multi-workstream tasks. Preserves user control, explicit approval boundaries, and evidence-backed handoffs.'],
  'dealer-ai-readiness-audit': ['Dealer AI Operations Readiness', 'Assess AI adoption readiness', 'Assess dealership operational AI readiness across systems, people, processes, data, and governance. This is an organizational adoption assessment, not a website or AI-shopping audit.']
};
for (const [id, [name, short, description]] of Object.entries(updates)) {
  for (const relative of ['plugin.json', '.codex-plugin/plugin.json']) {
    const file = path.join('plugins', id, relative);
    const manifest = read(file);
    const ui = manifest.interface ?? manifest.extensions['com.openai'].interface;
    manifest.version = '2.0.0'; manifest.description = description;
    manifest.keywords = ['car dealership', 'automotive retail', name.toLowerCase(), short.toLowerCase()];
    ui.displayName = name; ui.shortDescription = short; ui.longDescription = description + ' Published by Dealer Growth Hackers.';
    ui.capabilities = [short]; ui.defaultPrompt = [`Use ${name} for my dealership.`];
    manifest.extensions['com.openai'].publication.release_notes = 'Version 2.0 consolidates overlapping workflows with shared evidence and clear specialist boundaries.';
    write(file, manifest);
  }
}
for (const id of Object.keys(aliases)) {
  const source = path.join(root, 'plugins', id);
  if (fs.existsSync(source)) fs.renameSync(source, path.join(archive, id + '-retired'));
}
for (const file of ['plugin-inventory.json', 'locally-authored-plugins.json']) {
  const inventory = read(file).filter(item => !aliases[item.pluginName]);
  for (const item of inventory) if (updates[item.pluginName]) item.displayName = updates[item.pluginName][0];
  write(file, inventory);
}
const inventory = read('plugin-inventory.json');
for (const item of inventory) {
  const id = item.pluginName;
  const portable = path.join(root, 'dist', 'openai-submissions', id + '.zip');
  const codex = path.join(root, 'dist', id + '.zip');
  for (const file of [portable, codex]) if (fs.existsSync(file)) fs.unlinkSync(file);
  execFileSync('zip', ['-qr', portable, 'plugin.json', 'skills', 'assets'], { cwd: path.join(root, 'plugins', id) });
  execFileSync('zip', ['-qr', codex, 'plugin.json', '.codex-plugin', 'skills', 'assets'], { cwd: path.join(root, 'plugins', id) });
}
// Keep retired downloads usable, but deliver the replacement package.
for (const [old, target] of Object.entries(aliases)) {
  for (const dir of ['dist', 'dist/openai-submissions', 'marketplace/public/downloads']) fs.copyFileSync(path.join(root, dir === 'marketplace/public/downloads' ? 'dist' : dir, target + '.zip'), path.join(root, dir, old + '.zip'));
}
write('plugin-consolidation.json', { packages: inventory.length, aliases, retainedNames: updates });
const catalogFile = '.agents/plugins/marketplace.json';
if (fs.existsSync(catalogFile)) {
  const catalog = read(catalogFile); catalog.plugins = catalog.plugins.filter(item => !aliases[item.name]);
  try { write(catalogFile, catalog); } catch (error) { console.warn('Catalog update requires filesystem approval:', error.code); }
}
console.log(`Consolidated to ${inventory.length} packages. Original sources preserved in ${archive}.`);
