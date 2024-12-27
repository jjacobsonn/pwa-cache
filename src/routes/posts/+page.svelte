<script>
    import { onMount } from 'svelte';
  
    let posts = [];
    let isLoading = true;
    let hasError = false;
  
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch');
        posts = await response.json();
      } catch (error) {
        console.error('Fetch Error:', error);
        hasError = true;
  
        // Offline fallback
        if (!navigator.onLine) {
          console.log('You are offline. Loading fallback data...');
          posts = [{ title: 'Cached Post 1' }, { title: 'Cached Post 2' }]; // Example fallback data
        }
      } finally {
        isLoading = false;
      }
    }
  
    onMount(fetchPosts);
  </script>
  
  <main>
    <h1>Posts</h1>
  
    {#if isLoading}
      <p>Loading...</p>
    {:else if hasError}
      <p>Failed to load posts. Please try again later.</p>
    {:else}
      <ul>
        {#each posts as post}
          <li>{post.title}</li>
        {/each}
      </ul>
    {/if}
  </main>
  
  <style>
    h1 {
      color: #4f46e5;
    }
    ul {
      padding: 0;
      list-style: none;
    }
    li {
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
  </style>  