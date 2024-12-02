import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    crx({ manifest }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['chromium-bidi/lib/cjs/bidiMapper/BidiMapper.js'],
      plugins: [
        nodeResolve({
          browser: true,
          resolveOnly: ['puppeteer-core'],
        }),
      ],    },
  },
});
