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
      if (typeof navigator !== "undefined") {
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
    .status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 12px;
      padding: 6px 14px;
      height: 32px; /* Match dark mode toggle height */
      color: white;
      background: green;
      transition: background 0.3s ease-in-out;
    }
  
    .offline {
      background: red;
    }
  
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
    }
  
    @media (max-width: 768px) {
      .status-badge {
        font-size: 12px;
        padding: 5px 12px;
        height: 30px;
      }
    }
  
    @media (max-width: 480px) {
      .status-badge {
        font-size: 10px;
        padding: 4px 10px;
        height: 28px;
      }
    }
  </style>
  
  <div class="status-badge {$isOnline ? '' : 'offline'}">
    <div class="dot"></div>
    {$isOnline ? "Online" : "Offline"}
  </div>  