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
        max-width: 550px;
        background-color: white; /* White card for contrast */
        color: #2253bd;
        border-radius: 16px;
        padding: 24px;
        margin: 40px auto 60px; /* Added bottom margin */
        box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
        border: 2px solid #2253bd;
    }

    .toggle-content {
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 18px;
        font-weight: 600;
    }

    .offline-switch {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 36px;
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
        background-color: #ddd;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 28px;
        width: 28px;
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
        transform: translateX(34px);
        background-color: #ccc;
    }

    .slider.round {
        border-radius: 34px;
    }

    @media (max-width: 768px) {
        .offline-toggle-container {
            max-width: 400px;
            padding: 18px;
        }
        
        .toggle-content {
            font-size: 16px;
        }
    }

    @media (max-width: 480px) {
        .offline-toggle-container {
            max-width: 300px;
            padding: 15px;
        }

        .toggle-content {
            font-size: 14px;
        }
    }
</style>