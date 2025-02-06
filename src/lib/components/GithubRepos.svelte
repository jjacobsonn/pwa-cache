<script>
    import { onMount, writable } from "svelte/store";

    let repos = writable([]);
    let isOffline = writable(false);

    async function fetchRepos() {
        try {
            console.log("🔍 Fetching GitHub repos...");
            const response = await fetch("https://api.github.com/users/octocat/repos", {
                headers: {
                    "Authorization": `Bearer ${import.meta.env.GITHUB_API_TOKEN}`, // ✅ Correct Token
                    "User-Agent": "YourAppName"
                }
            });

            if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
            const data = await response.json();
            repos.set(data);
            isOffline.set(false);
            console.log("✅ GitHub Repos Fetched Successfully!");
        } catch (error) {
            console.log("🔹 Using cached GitHub repos (Offline Mode)", error);
            isOffline.set(true);
        }
    }

    onMount(() => {
        fetchRepos();
    });
</script>

<section>
    {#if $isOffline}
        <p>🚨 You are offline. Showing cached GitHub repositories.</p>
    {/if}
    <ul>
        {#each $repos as repo}
            <li><a href={repo.html_url} target="_blank">{repo.name}</a></li>
        {/each}
    </ul>
</section>
