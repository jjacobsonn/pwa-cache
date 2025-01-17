<script>
	export let title = '';
	export let content = '';
</script>

<div class="feature-card">
	<h2 class="feature-title">{title}</h2>
	<div class="feature-content">
		{@html content}
	</div>
</div>

<style>
	.feature-card {
		background-color: var(--card-bg);
		color: var(--card-text);
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
		transition: background 0.3s, color 0.3s, box-shadow 0.3s;
		font-family: 'Inter', sans-serif;
		width: 100%;
	}

	.feature-title {
		color: var(--card-header);
		font-size: 1.875rem; /* 3xl */
		font-weight: bold;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.feature-content {
		font-size: 1.125rem; /* lg */
		line-height: 1.6;
		color: inherit; /* Ensures text is visible */
	}

	@media (max-width: 640px) {
		.feature-card {
			padding: 1.5rem;
		}
	}
</style>