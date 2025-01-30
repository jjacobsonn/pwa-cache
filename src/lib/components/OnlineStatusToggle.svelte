<script>
    import { writable } from 'svelte/store';

    // ✅ Online/Offline Mode Store
    export const offlineMode = writable(false);
    let isOfflineMode = false;

    // Subscribe to store
    $: offlineMode.subscribe((value) => {
        isOfflineMode = value;
    });

    function toggleOfflineMode() {
        offlineMode.update((mode) => !mode);
    }
</script>

<!-- ✅ Online/Offline Toggle Button -->
<button 
    class="toggle-container"
    aria-label="Toggle Offline Mode"
    on:click={toggleOfflineMode}
    title={isOfflineMode ? "Offline Mode" : "Online Mode"}>

    <div class="toggle-switch {isOfflineMode ? 'offline' : ''}">
        {#if isOfflineMode}
            <!-- 🚫 Offline Icon (Crossed-out Wi-Fi) -->
            <svg class="icon wifi-off-icon" viewBox="0 0 24 24">
                <path d="M5 12q2-2 7-2t7 2M8 16q2-1 4-1t4 1M12 20h0.01M2 2l20 20" 
                      stroke="#2563eb" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        {:else}
            <!-- 📶 Online Icon (Wi-Fi Bars) -->
            <svg class="icon wifi-icon" viewBox="0 0 24 24">
                <path d="M5 12q2-2 7-2t7 2M8 16q2-1 4-1t4 1M12 20h0.01" 
                      stroke="#2563eb" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        {/if}
    </div>
</button>

<style>
    .toggle-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        background: none;
        padding: 0;
    }

    .toggle-switch {
        position: relative;
        width: 32px; /* ✅ Reduced from 40px */
        height: 32px; /* ✅ Reduced from 40px */
        border-radius: 50%;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease-in-out, box-shadow 0.3s;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        border: 2px solid #2563eb;
    }

    .toggle-switch.offline {
        background-color: white;
        border: 2px solid #2563eb;
    }

    .icon {
        width: 20px; /* ✅ Adjusted for smaller button */
        height: 20px;
        transition: transform 0.2s ease-in-out;
    }

    .wifi-off-icon {
        stroke: #2563eb;
    }

    .wifi-icon {
        stroke: #2563eb;
    }
</style>