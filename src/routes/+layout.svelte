<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<div class="min-h-screen bg-blue-50">
	{@render children()}
</div>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>