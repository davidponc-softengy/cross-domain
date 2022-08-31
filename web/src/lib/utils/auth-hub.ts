import { loginErrorResponse } from '$lib/stores/login.store';
import { SessionStatus, status } from '$lib/stores/status.store';

const AUTH_HUB_URL =
	process.env.NODE_ENV === 'production' ? 'http://auth-hub.test' : 'http://localhost:5174';

let node: HTMLIFrameElement;

export enum Actions {
	Loaded,
	Syncronize,
	Login,
	Logout
}

function initialize() {
	node = document.createElement('iframe');
	node.setAttribute('src', AUTH_HUB_URL);
	node.setAttribute('class', 'invisible absolute -top-full hidden');
	node.setAttribute('style', 'display:none;');
	document.documentElement.insertAdjacentElement('beforeend', node);
}

function destroy() {
	document.documentElement.removeChild(node);
}

const handleMessages = async (event: MessageEvent) => {
	const { action, payload } = event.data;

	if (action === Actions.Loaded) {
		send(Actions.Syncronize);
	}

	if (action === Actions.Syncronize) {
		if (payload.token) {
			localStorage.setItem('token', payload.token);
			status.set(SessionStatus.Logged);
		} else {
			localStorage.removeItem('token');
			status.set(SessionStatus.NotLogged);
		}
	}

	if (action === Actions.Login) {
		if (payload.error) {
			loginErrorResponse.set(payload.error);
			return;
		}

		localStorage.setItem('token', payload.token);
		status.set(SessionStatus.Logged);
	}

	if (action === Actions.Logout) {
		localStorage.removeItem('token');
		status.set(SessionStatus.NotLogged);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function send(action: Actions, payload?: any) {
	node.contentWindow?.postMessage({ action, payload }, AUTH_HUB_URL);
}

export const AuthHub = { initialize, destroy, handleMessages, send };
