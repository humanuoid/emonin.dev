// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://emonin.dev',
  server: {
    // Bind to localhost only by default. Pass --host on the CLI when the
    // browser panel needs to reach the dev server from another device:
    // npm run dev -- --host
    port: 4321,
  },
});
