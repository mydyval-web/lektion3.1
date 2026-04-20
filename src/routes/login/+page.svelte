<script>
	import { createSubscriber } from 'svelte/reactivity';
	import { goto } from '$app/navigation';

	let username = $state('user');
	let password = $state('password');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			goto('/admin');
		} else {
			alert('Login fejlet!');
		}
	};
</script>

<h1 class="text-2xl font-bold">Login</h1>

<div>
	<input
		type="text"
		bind:value={username}
		placeholder="Indtast Email"
		class="input"
	/>
</div>

<div>
	<input
		type="password"
		bind:value={password}
		placeholder="Indtast Password"
		class="input"
	/>
</div>

<div>
	<button class="btn btn-primary" on:click={login}>
		Login
	</button>
</div>