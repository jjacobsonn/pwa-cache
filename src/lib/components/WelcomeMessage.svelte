<script>
    export let title = "GitHub Trends: Cached & Real-Time Data";
    export let description = "GitHub repository data is dynamically retrieved, optimized for real-time access and offline availability.";
    export let subDescription = "Live data is fetched seamlessly. If offline, cached repositories load instantly, preserving workflow continuity.";
</script>

<section class="welcome-message">
    <div class="content-container">
        <!-- Left Side: Title & Text -->
        <div class="text-content">
            <h1 class="title">{title}</h1>
            <p class="description">{description}</p>
            <p class="sub-description">{subDescription}</p>
        </div>

        <!-- Right Side: Visual Representation -->
        <div class="visual-container">
            <div class="glass-card">
                <i class="fas fa-cloud-sync-alt"></i>
                <p>Live Sync</p>
            </div>
            <div class="glass-card">
                <i class="fas fa-database"></i>
                <p>Persistent Cache</p>
            </div>
        </div>
    </div>
</section>

<style>
    .welcome-message {
        max-width: 100%;
        margin: 4rem auto;
        padding: 3rem;
        background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
        color: white;
        border-radius: 16px;
        box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s ease-in-out;
    }

    .content-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        gap: 2.5rem;
    }

    .text-content {
        flex: 1;
        text-align: left;
    }

    .visual-container {
        display: flex;
        gap: 2rem;
        flex: 1;
        justify-content: center;
    }

    .glass-card {
        background: white;
        color: #2253bd;
        border-radius: 14px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        backdrop-filter: blur(10px);
        width: 220px;
        height: 220px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .glass-card:hover {
        transform: scale(1.08);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .glass-card i {
        font-size: 3rem;
        color: #3b82f6;
        margin-bottom: 0.8rem;
    }

    .glass-card p {
        font-size: 1.2rem;
        font-weight: 700;
    }

    .title {
        font-size: 2.6rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 1.2rem;
    }

    .description {
        font-size: 1.3rem;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }

    .sub-description {
        font-size: 1.1rem;
        color: #e0f2fe;
    }

    @media (max-width: 768px) {
        .content-container {
            flex-direction: column;
            text-align: center;
        }

        .visual-container {
            justify-content: center;
            gap: 1.2rem;
        }

        .title {
            font-size: 2.2rem;
        }

        .description, .sub-description {
            font-size: 1.1rem;
        }

        .glass-card {
            width: 180px;
            height: 180px;
        }

        .glass-card i {
            font-size: 2.5rem;
        }
    }
</style>