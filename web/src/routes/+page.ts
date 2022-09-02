import { SessionStatus, sessionStatus } from '$lib/stores/status.store';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { token } = localStorage;

	if (token) {
		throw redirect(307, '/dashboard');
	}

	sessionStatus.set(SessionStatus.NotLogged);
};
