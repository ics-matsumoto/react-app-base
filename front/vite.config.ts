/* eslint-disable @typescript-eslint/naming-convention */
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import { jsx } from "@emotion/react"`,
  },
  root: 'src/',
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/'),
    },
  },
});
