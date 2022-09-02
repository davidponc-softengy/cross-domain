import { SessionStatus, sessionStatus } from '$lib/stores/status.store';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { token } = localStorage;

	if (!token) {
		throw redirect(307, '/');
	}

	const payload = token.split('.')[1];
	const decoded = window.atob(payload);
	const parsed = JSON.parse(decoded);

	sessionStatus.set(SessionStatus.Logged);

	return {
		user: {
			name: parsed.name
		}
	};
};
