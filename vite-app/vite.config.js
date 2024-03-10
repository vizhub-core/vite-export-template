import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';

export default defineConfig({
  plugins: [dsv()],
  optimizeDeps: {
    exclude: ['@curran/parallel-coordinates-brushing-prototype']
  }
});
