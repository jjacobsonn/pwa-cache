<script>
    import { onMount } from 'svelte';
    import "../app.css";
    import { darkMode } from "$lib/stores"; // ✅ Use SvelteKit's `$lib` alias
    import NetworkStatus from "$lib/components/NetworkStatus.svelte"; // ✅ Adjusted path
    import DarkModeToggle from "$lib/components/DarkModeToggle.svelte"; // ✅ Corrected path

    let isDarkMode = false;

    // Subscribe to darkMode store
    $: darkMode.subscribe((value) => {
        isDarkMode = value;
    });

    // Apply dark mode class
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

    <!-- ✅ Navigation Right Section -->
    <div class="nav-right">
        <NetworkStatus />
        <DarkModeToggle />  <!-- ✅ Corrected path for DarkModeToggle -->
    </div>
</nav>

<slot />

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--nav-bg);
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
    }

    .nav-links {
        display: flex;
        gap: 1rem;
    }

    .nav-links a {
        text-decoration: none;
        color: var(--nav-link);
        font-weight: bold;
    }

    .nav-links a:hover {
        text-decoration: underline;
    }

    .nav-right {
        display: flex;
        align-items: center;
        gap: 16px;
    }
</style>