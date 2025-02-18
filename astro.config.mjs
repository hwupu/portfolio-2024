// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { shield } from '@kindspells/astro-shield'

import { resolve } from 'node:path'
const rootDir = new URL('.', import.meta.url).pathname
const modulePath = resolve(rootDir, 'src', 'generated', 'sriHashes.mjs')

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    shield({
      sri: { hashesModule: modulePath },
      securityHeaders:{
        contentSecurityPolicy:{
          cspDirectives: {
            'default-src': "'self'",
          }
        }
      }
    })
  ]
});
