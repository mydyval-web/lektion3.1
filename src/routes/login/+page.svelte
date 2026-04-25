<script>
	import { createSubscriber } from 'svelte/reactivity';
	import { goto } from '$app/navigation';

	let username = $state('');
	let password = $state('');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem('username', username);
			goto('/blodsukker');
		} else {
			alert('Login fejlet!');
		}
	};

	const goToOpret = () => {
		goto('/opret');
	};

</script>

<h1 class="text-center text-3xl font-bold mb-8"> Login </h1>

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
			placeholder="Kodeord"
			class="input input-bordered w-72"
		/>

		<button class="btn btn-primary w-72" onclick={login}>
			Login
		</button>

		<button class="btn w-72" onclick={goToOpret}>
			Gå til opret bruger
		</button>
	</div>
</div>