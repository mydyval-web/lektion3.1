<script>
	let value = $state('');
	let username = $state('');

	$effect(() => {
		username = localStorage.getItem('username') || '';
	});

	const saveValue = async () => {
		const res = await fetch('/api/blodsukker', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ value })
		});

		if (res.ok) {
			alert('Gemt!');
			value = '';
		} else {
			alert('Fejl!');
		}
	};
</script>

<h1 class="text-center text-2xl font-bold"> Registrer dit blodsukker </h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4">
		<input
			type="text"
			bind:value={value}
			placeholder="Indtast værdi"
			class="input input-bordered w-72"
		/>

		<button class="btn btn-primary w-72" onclick={saveValue}>
			Gem værdi
		</button>
	</div>
</div>