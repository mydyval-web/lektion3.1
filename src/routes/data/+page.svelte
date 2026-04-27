<script>
	import { onMount } from 'svelte';

	let values = $state([]);
	let loading = $state(true);

	const loadValues = async () => {
		const res = await fetch('/api/blodsukker');

		if (res.ok) {
			values = await res.json();
		} else {
			console.log('Ikke logget ind eller fejl');
		}

		loading = false;
	};

	onMount(() => {
		loadValues();
	});
</script>

<h1 class="text-center text-2xl font-bold">Tidligere målinger</h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4 mt-6">
		{#if loading}
			<p>Henter målinger...</p>
		{:else if values.length === 0}
			<p>Ingen målinger endnu</p>
		{:else}
			{#each values as item}
				<div class="border rounded-lg p-4 w-72 text-center">
					Blodsukker: {item.value}
				</div>
			{/each}
		{/if}
	</div>
</div>