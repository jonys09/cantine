import {
    createRequestHandler,
    createHydrogenContext,
    storefrontRedirect,
} from '@shopify/hydrogen';
import { AppSession } from '~/lib/session.server';

export default {
    async fetch(
        request: Request,
        env: Env,
        executionContext: ExecutionContext,
    ): Promise<Response> {
        try {
            const session = await AppSession.init(request, [env.SESSION_SECRET]);

            const hydrogenContext = createHydrogenContext({
                env,
                request,
                cache: await caches.open('hydrogen'),
                waitUntil: executionContext.waitUntil.bind(executionContext),
                session,
                i18n: { language: 'EN', country: 'US' },
            });

            const handleRequest = createRequestHandler({
                build: await import('virtual:react-router/server-build'),
                mode: process.env.NODE_ENV,
                getLoadContext() {
                    return hydrogenContext;
                },
            });

            const response = await handleRequest(request);

            if (session.isPending) {
                response.headers.set('Set-Cookie', await session.commit());
            }

            if (response.status === 404) {
                return storefrontRedirect({
                    request,
                    response,
                    storefront: hydrogenContext.storefront,
                });
            }

            return response;
        } catch (error) {
            console.error(error);
            return new Response('An unexpected error occurred', { status: 500 });
        }
    },
};
