import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/school-landing/',
  server: {
    watch: {
      ignored: ['**/ψ/**', '**/.agents/**']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        export: resolve(__dirname, 'student-export.html')
      }
    }
  }
});
