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
      position: fixed;
      top: 12px;
      right: 12px;
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 15px;
      color: white;
      background: green;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: background 0.3s ease-in-out;
    }
  
    .offline {
      background: red;
    }
  
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: white;
    }
  </style>
  
  <div class="status-badge {$isOnline ? '' : 'offline'}">
    <div class="dot"></div>
    {$isOnline ? "Online" : "Offline"}
  </div>  