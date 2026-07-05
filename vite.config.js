import { defineConfig } from 'vite';

export default defineConfig({
  base: '/school-landing/',
  server: {
    watch: {
      ignored: ['**/ψ/**', '**/.agents/**']
    }
  }
});
