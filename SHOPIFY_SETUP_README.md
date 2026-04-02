# Cantine Shopify Hydrogen Storefront - Setup Guide

## Current Status ✅

Your Cantine project is a **Hydrogen storefront** and is ready to connect to your Shopify store.

### What's Already Done:
- ✅ Hydrogen framework installed (v2026.1.1)
- ✅ React Router v7 configured
- ✅ TypeScript setup complete
- ✅ Vite build tool configured
- ✅ SESSION_SECRET already set in `.env`
- ✅ All npm dependencies installed

### What You Need to Do Now:
- ⏳ Install Headless channel in Shopify admin
- ⏳ Get Storefront API credentials
- ⏳ Add credentials to `.env` file
- ⏳ Test the connection

---

## Step-by-Step Setup

### Step 1: Go to Your Shopify Admin
```
URL: https://admin.shopify.com
Store: Cantineco (cantineco.myshopify.com)
```

### Step 2: Install Headless Channel
1. Click **Apps and sales channels** (left sidebar)
2. Click **Add app or sales channel** (top right)
3. Search for **"Headless"**
4. Click **Add app** to install it

### Step 3: Get Your API Credentials
1. Go to **Apps and sales channels** → **Headless**
2. Click on **API Credentials** tab
3. Copy these 4 values:

```
PUBLIC_STOREFRONT_API_TOKEN = [copy this]
PRIVATE_STOREFRONT_API_TOKEN = [copy this - starts with shpat_]
PUBLIC_STORE_DOMAIN = [copy this - looks like: cantineco.myshopify.com]
PUBLIC_STOREFRONT_ID = [copy this - a number or ID]
```

### Step 4: Add Credentials to Your Project

**Option A: Interactive Script (Recommended)**
```bash
node setup-credentials.js
```
Then paste your 4 credentials when prompted.

**Option B: Manual Edit**
1. Open `.env` file in your editor
2. Find these lines and fill them in:
```
PUBLIC_STOREFRONT_API_TOKEN=paste_here
PRIVATE_STOREFRONT_API_TOKEN=paste_here
PUBLIC_STORE_DOMAIN=paste_here
PUBLIC_STOREFRONT_ID=paste_here
```

### Step 5: Start Development Server
```bash
npm run dev
```

You should see:
```
✓ Hydrogen app ready at http://localhost:3000
```

### Step 6: Verify Connection
1. Open http://localhost:3000 in your browser
2. You should see your store loading
3. Check browser console (F12) for any errors
4. If products show up, you're connected! ✅

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `SESSION_SECRET` | Session encryption (already set) | `4611a72dafc...` |
| `PUBLIC_STOREFRONT_API_TOKEN` | Public API token (from Headless) | `d8f2a1b...` |
| `PRIVATE_STOREFRONT_API_TOKEN` | Private API token (from Headless) | `shpat_400734...` |
| `PUBLIC_STORE_DOMAIN` | Your Shopify store URL | `cantineco.myshopify.com` |
| `PUBLIC_STOREFRONT_ID` | Storefront resource ID | `1000111435` |

---

## Troubleshooting

### Issue: "Headless channel not found"
**Solution:**
- Make sure you're logged into the correct store (Cantineco)
- Headless is free and available for all stores
- Try refreshing the page

### Issue: "No API Credentials shown"
**Solution:**
- Look for "Configuration" or "Settings" tab
- You may need to create a storefront first
- Click "Add storefront" if you see it

### Issue: "npm run dev fails"
**Solution:**
- Make sure all credentials in `.env` are filled in
- Run: `npm install` to reinstall dependencies
- Check that SESSION_SECRET is also set

### Issue: "Cannot connect to store"
**Solution:**
- Verify all 4 credentials are correct (no extra spaces)
- Make sure PUBLIC_STORE_DOMAIN ends with `.myshopify.com`
- Try: `cat .env` to check what's actually in the file

---

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Setup credentials interactively
node setup-credentials.js

# Check environment variables
cat .env
```

---

## Next Steps After Connection

Once you're connected and seeing your store data:

1. **Replace Hardcoded Products**
   - Currently products in `app/routes/shop.tsx` are hardcoded
   - Update to fetch from Shopify Storefront API

2. **Wire Checkout Button**
   - Current checkout button doesn't connect to Shopify
   - Integrate Shopify Cart API

3. **Add Customer Accounts** (optional)
   - Set up login/signup with Shopify
   - Requires additional credentials

4. **Deploy to Shopify Oxygen** (when client upgrades to paid plan)
   - Run: `shopify hydrogen deploy`
   - Your store goes live on Shopify's global infrastructure

---

## Support

- Shopify Hydrogen Docs: https://shopify.dev/docs/storefronts/headless/hydrogen
- Headless Channel Setup: https://shopify.dev/docs/storefronts/headless/bring-your-own-stack
- Shopify API Reference: https://shopify.dev/api/storefront

---

**You're almost there! 🚀 Go get those credentials from Shopify admin and run `node setup-credentials.js`**
