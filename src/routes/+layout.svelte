<script>
	import { onMount } from 'svelte';
	import "../app.css";
	import { darkMode } from "../lib/stores";
  
	let isDarkMode = false;
  
	// Subscribe to the darkMode store
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
	<button 
		class="toggle-container"
		aria-label="Toggle dark mode"
		on:click={toggleDarkMode}>
		<div class="toggle-switch {isDarkMode ? 'dark' : ''}">
			{#if isDarkMode}
				<!-- Sun icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="5" />
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</svg>
			{:else}
				<!-- Moon icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
				</svg>
			{/if}
		</div>
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
  
	/* Toggle Switch Container */
	.toggle-container {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: none;
		background: none;
		padding: 0;
	}
  
	/* Toggle Switch Styling */
	.toggle-switch {
		position: relative;
		width: 50px;
		height: 24px;
		border-radius: 12px;
		background-color: var(--toggle-bg);
		border: 2px solid var(--toggle-border); /* Add a distinct border for better visibility */
		transition: background-color 0.3s ease-in-out, border-color 0.3s;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 4px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
	}
  
	.toggle-switch.dark {
		justify-content: flex-end;
		background-color: var(--toggle-dark-bg);
		border-color: var(--sun-color); /* Match the border with the sun icon color */
	}
  
	.icon {
		width: 20px;
		height: 20px;
		transition: color 0.3s ease;
	}
  
	.moon-icon {
		color: var(--moon-color);
	}
  
	.sun-icon {
		color: var(--darker-sun-color); /* Slightly darker sun icon */
	}
</style>