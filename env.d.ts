/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/storefront-api-types" />

import type { HydrogenCart, HydrogenSessionData } from '@shopify/hydrogen';

declare global {
    const process: { env: { NODE_ENV: 'production' | 'development' } };

    interface Env {
        SESSION_SECRET: string;
        PUBLIC_STOREFRONT_API_TOKEN: string;
        PRIVATE_STOREFRONT_API_TOKEN: string;
        PUBLIC_STORE_DOMAIN: string;
        PUBLIC_STOREFRONT_ID: string;
        PUBLIC_CHECKOUT_DOMAIN?: string;
        PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
        PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
        SHOP_ID?: string;
    }
}

declare module 'react-router' {
    interface AppLoadContext {
        env: Env;
        cart: HydrogenCart;
        storefront: any;
        session: any;
        waitUntil: ExecutionContext['waitUntil'];
    }
}
