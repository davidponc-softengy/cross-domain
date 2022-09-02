<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	enum Actions {
		Loaded = 'LOADED',
		Syncronize = 'SYNCRONIZE',
		Login = 'LOGIN',
		Logout = 'LOGOUT'
	}

	const TARGET_ORIGIN = '*';
	const TOKEN =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

	if ($page.url.searchParams.get('sync')) {
		window.opener.parent.postMessage(
			{ action: Actions.Syncronize, payload: { token: localStorage.getItem('token') } },
			TARGET_ORIGIN
		);
		window.close();
	}

	const handleMessages = (event: MessageEvent) => {
		const { action, payload } = event.data;

		if (action === Actions.Syncronize) {
			event.source?.postMessage(
				{ action, payload: { token: localStorage.getItem('token') } },
				// @ts-ignore
				TARGET_ORIGIN
			);
		}

		if (action === Actions.Login) {
			const { email, password } = payload;
			// const clientId = generateClientIdentifier();
			// fetch to API Gateway with credentials and clientId
			if (Math.random() > 0.5) {
				// If response failed, send message with error
				// message error depends of status type
				// 401 => Las credenciales no son validas
				// 500 => Hubo un problema con su acceso, intente mas tarde.
				event.source?.postMessage(
					{ action, payload: { error: 'Las credenciales no son validas' } },
					// @ts-ignore
					TARGET_ORIGIN
				);
				return;
			}

			// If responses success, get token to save and send to origin
			localStorage.setItem('token', TOKEN);

			event.source?.postMessage(
				{ action, payload: { token: TOKEN } },
				// @ts-ignore
				TARGET_ORIGIN
			);
		}

		if (action === Actions.Logout) {
			localStorage.removeItem('token');

			event.source?.postMessage(
				{ action, payload: {} },
				// @ts-ignore
				TARGET_ORIGIN
			);
		}
	};

	onMount(async () => {
		const hasPermissions = document.hasStorageAccess ? await document.hasStorageAccess() : true;
		parent.postMessage({ action: Actions.Loaded, payload: { hasPermissions } }, TARGET_ORIGIN);
	});
</script>

<svelte:window on:message={handleMessages} />
