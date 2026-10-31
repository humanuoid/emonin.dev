// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    // Listen on all network interfaces so the OpenChamber browser panel can reach the dev server
    host: true,
    port: 4321,
  },
});
