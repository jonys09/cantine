import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createContentSecurityPolicy } from '@shopify/hydrogen';
import type { AppLoadContext, EntryContext } from 'react-router';

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    routerContext: EntryContext,
    context: AppLoadContext,
) {
    const { nonce, header, NonceProvider } = createContentSecurityPolicy({
        defaultSrc: [
            "'self'",
            "https://cdn.shopify.com",
            "https://shopify.com",
            "http://localhost:*",
        ],
        styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://cdn.shopify.com",
            "http://localhost:*",
            "https://fonts.googleapis.com",
        ],
        fontSrc: [
            "'self'",
            "https://fonts.gstatic.com",
            "http://localhost:*",
            "data:",
        ],
        imgSrc: [
            "'self'",
            "https://cdn.shopify.com",
            "http://localhost:*",
            "data:",
            "https://images.unsplash.com",
            "https://*.pinterest.com",
            "https://*.pinimg.com",
        ],
        scriptSrc: [
            "'self'",
            "https://cdn.shopify.com",
            "https://shopify.com",
            "http://localhost:*",
            "https://assets.pinterest.com",
            "https://*.pinterest.com",
        ],
        frameSrc: [
            "'self'",
            "https://*.pinterest.com",
        ],
        shop: {
            checkoutDomain: (context.env as any).PUBLIC_STORE_DOMAIN || '',
            storeDomain: (context.env as any).PUBLIC_STORE_DOMAIN || '',
        },
    });

    const body = await renderToReadableStream(
        <NonceProvider>
            <ServerRouter context={routerContext} url={request.url} nonce={nonce} />
        </NonceProvider>,
        {
            nonce,
            signal: request.signal,
            onError(error) {
                console.error(error);
                responseStatusCode = 500;
            },
        },
    );

    if (isbot(request.headers.get('user-agent'))) {
        await body.allReady;
    }

    responseHeaders.set('Content-Type', 'text/html');
    // Only enforce CSP in production — in dev, Vite HMR injects inline scripts
    // that don't carry the nonce, which silently prevents React from hydrating
    // (browsers ignore 'unsafe-inline' when a nonce is present in the CSP).
    if (process.env.NODE_ENV === 'production') {
        // Hydrogen's createContentSecurityPolicy joins multi-value directives with \n
        // which is valid for Cloudflare Workers but Node.js/undici rejects newlines in headers
        const sanitizedHeader = header.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim();
        responseHeaders.set('Content-Security-Policy', sanitizedHeader);
    }

    return new Response(body, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}
