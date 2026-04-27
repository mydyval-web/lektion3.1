<script>
	import { goto } from '$app/navigation';

	let value = $state('');
	let username = $state('');

	let lastValue = $state('');
	let statusText = $state('');
	let statusClass = $state('');

	$effect(() => {
		username = localStorage.getItem('username') || '';
	});

	const saveValue = async () => {
		const res = await fetch('/api/blodsukker', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ value })
		});

		if (res.ok) {
			const numberValue = Number(value);

			lastValue = value;

			if (numberValue < 3) {
				statusText = 'Kritisk lav';
				statusClass = 'bg-red-200';
			} else if (numberValue < 4) {
				statusText = 'For lavt';
				statusClass = 'bg-yellow-200';
			} else if (numberValue <= 10) {
				statusText = 'Inden for normalt område';
				statusClass = 'bg-green-200';
			} else if (numberValue <= 15) {
				statusText = 'For højt';
				statusClass = 'bg-yellow-200';
			} else {
				statusText = 'Kritisk høj';
				statusClass = 'bg-red-200';
			}

			value = '';
		}
	};

	const goToRaad = () => {
		goto('/raad');
	};

	const goToData = () => {
		goto('/data');
	};
	const logout = async () => {await fetch('/api/logout', {
		method: 'POST'
	});

	goto('/login');
};
</script>

<h1 class="text-center text-2xl font-bold">Registrer dit blodsukker</h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4">
		<input
			type="text"
			bind:value={value}
			placeholder="Indtast værdi"
			class="input input-bordered w-72"
		/>

		<button class="btn bg-blue-600 btn-primary w-72" onclick={saveValue}>
			Gem værdi og få feedback
		</button>

		{#if lastValue}
			<div class={`w-72 rounded-lg p-4 text-center font-bold ${statusClass}`}>
				<p>Seneste værdi: {lastValue}</p>
				<p>{statusText}</p>
			</div>
		{/if}

		<button class="btn w-72" onclick={goToRaad}>
			Gode råd
		</button>

		<button class="btn w-72" onclick={goToData}>
			Se tidligere målinger
		</button>

		<button class="btn bg-red-600 btn-primary w-72" onclick={logout}>
			Log ud
		</button>

	</div>
</div>