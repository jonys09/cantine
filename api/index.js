import { createRequestHandler } from '@react-router/express';
import { createHydrogenContext, InMemoryCache } from '@shopify/hydrogen';
import { createCookieSessionStorage } from 'react-router';
import express from 'express';
import * as build from '../dist/server/index.js';

// AppSession inlined as plain JS to avoid TypeScript source imports at runtime
class AppSession {
    isPending = false;
    #sessionStorage;
    #session;

    constructor(sessionStorage, session) {
        this.#sessionStorage = sessionStorage;
        this.#session = session;
    }

    static async init(request, secrets) {
        const storage = createCookieSessionStorage({
            cookie: {
                name: 'session',
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                secrets,
            },
        });
        const session = await storage
            .getSession(request.headers.get('Cookie'))
            .catch(() => storage.getSession());
        return new this(storage, session);
    }

    get has() { return this.#session.has; }
    get get() { return this.#session.get; }
    get flash() { return this.#session.flash; }
    get unset() { this.isPending = true; return this.#session.unset; }
    get set() { this.isPending = true; return this.#session.set; }
    destroy() { return this.#sessionStorage.destroySession(this.#session); }
    commit() { this.isPending = false; return this.#sessionStorage.commitSession(this.#session); }
}

const app = express();
app.disable('x-powered-by');

// Serve immutable hashed assets and other static files
app.use('/assets', express.static('dist/client/assets', { immutable: true, maxAge: '1y' }));
app.use(express.static('dist/client', { maxAge: '1h' }));

// All SSR requests handled by React Router with Hydrogen context
app.all('*', createRequestHandler({
    build,
    async getLoadContext(req) {
        const env = {
            SESSION_SECRET: process.env.SESSION_SECRET ?? '',
            PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN ?? '',
            PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN ?? '',
            PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN ?? '',
            PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID ?? '',
            PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN ?? '',
        };

        const protocol = req.headers['x-forwarded-proto'] ?? 'https';
        const host = req.headers['x-forwarded-host'] ?? req.headers.host;
        const url = `${protocol}://${host}${req.url}`;
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
            if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
        }
        const webRequest = new Request(url, { method: req.method, headers });

        const session = await AppSession.init(webRequest, [env.SESSION_SECRET]);

        return createHydrogenContext({
            env,
            request: webRequest,
            cache: new InMemoryCache(),
            waitUntil: () => {},
            session,
            i18n: { language: 'EN', country: 'US' },
        });
    },
}));

export default app;
