import { createStorefrontClient, type StorefrontClient } from '@shopify/hydrogen-react';

/**
 * Create Shopify Storefront client for server-side queries
 * Uses PRIVATE_STOREFRONT_API_TOKEN for secure requests
 */
export function createShopifyClient(env: Env): StorefrontClient {
  return createStorefrontClient({
    publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    apiVersion: '2024-01',
  });
}

/**
 * Query products from Shopify Storefront API
 * Fetches featured or all products with pricing and images
 */
export async function getProducts(
  client: StorefrontClient,
  first: number = 10,
  query?: string,
) {
  const productQuery = `
    query GetProducts($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            handle
            title
            description
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
            metafields(identifiers: [
              { namespace: "custom", key: "size" }
              { namespace: "custom", key: "badge" }
              { namespace: "custom", key: "details" }
            ]) {
              key
              value
            }
          }
        }
      }
    }
  `;

  try {
    const response = await client.request(productQuery, {
      variables: {
        first,
        query,
      },
    });

    return response.data?.products?.edges || [];
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return [];
  }
}

/**
 * Format Shopify product for display
 * Converts API response to UI-friendly format
 */
export function formatProduct(edge: any) {
  const node = edge.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = variant?.price?.amount || 0;
  const compareAtPrice = variant?.compareAtPrice?.amount;

  return {
    key: node.handle,
    shopifyId: node.id,
    variantId: variant?.id,
    name: node.title,
    desc: node.description || '',
    price: `$${parseFloat(price).toFixed(2)}`,
    priceRaw: parseFloat(price),
    image: node.featuredImage?.url,
    imageAlt: node.featuredImage?.altText || node.title,
    savings: compareAtPrice ? compareAtPrice - price : null,
    metafields: node.metafields || [],
  };
}

/**
 * Get metafield value by key
 */
export function getMetafieldValue(metafields: any[], key: string) {
  const field = metafields?.find((f: any) => f.key === key);
  if (!field) return null;
  try {
    return JSON.parse(field.value);
  } catch {
    return field.value;
  }
}
