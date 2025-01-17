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
  
        const repos = await response.json();
  
        // Enrich data with additional details
        trendingRepos = await Promise.all(
          repos.map(async (repo) => {
            const details = await fetchRepoDetails(repo);
            return { ...repo, ...details };
          })
        );
      } catch (error) {
        console.error(error);
        hasError = true;
      } finally {
        isLoading = false;
      }
    }
  
    async function fetchRepoDetails(repo) {
      const details = {
        openIssues: 0,
        contributors: 0,
      };
  
      try {
        const repoUrl = `https://api.github.com/repos/${repo.author}/${repo.name}`;
        const repoResponse = await fetch(repoUrl);
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          details.openIssues = repoData.open_issues_count || 0;
        }
  
        const contributorsUrl = `${repoUrl}/contributors?per_page=10`;
        const contributorsResponse = await fetch(contributorsUrl);
        if (contributorsResponse.ok) {
          const contributorsData = await contributorsResponse.json();
          details.contributors = contributorsData.length || 0;
        }
      } catch (error) {
        console.error('Error fetching repo details:', error);
      }
  
      return details;
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
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
  </style>
  