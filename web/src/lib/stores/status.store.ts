import { writable } from 'svelte/store';

export enum SessionStatus {
	Unknown,
	NotLogged,
	Logged
}

export const status = writable(SessionStatus.Unknown);
