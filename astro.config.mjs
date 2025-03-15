// @ts-check

import { defineConfig } from "astro/config";
import { shield } from "@kindspells/astro-shield";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

let assetsCount = 0;
let entryCount = 0;
let iconCount = 0;
const fileNameMap = new Map();

// https://astro.build/config
export default defineConfig({
  experimental: {
    svg: {
      mode: "sprite",
    },
  },

  devToolbar: {
    enabled: false,
  },

  i18n: {
    locales: [
      { path: "en", codes: ["en", "en-US"] },
      { path: "zh", codes: ["zh", "zh-Hant", "zh-Hant-TW"] },
    ],
    defaultLocale: "en",
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names[0];
            const isSVG = name.endsWith(".svg");
            let index = fileNameMap.get(name);
            if (!index) {
              fileNameMap.set(name, isSVG ? iconCount : assetsCount);
              index = isSVG ? iconCount : assetsCount;
              isSVG ? (iconCount += 1) : (assetsCount += 1);
            }
            return `_astro/${isSVG ? "icon" : "asset"}-${index}-[hash][extname]`;
          },
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name;
            let index = fileNameMap.get(name);
            if (!index) {
              fileNameMap.set(name, entryCount);
              index = entryCount;
              entryCount += 1;
            }
            return `_astro/entry-${index}.js`;
          },
          chunkFileNames: "_astro/[name]-[hash].js",
          manualChunks: (id) => {
            return "chunk-0";
          },
        },
      },
    },
  },

  integrations: [react(), shield({})],
});
