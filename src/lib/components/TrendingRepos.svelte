<script>
  import { onMount } from 'svelte';
  import RepoCard from './RepoCard.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';

  let trendingRepos = [];
  let isLoading = true;
  let hasError = false;

  async function fetchTrendingRepos() {
    try {
      const response = await fetch('https://github-trending-api.de.a9sapp.eu/repositories');
      if (!response.ok) {
        throw new Error('Failed to fetch repositories.');
      }

      let repos = await response.json();
      console.log('Fetched Repositories:', repos.length); // Debugging count

      // Ensure the count is either 12 or 9
      if (repos.length < 9) {
        console.log('Adding placeholders to reach 9...');
        const needed = 9 - repos.length;
        const placeholders = Array.from({ length: needed }, (_, i) => ({
          name: `Placeholder Repo ${i + 1}`,
          description: 'This is a placeholder for additional repositories.',
          stars: 0,
          author: 'Placeholder Author',
          language: 'Not Listed',
        }));
        repos = [...repos, ...placeholders];
      } else if (repos.length > 12) {
        repos = repos.slice(0, 12); // Trim to 12
      } else if (repos.length > 9 && repos.length < 12) {
        console.log('Trimming to 9 for consistency...');
        repos = repos.slice(0, 9); // Trim to 9
      }

      trendingRepos = repos;
      console.log('Final Trending Repositories Count:', trendingRepos.length);
    } catch (error) {
      console.error(error);
      hasError = true;
    } finally {
      isLoading = false;
    }
  }

  onMount(fetchTrendingRepos);
</script>

{#if isLoading}
  <LoadingSpinner message="Fetching trending repositories..." />
{:else if hasError}
  <ErrorMessage message="Failed to load trending repositories. Please try again later." />
{:else}
  <div class="grid">
    {#each trendingRepos as repo}
      <RepoCard {repo} />
    {/each}
  </div>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Always 3 cards per row */
    gap: 24px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr); /* 2 per row for smaller screens */
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: repeat(1, 1fr); /* 1 per row for very small screens */
    }
  }
</style>

{#if isLoading}
  <LoadingSpinner message="Fetching trending repositories..." />
{:else if hasError}
  <ErrorMessage message="Failed to load trending repositories. Please try again later." />
{:else}
  <div class="grid">
    {#each trendingRepos as repo}
      <RepoCard {repo} />
    {/each}
  </div>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Always 3 cards per row */
    gap: 24px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr); /* Adjust to 2 cards per row for smaller screens */
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: repeat(1, 1fr); /* Single column on very small screens */
    }
  }
</style>