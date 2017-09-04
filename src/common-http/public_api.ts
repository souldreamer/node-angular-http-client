/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { HttpBackend, HttpHandler } from './src/backend';
import { HttpInterceptor, HttpInterceptorHandler } from './src/interceptor';

export { HttpBackend, HttpHandler } from './src/backend';
export { HttpClient } from './src/client';
export { HttpHeaders } from './src/headers';
export { HTTP_INTERCEPTORS, HttpInterceptor } from './src/interceptor';
export { HttpParameterCodec, HttpParams, HttpUrlEncodingCodec } from './src/params';
export { HttpRequest } from './src/request';
export {
	HttpDownloadProgressEvent,
	HttpErrorResponse,
	HttpEvent,
	HttpEventType,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpResponseBase,
	HttpSentEvent,
	HttpUserEvent
} from './src/response';
export { HttpXhrBackend, XhrFactory } from './src/xhr';
export { HttpXsrfTokenExtractor } from './src/xsrf';

/**
 * Constructs an `HttpHandler` that applies a bunch of `HttpInterceptor`s
 * to a request before passing it to the given `HttpBackend`.
 *
 * Meant to be used as a factory function within `HttpClientModule`.
 *
 * @stable
 */
export function interceptingHandler(
	backend: HttpBackend, interceptors: HttpInterceptor[] | null = []): HttpHandler {
	if (!interceptors) {
		return backend;
	}
	return interceptors.reduceRight(
		(next, interceptor) => new HttpInterceptorHandler(next, interceptor), backend);
}
