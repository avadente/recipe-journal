// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Pages are pre-built as static HTML; only /api/ask runs on the server (Vercel function).
export default defineConfig({
  adapter: vercel(),
});
