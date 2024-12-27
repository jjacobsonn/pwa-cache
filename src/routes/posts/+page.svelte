<script>
  import { onMount } from 'svelte';

  let trendingRepos = [];
  let featuredRepo = null;
  let isLoading = true;
  let hasError = false;

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Use the token from .env
  const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

  // Fetch additional repository details
  async function fetchRepoDetails(repo) {
    const details = {
      openIssues: 0,
      contributors: 0,
    };

    try {
      const owner = repo.author;
      const repoName = repo.name;

      // Fetch open issues count
      const issuesUrl = `https://api.github.com/repos/${owner}/${repoName}/issues`;
      const issuesResponse = await fetch(issuesUrl, { headers });
      if (issuesResponse.ok) {
        const issues = await issuesResponse.json();
        details.openIssues = issues.length;
      } else {
        console.error(`Failed to fetch issues for ${repo.name}`, issuesResponse.status);
      }

      // Fetch contributors count
      const contributorsUrl = `https://api.github.com/repos/${owner}/${repoName}/contributors`;
      const contributorsResponse = await fetch(contributorsUrl, { headers });
      if (contributorsResponse.ok) {
        const contributors = await contributorsResponse.json();
        details.contributors = contributors.length;
      } else {
        console.error(`Failed to fetch contributors for ${repo.name}`, contributorsResponse.status);
      }
    } catch (error) {
      console.error(`Error fetching details for ${repo.name}:`, error);
    }

    return details;
  }

  // Fetch Trending Repositories
  async function fetchTrendingRepos() {
    try {
      const response = await fetch('https://github-trending-api.de.a9sapp.eu/repositories');
      if (!response.ok) throw new Error('Failed to fetch trending repositories');
      const data = await response.json();

      // Fetch additional details for each repository
      trendingRepos = await Promise.all(
        data.map(async (repo) => {
          const details = await fetchRepoDetails(repo);
          return { ...repo, ...details };
        })
      );

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

<style>
  .repo-card {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .repo-description {
    max-height: 60px;
    overflow-y: auto;
  }

  .repo-description::-webkit-scrollbar {
    width: 5px;
  }

  .repo-description::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }

  .repo-description::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
</style>

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
          <span>📋 {featuredRepo.openIssues} Open Issues</span>
          <span>🤝 {featuredRepo.contributors} Contributors</span>
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
        <div class="repo-card p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{repo.name}</h3>
          <p class="repo-description text-gray-600 mb-2">
            {repo.description || 'No description available'}
          </p>
          <div class="text-sm text-gray-600 flex gap-2">
            <span>⭐ {repo.stars}</span>
            <span>🍴 {repo.forks}</span>
            <span>🛠️ {repo.language || 'Not Listed'}</span>
            <span>📋 {repo.openIssues} Issues</span>
            <span>🤝 {repo.contributors} Contributors</span>
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
