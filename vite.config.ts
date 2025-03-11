import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Validators',
      // the proper extensions will be added
      fileName: 'validators',
      formats: ['es'],
    },
  },
  resolve: { alias: { src: resolve('src/') } },
  plugins: [dts()],
  test: {
    setupFiles: ['setupTests.ts'],
    coverage: {
      exclude: ['*.config.*', '*.d.ts', 'src/main.ts', 'dist', 'node_modules'],
    },
  },
});
