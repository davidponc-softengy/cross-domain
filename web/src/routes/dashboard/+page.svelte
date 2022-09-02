<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { APP_NAME } from '$lib/constants';
	import { SessionStatus, sessionStatus } from '$lib/stores/status.store';
	import { Actions, AuthHub } from '$lib/utils/auth-hub';
	import type { PageData } from './$types';

	$: if ($sessionStatus === SessionStatus.NotLogged) {
		invalidateAll();
	}

	export let data: PageData;
</script>

<h1>Dashboard Page on {APP_NAME}</h1>
<section>
	<p>Welcome to {data.user.name}</p>
	<button on:click={() => AuthHub.send(Actions.Logout)}>Salir</button>
</section>
