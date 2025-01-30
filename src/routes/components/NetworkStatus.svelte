<script>
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
  
    let isOnline = writable(true); // Default to true (assume online)
  
    function updateStatus() {
      if (typeof navigator !== "undefined") {
        isOnline.set(navigator.onLine);
      }
    }
  
    onMount(() => {
      if (typeof navigator !== "undefined") { // Ensure browser-only execution
        isOnline.set(navigator.onLine);
        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);
      }
    });
  
    onDestroy(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", updateStatus);
        window.removeEventListener("offline", updateStatus);
      }
    });
  </script>
  
  <style>
    .status-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      padding: 10px;
      font-weight: bold;
      color: white;
      background-color: green;
      transition: background-color 0.3s ease-in-out;
    }
  
    .offline {
      background-color: red;
    }
  </style>
  
  {#if $isOnline}
    <div class="status-bar">🟢 Online</div>
  {:else}
    <div class="status-bar offline">🔴 Offline</div>
  {/if}  