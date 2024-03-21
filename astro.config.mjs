import { defineConfig } from 'astro/config';
import Compress from "astro-compress";
import preact from "@astrojs/preact";
import remarkToc from 'remark-toc';
import rehypePrettyCode from "rehype-pretty-code";
import sitemap from '@astrojs/sitemap';
import mdx from "@astrojs/mdx";


const prettyCodeOptions = {
  theme: "github-light",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " "
      }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {}
};


// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321
  },
  site: 'https://vtubers.wiki',

  markdown: {
    remarkPlugins: [remarkToc],
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    drafts: false,
    shikiConfig: {
      langs: ["javascript", "typescript", "css", "html", "shell", "json", "yaml", "bash", "scss", "java", "python", "ruby", "php", "c", "c++", "go", "rust"]
    }
  },

  integrations: [Compress({
    CSS: true,
    HTML: true,
    Image: true,
    JavaScript: true,
    SVG: true
  }), preact(), sitemap({
    filter: page => !page.includes('/interface/')
  }), mdx()],

});
