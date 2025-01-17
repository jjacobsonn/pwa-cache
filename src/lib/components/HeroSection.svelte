<script>
	let message = 'PWA Cache';
</script>

<section class="text-center">
	<h1 class="mb-6 text-5xl font-extrabold tracking-tight leading-tight">{message}</h1>
	<div class="flex justify-center items-center mb-6">
		<img src="/icons/cloud-app.png" alt="Cloud App Logo" class="logo" />
	</div>
	<p class="mb-12 text-lg max-w-xl mx-auto">
		This Progressive Web App (PWA) demonstrates advanced offline functionality using SvelteKit and Workbox. Enjoy seamless browsing with caching, offline support, and blazing-fast performance.
	</p>
	<a href="/posts" class="px-8 py-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-semibold">
		Explore Features
	</a>
</section>

<style>
	h1 {
		color: var(--nav-link);
	}

	.logo {
		width: 200px;
		height: auto;
		margin: 20px 0;
	}

	a {
		display: inline-block;
		font-weight: bold;
		transition: transform 0.2s, background-color 0.2s;
	}

	a:hover {
		transform: translateY(-2px);
	}
</style>