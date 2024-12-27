<script>
	let message = 'Welcome to PWA Cache!';
</script>

<main
	class="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100"
>
	<h1 class="mb-4 text-4xl font-bold text-gray-800">{message}</h1>
	<p class="mb-8 text-lg text-gray-600">This is a simple PWA built with SvelteKit and Workbox.</p>
	<a href="/posts" class="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
        Check out the Posts Page
    </a> 
</main>

<style>
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
</style>
