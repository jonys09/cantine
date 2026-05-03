const token = '6d08f0f4c07c65dd4a3fa3ef1231315e';
const domain = 'cantineco.myshopify.com';

async function fetchProducts() {
  const query = `
    query {
      products(first: 10) {
        edges {
            node {
                handle
                title
                description
            }
        }
      }
    }
  `;
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  });
  return await res.json();
}

(async () => {
  console.log(JSON.stringify(await fetchProducts(), null, 2));
})();
