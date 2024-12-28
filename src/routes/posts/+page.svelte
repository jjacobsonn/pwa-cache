<script>
  import TrendingRepos from '../components/TrendingRepos.svelte';
</script>

<main class="container">
  <h1>Trending GitHub Repositories</h1>
  <p>Explore repositories that are currently trending on GitHub across various programming languages.</p>

  <TrendingRepos />
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  h1 {
    font-size: 36px;
    font-weight: bold;
    color: #1d4ed8;
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    color: #1e40af;
    margin-bottom: 40px;
  }
</style>