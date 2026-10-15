// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Pages are pre-built as static HTML; only /api/ask runs on the server (Vercel function).
export default defineConfig({
  adapter: vercel(),
  vite: {
    server: {
      // The project lives on the Windows drive (/mnt/c) but runs in WSL, where file-change
      // events don't arrive. Polling makes `npm run dev` pick up edits. Local dev only.
      watch: { usePolling: true, interval: 300 },
    },
  },
});
