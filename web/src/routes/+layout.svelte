<script lang="ts">
	import { SessionStatus, status } from '$lib/stores/status.store';
	import { AuthHub } from '$lib/utils/auth-hub';

	AuthHub.initialize();
</script>

<svelte:window on:message={AuthHub.handleMessages} />

{#if $status === SessionStatus.Unknown}
	<p>Loading...</p>
{:else}
	<slot />
{/if}
