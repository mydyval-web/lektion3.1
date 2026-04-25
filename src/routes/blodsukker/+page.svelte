<script>
	let blodsukker = $state('');

	const gemBlodsukker = async () => {
		const response = await fetch('/api/blodsukker', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value: blodsukker })
		});

		await response.json();

		if (response.ok) {
			alert('Blodsukker gemt!');
		} else {
			alert('Fejl ved gemning');
		}

		blodsukker = '';
	};
</script>

<h1 class="text-center text-2xl font-bold">
	Registrer dit blodsukker
</h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4">
		<input
			type="text"
			bind:value={blodsukker}
			placeholder="Indtast blodsukker mmol/l"
			class="input input-bordered w-72"
		/>

		<button class="btn btn-primary w-72" onclick={gemBlodsukker}>
			Gem værdi
		</button>
	</div>
</div>