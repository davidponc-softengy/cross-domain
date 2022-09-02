import { writable } from 'svelte/store';

export enum SessionStatus {
	Unknown = 'UNKNOWN',
	NotLogged = 'NOT_LOGGED',
	Logged = 'LOGGED'
}

export const sessionStatus = writable(SessionStatus.Unknown);
export const withPermissions = writable('LOADING');
