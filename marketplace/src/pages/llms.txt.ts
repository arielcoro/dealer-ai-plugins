import plugins from "../data/plugins.json";

export const prerender = true;

export function GET() {
  const catalog = plugins.map((plugin) => `- [${plugin.name}](https://dealeraiplugins.com/plugins/${plugin.slug}/): ${plugin.shortDescription}`).join("\n");
  const body = `# Dealer AI Plugins\n\n> Open-source, skills-only ChatGPT and Codex plugins for car dealership operations, marketing, measurement, SEO, AI visibility, and customer lifecycle workflows.\n\nDealer Growth Hackers publishes 23 standalone Dealer AI Plugin packages for ChatGPT and Codex. Every package includes readable workflow instructions and supporting references. The collection is vendor-neutral and MIT licensed.\n\n## Catalog\n\n${catalog}\n\n## Project information\n\n- [Publisher: Dealer Growth Hackers](https://dealergrowthhackers.com/)\n- [About](https://dealeraiplugins.com/about/)\n- [Support](https://dealeraiplugins.com/support/)\n- [Privacy](https://dealeraiplugins.com/privacy/)\n- [Terms](https://dealeraiplugins.com/terms/)\n- [Source repository](https://github.com/arielcoro/dealer-ai-skills)\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
