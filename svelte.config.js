import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocessors for Svelte files (e.g., TypeScript, SCSS, etc.)
	preprocess: vitePreprocess(),

	kit: {
		// Adapter configuration for Vercel deployment
		adapter: adapter(),

		// Additional configurations (optional)
		alias: {
			$lib: './src/lib',
			$components: './src/components'
		}
	}
};

export default config;