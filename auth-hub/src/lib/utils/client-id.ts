export function generateClientIdentifier() {
	const p = window.navigator.plugins.length;
	const m = window.navigator.mimeTypes.length;
	const fingerprint = window.navigator.userAgent.replace(/\W+/gi, '').split('').reverse().join('');

	return window.btoa(`${p}${fingerprint}${m}`);
}
