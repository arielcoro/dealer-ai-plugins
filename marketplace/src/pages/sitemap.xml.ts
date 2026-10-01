import plugins from "../data/plugins.json";

export const prerender = true;

export function GET() {
  const base = "https://dealeraiplugins.com";
  const reviewed = "2026-10-01";
  const pages = ["/", "/about/", "/how-it-works/", "/plans/", "/support/", "/privacy/", "/terms/"];
  const urls = [
    ...pages.map((pathname) => ({ pathname, priority: pathname === "/" ? "1.0" : "0.5" })),
    ...plugins.map((plugin) => ({ pathname: `/plugins/${plugin.slug}/`, priority: "0.8" })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ pathname, priority }) => `  <url><loc>${base}${pathname}</loc><lastmod>${reviewed}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
