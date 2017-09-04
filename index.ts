import { SERVER_HTTP_PROVIDERS } from './src/http';
import { HttpClient } from './src/common-http';
import { Provider, ReflectiveInjector } from 'injection-js';
import { HttpXhrBackend } from './src/common-http/src/xhr';
import { HttpBackend } from './src/common-http/src/backend';
import { Type } from 'injection-js/facade/type';
import { HTTP_INTERCEPTORS } from './src/common-http/src/interceptor';

require('zone.js');

export const HTTP_CLIENT_PROVIDERS: Provider[] = [
	...SERVER_HTTP_PROVIDERS,
	HttpClient,
	HttpXhrBackend,
	{provide: HttpBackend, useExisting: HttpXhrBackend},
];

export interface CreateHttpClientOptions {
	interceptors?: Type<any>[];
}

export function createHttpClient(options: CreateHttpClientOptions = {}): HttpClient {
	const providers = [
		...HTTP_CLIENT_PROVIDERS,
		...(options.interceptors
			? options.interceptors.map(interceptor =>
				({ provide: HTTP_INTERCEPTORS, useClass: interceptor, multi: true })
			)
			: []
		)
	];
	return ReflectiveInjector.resolveAndCreate(providers).get(HttpClient);
}

export * from './src/http';
export * from './src/common-http';
