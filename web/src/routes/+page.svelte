<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { APP_NAME } from '$lib/constants';
	import { loginErrorResponse } from '$lib/stores/login.store';
	import { SessionStatus, sessionStatus } from '$lib/stores/status.store';
	import { Actions, AuthHub } from '$lib/utils/auth-hub';

	$: if ($sessionStatus === SessionStatus.Logged) {
		invalidateAll();
	}
</script>

<h1>Welcome to SvelteKit on {APP_NAME}</h1>
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
