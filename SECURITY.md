# Security & Deployment Guide

## Vercel Deployment Security

### ✅ Current Setup (Secure)

All sensitive environment variables are stored in **Vercel's encrypted vault**:

- `SESSION_SECRET` - Session signing key (encrypted)
- `PUBLIC_STOREFRONT_API_TOKEN` - Shopify Storefront API token (encrypted)
- `PRIVATE_STOREFRONT_API_TOKEN` - Shopify Admin API token (encrypted)  
- `PUBLIC_STORE_DOMAIN` - Shopify store domain (encrypted)

These are **never committed to Git** and are injected at runtime by Vercel.

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Shopify credentials from:
   - Shopify Admin → Settings → Apps & sales channels → Develop apps

3. Never commit `.env` to Git (it's in `.gitignore`)

### Deployment

```bash
# Environment variables are automatically pulled from Vercel
vercel --prod --yes
```

### Security Best Practices

1. **Never pass secrets via CLI flags** - use `vercel env add` or dashboard
2. **Don't expose Admin API tokens to the client** - `PRIVATE_*` vars aren't sent to browser
3. **Rotate secrets periodically** - especially if accessed by multiple people
4. **Use read-only API tokens** when possible - Storefront API is read-only by design

### Shopify Token Types

- **`PUBLIC_STOREFRONT_API_TOKEN`** - Read-only, safe to expose in client code. Used to fetch products, cart, etc.
- **`PRIVATE_STOREFRONT_API_TOKEN`** - Admin token, kept secret server-side only. Used for mutations and sensitive operations.

### If Secrets Are Compromised

1. Regenerate in Shopify Admin
2. Update Vercel environment variables
3. Redeploy: `vercel --prod --yes`

### Monitoring

Check environment variables are set:
```bash
vercel env list
```

Verify deployment connects to Shopify:
```bash
curl https://cantine-eight.vercel.app/shop
# Should load products from your Shopify store
```

## Live URL

**Production:** https://cantine-eight.vercel.app
