<script>
	import { onMount } from 'svelte';
	import "../app.css";
	import { darkMode } from "../lib/stores";
  
	let isDarkMode = false;
  
	// Subscribe to the store
	$: darkMode.subscribe((value) => {
	  isDarkMode = value;
	});
  
	// Toggle dark mode
	function toggleDarkMode() {
	  darkMode.update((mode) => !mode);
	}
  
	// Apply dark mode class in browser
	onMount(() => {
	  darkMode.subscribe((value) => {
		if (value) {
		  document.documentElement.classList.add('dark');
		} else {
		  document.documentElement.classList.remove('dark');
		}
	  });
	});
  </script>
  
  <nav>
	<div class="nav-links">
	  <a href="/">Home</a>
	  <a href="/posts">Posts</a>
	</div>
	<button aria-label="Toggle Dark Mode" on:click={toggleDarkMode}>
	  🌙
	</button>
  </nav>
  
  <slot />
  
  <style>
	nav {
	  display: flex;
	  justify-content: space-between; /* Space between navigation links and toggle button */
	  align-items: center;
	  background-color: var(--nav-bg);
	  padding: 1rem;
	  border-bottom: 1px solid var(--border-color);
	}
  
	.nav-links {
	  display: flex;
	  gap: 1rem; /* Space between navigation links */
	}
  
	.nav-links a {
	  text-decoration: none;
	  color: var(--nav-link);
	  font-weight: bold;
	}
  
	.nav-links a:hover {
	  text-decoration: underline;
	}
  
	nav button {
	  background: none;
	  border: none;
	  font-size: 1.5rem;
	  cursor: pointer;
	  color: var(--nav-link);
	}
  </style>  