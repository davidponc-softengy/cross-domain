<script lang="ts">
	import { onMount } from 'svelte';

	enum Actions {
		Loaded,
		Syncronize,
		Login,
		Logout
	}

	const targetOrigin = '*';
	const fakeToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

	const handleMessages = (event: MessageEvent) => {
		const { action, payload } = event.data;

		if (action === Actions.Syncronize) {
			event.source?.postMessage(
				{ action, payload: { token: localStorage.getItem('token') } },
				// @ts-ignore
				targetOrigin
			);
		}

		if (action === Actions.Login) {
			const { email, password } = payload;
			// const clientId = generateClientIdentifier();
			// fetch to API Gateway with credentials and clientId
			if (Math.random() > 0.4) {
				// If response failed, send message with error
				// message error depends of status type
				// 401 => Las credenciales no son validas
				// 500 => Hubo un problema con su acceso, intente mas tarde.
				event.source?.postMessage(
					{ action, payload: { error: 'Las credenciales no son validas' } },
					// @ts-ignore
					targetOrigin
				);
				return;
			}

			// If responses success, get token to save and send to origin
			localStorage.setItem('token', fakeToken);

			event.source?.postMessage(
				{ action, payload: { token: fakeToken } },
				// @ts-ignore
				targetOrigin
			);
		}

		if (action === Actions.Logout) {
			localStorage.removeItem('token');

			event.source?.postMessage(
				{ action, payload: {} },
				// @ts-ignore
				targetOrigin
			);
		}
	};

	onMount(() => {
		parent.postMessage({ action: Actions.Loaded }, targetOrigin);
	});
</script>

<svelte:window on:message={handleMessages} />
