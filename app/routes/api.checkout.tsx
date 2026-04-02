import type { ActionFunctionArgs } from 'react-router';

/**
 * POST /api/checkout
 * Body: { items: Array<{ variantId: string|null, quantity: number, name: string }> }
 *
 * Creates a Shopify cart via the Storefront API and returns { checkoutUrl }.
 * Items without a variantId (fallback/hardcoded products) are skipped.
 */
export async function action({ request, context }: ActionFunctionArgs) {
    if (request.method !== 'POST') {
        return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const env = context.env as Env;

    if (!env.PUBLIC_STOREFRONT_API_TOKEN || !env.PUBLIC_STORE_DOMAIN) {
        return Response.json({ error: 'Shopify not configured' }, { status: 503 });
    }

    let body: { items: Array<{ variantId: string | null; quantity: number; name: string }> };
    try {
        body = await request.json() as typeof body;
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Only include items that have a Shopify variant ID
    const lines = (body.items || [])
        .filter(i => i.variantId)
        .map(i => ({ merchandiseId: i.variantId as string, quantity: i.quantity }));

    if (lines.length === 0) {
        return Response.json(
            { error: 'no_shopify_items', message: 'None of your cart items have Shopify variant IDs. Add real products from the shop.' },
            { status: 400 }
        );
    }

    const mutation = `
        mutation CartCreate($lines: [CartLineInput!]!) {
            cartCreate(input: { lines: $lines }) {
                cart { checkoutUrl }
                userErrors { field message }
            }
        }
    `;

    const response = await fetch(
        `https://${env.PUBLIC_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': env.PUBLIC_STOREFRONT_API_TOKEN,
            },
            body: JSON.stringify({ query: mutation, variables: { lines } }),
        }
    );

    if (!response.ok) {
        return Response.json({ error: 'Shopify API error' }, { status: 502 });
    }

    const data = await response.json() as any;
    const userErrors = data?.data?.cartCreate?.userErrors;
    if (userErrors?.length > 0) {
        return Response.json({ error: userErrors[0].message }, { status: 400 });
    }

    const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) {
        return Response.json({ error: 'Could not get checkout URL from Shopify' }, { status: 500 });
    }

    return Response.json({ checkoutUrl });
}
