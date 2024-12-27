<script>
  import { onMount } from 'svelte';

  let trendingRepos = [];
  let featuredRepo = null;
  let isLoading = true;
  let hasError = false;

  // Fetch Trending Repositories
  async function fetchTrendingRepos() {
    try {
      const response = await fetch('https://github-trending-api.de.a9sapp.eu/repositories');
      if (!response.ok) throw new Error('Failed to fetch trending repositories');
      const data = await response.json();

      // Store trending repositories
      trendingRepos = data;

      // Randomly pick a featured repository
      const randomIndex = Math.floor(Math.random() * trendingRepos.length);
      featuredRepo = trendingRepos[randomIndex];
    } catch (error) {
      console.error('Fetch Error:', error);

      // Use offline cached data if available
      const cache = await caches.open('trending-repos-cache');
      const cachedResponse = await cache.match('https://github-trending-api.de.a9sapp.eu/repositories');
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        trendingRepos = cachedData;

        // Randomly pick a featured repository from cached data
        const randomIndex = Math.floor(Math.random() * trendingRepos.length);
        featuredRepo = trendingRepos[randomIndex];
      } else {
        hasError = true;
      }
    } finally {
      isLoading = false;
    }
  }

  onMount(fetchTrendingRepos);
</script>

<main class="container mx-auto px-4 py-10">
  <h1 class="text-center text-4xl font-bold text-blue-800 my-8">Trending GitHub Repositories</h1>
  <p class="text-center text-lg text-blue-700 mb-6">
    Explore repositories that are currently trending on GitHub across various programming languages.
  </p>

  {#if isLoading}
    <p class="text-center text-gray-700">Loading...</p>
  {:else if hasError}
    <p class="text-center text-red-500">
      Failed to load trending repositories. Please try again later or check your offline cache.
    </p>
  {:else}
    <!-- Featured Repository -->
    {#if featuredRepo}
      <section class="mb-10 p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-2">🌟 Featured Repository: {featuredRepo.name}</h2>
        <p class="mb-4">{featuredRepo.description || 'No description available'}</p>
        <div class="flex items-center gap-4">
          <span>⭐ {featuredRepo.stars} Stars</span>
          <span>🍴 {featuredRepo.forks} Forks</span>
          <span>🛠️ {featuredRepo.language || 'Not Listed'}</span>
        </div>
        <a
          href="{featuredRepo.url}"
          target="_blank"
          class="mt-4 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition"
        >
          View Repository
        </a>
      </section>
    {/if}

    <!-- Repository Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each trendingRepos as repo (repo.url)}
        <div class="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{repo.name}</h3>
          <p class="text-gray-600 mb-2">
            {repo.description || 'No description available'}
          </p>
          <div class="text-sm text-gray-600 flex gap-2">
            <span>⭐ {repo.stars}</span>
            <span>🍴 {repo.forks}</span>
            <span>🛠️ {repo.language || 'Not Listed'}</span>
          </div>
          <a
            href="{repo.url}"
            target="_blank"
            class="block mt-4 text-blue-600 hover:underline"
          >
            View Repository
          </a>
        </div>
      {/each}
    </div>
  {/if}
</main>
