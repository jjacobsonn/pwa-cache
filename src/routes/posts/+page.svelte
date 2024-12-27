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
      } finally {
        isLoading = false;
      }
    }
  
    onMount(fetchPosts);
  </script>
  
  <main class="container mx-auto px-4">
    <h1 class="text-center text-4xl font-bold text-gray-800 my-8">Posts</h1>
    <p class="text-center text-lg text-gray-600 mb-6">
      This page demonstrates the power of Progressive Web Apps (PWA) by dynamically fetching and caching 
      posts from an external API. Even offline, previously viewed posts remain accessible.
    </p>
  
    {#if isLoading}
      <p class="text-center text-gray-600">Loading...</p>
    {:else if hasError}
      <p class="text-center text-red-500">Failed to load posts. Please try again later.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each posts as post}
          <div class="p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p class="text-gray-600">{post.body}</p>
          </div>
        {/each}
      </div>
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