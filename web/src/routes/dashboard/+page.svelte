<script lang="ts">
	import { SessionStatus, status } from '$lib/stores/status.store';
	import { Actions, AuthHub } from '$lib/utils/auth-hub';
	import type { PageData } from './$types';

	$: if ($status === SessionStatus.NotLogged) {
		window.location.href = '/';
	}

	export let data: PageData;
</script>

<h1>Dashboard Page</h1>
<section>
	<p>Welcome to {data.user.name}</p>
	<button on:click={() => AuthHub.send(Actions.Logout)}>Salir</button>
</section>
