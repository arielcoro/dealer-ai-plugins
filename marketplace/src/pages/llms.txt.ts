import plugins from "../data/plugins.json";

export const prerender = true;

export function GET() {
  const catalog = plugins.map((plugin) => `- [${plugin.name}](https://dealeraiplugins.com/plugins/${plugin.slug}/): ${plugin.shortDescription}`).join("\n");
  const body = `# Dealer AI Plugins\n\n> Open-source, skills-only ChatGPT and Codex plugins for car dealership operations, marketing, measurement, SEO, AI visibility, and customer lifecycle workflows.\n\nDealer Growth Hackers publishes 26 consolidated Dealer AI Plugin packages for ChatGPT and Codex. Every package includes readable workflow instructions and supporting references. The collection is vendor-neutral and MIT licensed.\n\n## Catalog\n\n${catalog}\n\n## Project information\n\n- [Publisher: Dealer Growth Hackers](https://dealergrowthhackers.com/)\n- [About](https://dealeraiplugins.com/about/)\n- [How Dealer AI Plugins work](https://dealeraiplugins.com/how-it-works/): Plain-English installation, usage, privacy, safety, and FAQ guide for ChatGPT and Codex plugins.\n- [Implementation plans](https://dealeraiplugins.com/plans/): Quarterly and discounted annual rollout programs for dealerships, dealer groups, and agencies. The public plugins remain free.\n- [Support](https://dealeraiplugins.com/support/)\n- [Privacy](https://dealeraiplugins.com/privacy/)\n- [Terms](https://dealeraiplugins.com/terms/)\n- [Source repository](https://github.com/arielcoro/dealer-ai-plugins)\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
