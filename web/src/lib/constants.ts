import { dev } from '$app/environment';

export const APP_NAME = dev ? window.location.port : window.location.hostname;
