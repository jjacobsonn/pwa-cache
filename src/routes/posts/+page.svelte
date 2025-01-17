<script>
  import TrendingRepos from '../components/TrendingRepos.svelte';
  import WelcomeMessage from '$lib/components/WelcomeMessage.svelte';</script>

<main class="container">
  <h1>Trending GitHub Repositories</h1>
  <!-- Replace the <p> with WelcomeMessage -->
  <WelcomeMessage />

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
</style>