import { SERVER_HTTP_PROVIDERS } from './src/http';
import { HttpClient } from './src/common-http';
import { Provider, ReflectiveInjector } from 'injection-js';
import { HttpXhrBackend } from './src/common-http/src/xhr';
import { HttpBackend } from './src/common-http/src/backend';

require('zone.js');

export const HTTP_CLIENT_PROVIDERS: Provider[] = [
	...SERVER_HTTP_PROVIDERS,
	HttpClient,
	HttpXhrBackend,
	{provide: HttpBackend, useExisting: HttpXhrBackend},
];

export function createHttpClient(): HttpClient {
	return ReflectiveInjector.resolveAndCreate(HTTP_CLIENT_PROVIDERS).get(HttpClient);
}

export * from './src/http';
export * from './src/common-http';
