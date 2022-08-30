<script lang="ts">
	import { loginErrorResponse } from '$lib/stores/login.store';
	import { SessionStatus, status } from '$lib/stores/status.store';
	import { Actions, AuthHub } from '$lib/utils/auth-hub';

	$: if ($status === SessionStatus.Logged) {
		window.location.href = '/dashboard';
	}
</script>

<h1>Welcome to SvelteKit</h1>

<section>
	<button
		on:click={() => AuthHub.send(Actions.Login, { email: 'qwer@qwer.com', password: '123456' })}
		>Iniciar</button
	>
	{#if $loginErrorResponse}
		<p>{$loginErrorResponse}</p>
	{/if}
</section>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
