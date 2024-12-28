<script>
  import { onMount } from 'svelte';

  let trendingRepos = [];
  let featuredRepo = null;
  let isLoading = true;
  let hasError = false;
  let rateLimitRemaining = null;

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Load token from .env
  const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

  // Helper: Retry wrapper for fetch
  async function fetchWithRetry(url, options, retries = 3, delay = 500) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          console.warn(`Request failed with status ${response.status}: Retrying...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        if (i === retries - 1) throw error;
      }
    }
  }

  // Check rate limit
  async function checkRateLimit() {
    try {
      const data = await fetchWithRetry('https://api.github.com/rate_limit', { headers });
      rateLimitRemaining = data.rate.remaining;
      console.log(`Rate limit remaining: ${rateLimitRemaining}`);
    } catch (error) {
      console.error('Error checking rate limit:', error);
    }
  }

  // Fetch additional repository details
  async function fetchRepoDetails(repo) {
    const details = {
      openIssues: 0,
      contributors: 0,
    };

    try {
      const owner = repo.author;
      const repoName = repo.name;

      // Fetch repo details for open issues
      const repoUrl = `https://api.github.com/repos/${owner}/${repoName}`;
      const repoData = await fetchWithRetry(repoUrl, { headers });
      details.openIssues = repoData?.open_issues_count || 0;

      // Fetch contributors
      const contributorsUrl = `https://api.github.com/repos/${owner}/${repoName}/contributors?per_page=10`;
      const contributorsData = await fetchWithRetry(contributorsUrl, { headers });
      details.contributors = contributorsData?.length || 0;
    } catch (error) {
      console.error(`Error fetching details for ${repo.name}:`, error);
    }

    return details;
  }

  // Fetch trending repositories
  async function fetchTrendingRepos() {
    try {
      await checkRateLimit();

      if (rateLimitRemaining === 0) {
        console.error('Rate limit exceeded. Try again later.');
        hasError = true;
        return;
      }

      const data = await fetchWithRetry('https://github-trending-api.de.a9sapp.eu/repositories');
      trendingRepos = [];

      for (const repo of data) {
        if (rateLimitRemaining > 0) {
          const details = await fetchRepoDetails(repo);
          trendingRepos.push({ ...repo, ...details });
          await new Promise((resolve) => setTimeout(resolve, rateLimitRemaining > 10 ? 300 : 1000)); // Adjust delay
        } else {
          console.warn('Rate limit reached during repository details fetch.');
          trendingRepos.push(repo); // Fallback to base data
        }
      }

      // Randomly pick a featured repository
      const randomIndex = Math.floor(Math.random() * trendingRepos.length);
      featuredRepo = trendingRepos[randomIndex];
    } catch (error) {
      console.error('Fetch Error:', error);
      hasError = true;
    } finally {
      isLoading = false;
    }
  }

  onMount(fetchTrendingRepos);
</script>

<style>
  /* Base body styling */
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f3f4f6;
    color: #1f2937;
    margin: 0;
    padding: 0;
  }

  /* Container styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Repository card styles */
  .repo-card {
    background: linear-gradient(145deg, #ffffff, #f3f4f6);
    border-radius: 16px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.9);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    position: relative;
    padding-bottom: 70px; /* Ensure space for button */
  }

  .repo-card:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8);
  }

  .repo-avatar {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .repo-details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .repo-title {
    font-size: 18px;
    font-weight: bold;
    color: #111827;
    margin-bottom: 10px;
    text-align: center;
  }

  .repo-description {
    font-size: 14px;
    color: #4b5563;
    margin-bottom: 16px;
    max-height: 80px;
    overflow-y: auto;
  }

  .repo-description::-webkit-scrollbar {
    width: 5px;
  }

  .repo-description::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  .repo-stats {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    color: #4b5563;
  }

  /* Button styling for "View Repository" */
  .view-repo {
    position: absolute;
    bottom: 20px; /* Centered spacing above the bottom */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%);
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-decoration: none;
    background-color: #3b82f6; /* Button background */
    padding: 10px 20px;
    border-radius: 6px;
    transition: background-color 0.2s ease-in-out, transform 0.2s;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .view-repo:hover {
    background-color: #2563eb;
    transform: translate(-50%, -2px); /* Slight lift on hover */
  }

  /* Grid display for repositories */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  /* Heading styles */
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #1d4ed8;
    margin-bottom: 24px;
  }

  /* Light mode styling for paragraph */
  p {
    text-align: center;
    font-size: 16px;
    color: #1e40af;
    margin-bottom: 40px;
  }

  /* Dark mode styling for specific paragraph */
  :root.dark p:not(.repo-description) {
    color: #ffffff;
  }
</style>

<main class="container">
  <h1>Trending GitHub Repositories</h1>
  <p>Explore repositories that are currently trending on GitHub across various programming languages.</p>

  {#if isLoading}
    <p class="text-center">Loading...</p>
  {:else if hasError}
    <p class="text-center text-red-500">
      Failed to load trending repositories. Please try again later.
    </p>
  {:else}
    <div class="grid">
      {#each trendingRepos as repo (repo.url)}
        <div class="repo-card">
          <img src="{repo.avatar}" alt="{repo.name} Avatar" class="repo-avatar" />
          <div class="repo-details">
            <h3 class="repo-title">{repo.name}</h3>
            <p class="repo-description">{repo.description || 'No description available'}</p>
            <div class="repo-stats">
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
              <span>🛠️ {repo.language || 'Not Listed'}</span>
              <span>📋 {repo.openIssues} Issues</span>
              <span>🤝 {repo.contributors} Contributors</span>
            </div>
          </div>
          <a href="{repo.url}" target="_blank" class="view-repo">View Repository</a>
        </div>
      {/each}
    </div>
  {/if}
</main>
