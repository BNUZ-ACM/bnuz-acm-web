import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from 'rehype-external-links';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: "https://hexw.zeabur.app",
  outDir: './docs',
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), sitemap()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "catppuccin-mocha",
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: '🔗' },
          target: '_blank'
        }
      ],
    ]
  }
});