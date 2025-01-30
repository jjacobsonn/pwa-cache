<script>
    import { offlineMode } from "$lib/stores";

    let isOfflineMode = false;

    // Subscribe to the offline mode store
    $: offlineMode.subscribe((value) => {
        isOfflineMode = value;
    });

    function toggleOfflineMode() {
        offlineMode.update((mode) => !mode);
    }
</script>

<div class="offline-toggle-container">
    <div class="toggle-content">
        <span>Live Mode</span>
        <label class="offline-switch">
            <input type="checkbox" bind:checked={isOfflineMode} on:change={toggleOfflineMode} />
            <span class="slider round"></span>
        </label>
        <span>Offline Mode</span>
    </div>
</div>

<style>
    .offline-toggle-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 500px;
        background-color: #2253bd;
        color: white;
        border-radius: 16px;
        padding: 20px;
        margin: 20px auto;
        box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
    }

    .toggle-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 600;
    }

    .offline-switch {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 34px;
    }

    .offline-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: #2253bd;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #1b3d85;
    }

    input:checked + .slider:before {
        transform: translateX(36px);
        background-color: #ccc;
    }

    .slider.round {
        border-radius: 34px;
    }

    @media (max-width: 768px) {
        .offline-toggle-container {
            max-width: 400px;
            padding: 15px;
        }
        
        .toggle-content {
            font-size: 16px;
        }
    }

    @media (max-width: 480px) {
        .offline-toggle-container {
            max-width: 300px;
            padding: 12px;
        }

        .toggle-content {
            font-size: 14px;
        }
    }
</style>