import { dev } from '$app/environment';
import { loginErrorResponse } from '$lib/stores/login.store';
import { SessionStatus, sessionStatus, withPermissions } from '$lib/stores/status.store';

const AUTH_HUB_URL = dev ? 'http://localhost:5173' : 'http://auth-hub.test';

let node: HTMLIFrameElement;

export enum Actions {
	Loaded = 'LOADED',
	Syncronize = 'SYNCRONIZE',
	Login = 'LOGIN',
	Logout = 'LOGOUT'
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
		if (!payload.hasPermissions) {
			const hub = window.open(`${AUTH_HUB_URL}/?sync=true`);
			if (!hub || hub.closed || typeof hub.closed == 'undefined') {
				withPermissions.set('DENIED');
			}

			return;
		}

		send(Actions.Syncronize);
	}

	if (action === Actions.Syncronize) {
		if (payload.token) {
			localStorage.setItem('token', payload.token);
			sessionStatus.set(SessionStatus.Logged);
		} else {
			localStorage.removeItem('token');
			sessionStatus.set(SessionStatus.NotLogged);
		}
		withPermissions.set('PERMITIED');
	}

	if (action === Actions.Login) {
		if (payload.error) {
			loginErrorResponse.set(payload.error);
			return;
		}

		localStorage.setItem('token', payload.token);
		sessionStatus.set(SessionStatus.Logged);
	}

	if (action === Actions.Logout) {
		localStorage.removeItem('token');
		sessionStatus.set(SessionStatus.NotLogged);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function send(action: Actions, payload?: any) {
	node.contentWindow?.postMessage({ action, payload }, AUTH_HUB_URL);
}

export const AuthHub = { initialize, destroy, handleMessages, send };
