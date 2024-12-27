<script>
  import { onMount } from 'svelte';

  let repos = [];
  let featuredRepo = null;
  let isLoading = true;
  let hasError = false;

  // Fetch GitHub repositories
  async function fetchRepos() {
    try {
      const response = await fetch('https://api.github.com/users/octocat/repos');
      if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
      const data = await response.json();

      // Sort repositories by stars in descending order
      repos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

      // Highlight the repository with the most stars
      featuredRepo = repos[0];
    } catch (error) {
      console.error('Fetch Error:', error);

      // Use offline cached data if available
      const cache = await caches.open('github-api-cache');
      const cachedResponse = await cache.match('https://api.github.com/users/octocat/repos');
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        repos = cachedData.sort((a, b) => b.stargazers_count - a.stargazers_count);
        featuredRepo = repos[0];
      } else {
        hasError = true;
      }
    } finally {
      isLoading = false;
    }
  }

  onMount(fetchRepos);
</script>

<main class="container mx-auto px-4 py-10">
  <h1 class="text-center text-4xl font-bold text-blue-800 my-8">GitHub Repositories</h1>
  <p class="text-center text-lg text-blue-700 mb-6">
    This page showcases repositories from the GitHub user <strong>octocat</strong>, highlighting a featured repository
    and additional repository details such as stars, forks, and primary language.
  </p>

  {#if isLoading}
    <p class="text-center text-gray-700">Loading...</p>
  {:else if hasError}
    <p class="text-center text-red-500">
      Failed to load repositories. Please try again later or check your offline cache.
    </p>
  {:else}
    <!-- Featured Repository -->
    {#if featuredRepo}
      <section class="mb-10 p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-2">🌟 Featured Repository: {featuredRepo.name}</h2>
        <p class="mb-4">{featuredRepo.description || 'No description available'}</p>
        <div class="flex items-center gap-4">
          <span>⭐ {featuredRepo.stargazers_count} Stars</span>
          <span>🍴 {featuredRepo.forks_count} Forks</span>
          <span>🛠️ {featuredRepo.language || 'Unknown Language'}</span>
        </div>
        <a
          href="{featuredRepo.html_url}"
          target="_blank"
          class="mt-4 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition"
        >
          View Repository
        </a>
      </section>
    {/if}

    <!-- Repository Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each repos as repo (repo.id)}
        <div class="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{repo.name}</h3>
          <p class="text-gray-600 mb-2">
            {repo.description || 'No description available'}
          </p>
          <div class="text-sm text-gray-600 flex gap-2">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>🛠️ {repo.language || 'Unknown'}</span>
          </div>
          <a
            href="{repo.html_url}"
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