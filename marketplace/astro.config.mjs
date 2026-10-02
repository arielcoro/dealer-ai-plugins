import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dealeraiplugins.com",
  output: "static",
  redirects: {
    '/plugins/dealer-aeo-audit/': '/plugins/dealer-shopping-readiness/',
    '/plugins/dealer-ai-sentiment-monitor/': '/plugins/dealer-ai-visibility/',
    '/plugins/dots-assistant/': '/plugins/dealer-plugin-router/',
    '/plugins/muse-meta-assistant/': '/plugins/dealer-plugin-router/',
  },
  build: {
    format: "directory",
  },
});
