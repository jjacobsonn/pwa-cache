<script>
  import { onMount } from 'svelte';

  let trendingRepos = [];
  let featuredRepo = null;
  let isLoading = true;
  let hasError = false;
  let rateLimitRemaining = null;

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Load token from .env
  const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

  // Check rate limit
  async function checkRateLimit() {
    try {
      const response = await fetch('https://api.github.com/rate_limit', { headers });
      if (response.ok) {
        const data = await response.json();
        rateLimitRemaining = data.rate.remaining;
        console.log(`Rate limit remaining: ${rateLimitRemaining}`);
      } else {
        console.error(`Failed to check rate limit: ${response.status}`);
      }
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
      const repoResponse = await fetch(repoUrl, { headers });
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        details.openIssues = repoData.open_issues_count;
      } else {
        console.error(`Failed to fetch repo details for ${repo.name}: ${repoResponse.status}`);
      }

      // Fetch contributors (with pagination)
      const contributorsUrl = `https://api.github.com/repos/${owner}/${repoName}/contributors?per_page=10`;
      const contributorsResponse = await fetch(contributorsUrl, { headers });
      if (contributorsResponse.ok) {
        const contributorsData = await contributorsResponse.json();
        details.contributors = contributorsData.length;
      } else {
        console.error(`Failed to fetch contributors for ${repo.name}: ${contributorsResponse.status}`);
      }
    } catch (error) {
      console.error(`Error fetching details for ${repo.name}:`, error);
    }

    return details;
  }

  // Fetch trending repositories
  async function fetchTrendingRepos() {
    try {
      // Check rate limit before fetching
      await checkRateLimit();

      if (rateLimitRemaining === 0) {
        console.error('Rate limit exceeded. Try again later.');
        hasError = true;
        return;
      }

      const response = await fetch('https://github-trending-api.de.a9sapp.eu/repositories');
      if (!response.ok) throw new Error('Failed to fetch trending repositories');
      const data = await response.json();

      // Fetch additional details with a slight delay between requests
      trendingRepos = [];
      for (const repo of data) {
        const details = await fetchRepoDetails(repo);
        trendingRepos.push({ ...repo, ...details });
        await new Promise((resolve) => setTimeout(resolve, 300)); // Delay of 300ms
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
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #334155;
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .repo-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }

  .repo-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .repo-avatar {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .repo-details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .repo-title {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .repo-description {
    font-size: 14px;
    color: #475569;
    margin-bottom: 16px;
    max-height: 60px;
    overflow-y: auto;
  }

  .repo-description::-webkit-scrollbar {
    width: 5px;
  }

  .repo-description::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 5px;
  }

  .repo-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
    font-size: 13px;
    color: #475569;
  }

  .repo-stats span {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }

  .view-repo {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #2563eb;
    text-decoration: none;
  }

  .view-repo:hover {
    text-decoration: underline;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #1d4ed8;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    font-size: 16px;
    color: #2563eb;
    margin-bottom: 40px;
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
            <a href="{repo.url}" target="_blank" class="view-repo">View Repository</a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
