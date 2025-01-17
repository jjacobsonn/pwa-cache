import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    watch: {
      usePolling: true, // Ensures file changes are detected even on certain OS environments
    },
    strictPort: true, // Ensures Vite doesn't switch ports automatically
    hmr: {
      overlay: true, // Shows a UI overlay if an error occurs instead of breaking silently
    }
  },

  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js', // Cache busting
        chunkFileNames: 'assets/[name]-[hash].js', // Cache busting
        assetFileNames: 'assets/[name]-[hash][extname]', // Cache busting
      }
    }
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});