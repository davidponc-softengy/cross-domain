import { SessionStatus, status } from '$lib/stores/status.store';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const { token } = localStorage;

	if (!token) {
		throw redirect(307, '/');
	}

	const payload = token.split('.')[1];
	const decoded = atob(payload);
	const parsed = JSON.parse(decoded);

	status.set(SessionStatus.Logged);

	return {
		user: {
			name: parsed.name
		}
	};
};
