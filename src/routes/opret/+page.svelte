<script>
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');

	const createUser = async () => {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		await response.json();

		if (response.ok) {
			alert('Bruger oprettet!');
		} else {
			alert('Fejl ved oprettelse af bruger!');
		}

		username = '';
		password = '';
	};

	const goToLogin = () => {
		goto('/login');
	};
</script>

<h1 class="text-center text-2xl font-bold"> Opret en bruger </h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4">
		<input
			type="text"
			bind:value={username}
			placeholder="Brugernavn"
			class="input input-bordered w-72"
		/>

		<input
			type="password"
			bind:value={password}
			placeholder="Adgangskode"
			class="input input-bordered w-72"
		/>

		<button class="btn btn bg-blue-600 btn-primary w-72" onclick={createUser}>
			Opret bruger
		</button>

		<button class="btn w-72" onclick={goToLogin}>
			Gå tilbage til login
		</button>

	</div>
</div>