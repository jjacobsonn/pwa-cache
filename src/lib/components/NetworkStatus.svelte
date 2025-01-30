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
      height: 27px;
      color: white;
      background: green;
      transition: background 0.3s ease-in-out;
    }
  
    .offline {
      background: red;
    }
  
    /* ✅ WiFi Blinking Effect */
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
      position: relative;
      animation: blink 1.5s infinite alternate ease-in-out;
    }
  
    /* ✅ Slower pulsing for offline mode */
    .offline .dot {
      animation: blink-slow 1.5s infinite alternate ease-in-out;
    }
  
    /* ✅ Faster WiFi blinking for online mode */
    @keyframes blink {
      0% {
        opacity: 1;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
      }
      50% {
        opacity: 0.5;
        box-shadow: 0 0 10px rgba(255, 255, 255, 1);
      }
      100% {
        opacity: 1;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
      }
    }
  
    /* ✅ Slower pulsing when offline */
    @keyframes blink-slow {
      0% {
        opacity: 1;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
      }
      100% {
        opacity: 0.3;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
      }
    }
  
    @media (max-width: 768px) {
      .status-badge {
        font-size: 12px;
        padding: 5px 12px;
        height: 25px;
      }
    }
  
    @media (max-width: 480px) {
      .status-badge {
        font-size: 10px;
        padding: 4px 10px;
        height: 24px;
      }
    }
  </style>
  
  <div class="status-badge {$isOnline ? '' : 'offline'}">
    <div class="dot"></div>
    {$isOnline ? "Online" : "Offline"}
  </div>  