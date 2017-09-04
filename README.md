# Angular4's HttpClient for node.js

Just install the package in your project and if you use
`injection-js`, import `HTTP_CLIENT_PROVIDERS` and add
them to your injector's providers.

If you want to use the `HttpClient` without using `injection-js`
in your own project, importing and running `createHttpClient()`
will create and resolve the `HttpClient` for you, giving you an
instance of it to use directly. It takes an _options_ object within
which the `interceptors` key is an array of `HttpInterceptor`s.

**Note**: `HttpClient` taken from `Angular 5.0.0-beta.5`,
and made to work independently of Angular.

### Examples

#### 1. `injection-js`

```typescript
@Injectable()
class TestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.warn('intercepted');
        return next.handle(request);
    }
}

@Injectable()
class GoogleTest {
    constructor(private httpClient: HttpClient) {}
    
    run() {
        this.httpClient.get('http://www.google.com', {responseType: 'text'}).subscribe(
            res => console.dir(res)
        );
    }
}

const injector = ReflectiveInjector.resolveAndCreate([
    ...HTTP_CLIENT_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: TestInterceptor, multi: true },
    GoogleTest
]);

const googleTest = injector.get(GoogleTest);

googleTest.run();
```

#### 2. Non-IoC usage

```typescript
class TestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.warn('intercepted');
        return next.handle(request);
    }
}

const httpClient: HttpClient = createHttpClient({interceptors: [TestInterceptor]});
httpClient.get('http://www.google.com', {responseType: 'text'}).subscribe(
    res => console.dir(res)
);
```
