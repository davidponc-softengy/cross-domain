<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { SessionStatus, sessionStatus, withPermissions } from '$lib/stores/status.store';
	import { AuthHub } from '$lib/utils/auth-hub';

	const LINKS = dev
		? [
				`http://${$page.url.hostname}:5174`,
				`http://${$page.url.hostname}:5175`,
				`http://${$page.url.hostname}:5176`
		  ]
		: ['http://app1.test', 'http://app2.test', 'http://app3.test'];

	AuthHub.initialize();
</script>

<svelte:window on:message={AuthHub.handleMessages} />

{#if $withPermissions === 'PERMITIED'}
	<nav style="padding:0.75rem 1rem;display:flex;gap:1rem;align-items:center;">
		{#each LINKS as link, i (i)}
			<a href={link}>App {i + 1}</a>
		{/each}
	</nav>
	{#if $sessionStatus === SessionStatus.Unknown}
		<p>Loading...</p>
	{:else}
		<slot />
	{/if}
{:else if $withPermissions === 'DENIED'}
	<h1>debe permitir el acceso a su cuenta bancaria 🥸</h1>
{:else}
	comprando permisos...
{/if}
