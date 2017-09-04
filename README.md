# Angular4's HttpClient for node.js

Just install the package in your project and if you use
`injection-js`, import `HTTP_CLIENT_PROVIDERS` and add
them to your injector's providers.

If you want to use the `HttpClient` without using `injection-js`
in your own project, importing and running `createHttpClient()`
will create and resolve the `HttpClient` for you, giving you an
instance of it to use directly.

**Note**:`HttpClient` taken from `Angular 5.0.0-beta.5`,
and made to work independently of Angular.
