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
    /* Centered, High-Quality Layout */
    .welcome-message {
        max-width: 1100px;
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

    /* Content Split for a Professional Layout */
    .content-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
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

    /* Glass Cards - Enlarged */
    .glass-card {
        background: white;
        color: #2253bd; /* Matches the previous background color */
        border-radius: 14px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        backdrop-filter: blur(10px);
        width: 180px; /* Increased width */
        height: 180px; /* Increased height */
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .glass-card:hover {
        transform: scale(1.08);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .glass-card i {
        font-size: 3rem; /* Increased size */
        color: #3b82f6;
        margin-bottom: 0.8rem;
    }

    .glass-card p {
        font-size: 1.2rem; /* Larger font */
        font-weight: 700;
    }

    /* Heading */
    .title {
        font-size: 2.6rem; /* Slightly larger */
        font-weight: 700;
        color: #ffffff; /* Primary Heading Color */
        margin-bottom: 1.2rem;
    }

    /* Text Content (Updated Colors for Balance) */
    .description {
        font-size: 1.3rem;
        font-weight: 500;
        color: #ffffff; /* Matches title color */
        margin-bottom: 0.5rem;
    }

    .sub-description {
        font-size: 1.1rem;
        color: #e0f2fe; /* Lighter for balance */
    }

    /* Responsive Adjustments */
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
            width: 150px;
            height: 150px;
        }

        .glass-card i {
            font-size: 2.5rem;
        }
    }
</style>