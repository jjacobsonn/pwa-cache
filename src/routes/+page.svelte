<script>
	import { darkMode } from '../lib/stores';
  
	let isDarkMode = false;
  
	// Subscribe to the darkMode store
	$: darkMode.subscribe((value) => {
	  isDarkMode = value;
	});
  
	let message = 'Welcome to PWA Cache!';
  </script>
  
  <main
	class="flex h-screen flex-col items-center justify-center"
	class:dark-mode={isDarkMode}
  >
	<h1 class="mb-4 text-4xl font-bold">{message}</h1>
	<p class="mb-8 text-lg">This is a simple PWA built with SvelteKit and Workbox.</p>
	<a href="/posts" class="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
	  Check out the Posts Page
	</a>
  </main>
  
  <style>
	/* Default Light Mode Styles */
	main {
	  background: linear-gradient(to bottom right, #e0f2fe, #f3f4f6);
	  color: #1f2937;
	}
  
	h1 {
	  color: #4f46e5;
	}
  
	a {
	  color: white;
	  font-weight: bold;
	  text-decoration: none;
	  margin-top: 1rem;
	  display: inline-block;
	}
  
	a:hover {
	  text-decoration: underline;
	}
  
	/* Dark Mode Styles */
	.dark-mode {
	  background: linear-gradient(to bottom right, #1f2937, #111827);
	  color: #f3f4f6;
	}
  
	.dark-mode h1 {
	  color: #93c5fd;
	}
  
	.dark-mode a {
	  background-color: #2563eb;
	  color: white;
	}
  
	.dark-mode a:hover {
	  background-color: #1d4ed8;
	}
  </style>
  