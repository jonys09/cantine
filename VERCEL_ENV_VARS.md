# Vercel Environment Variables Setup

This guide explains how to handle Shopify credentials in different scenarios.

---

## 📊 Credential Scenarios

### Scenario A: Deploy NOW (Without Shopify Credentials)
**Best for:** Getting immediate client feedback on design

```
Local Development:
  .env file → Has credentials OR empty
  npm run dev → Works either way

Deployed on Vercel (NO env vars set):
  No .env file (in .gitignore)
  No environment variables set in Vercel
  Code tries to fetch from Shopify → Fails silently
  Fallback products shown instead
  ✅ Store fully functional with hardcoded products
  Client can give feedback on UI/UX
```

---

### Scenario B: Deploy WITH Shopify Credentials
**Best for:** Full product integration from day 1

```
Local Development:
  .env file → Has Shopify credentials
  npm run dev → Fetches real products from Shopify

Deployed on Vercel (WITH env vars set):
  Credentials set in Vercel dashboard
  Code fetches real products from Shopify
  ✅ Live store shows REAL products
  Client sees real pricing, images, etc.
```

---

## 🚀 HOW TO: Add Credentials to Vercel

### Step 1: Deploy to Vercel First
```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/cantine.git
git push -u origin main

# Then go to https://vercel.com/new
# Import your repository
# Deploy
```

### Step 2: Get Your Shopify Credentials
```
1. Go to Shopify Admin: https://admin.shopify.com
2. Store: Cantineco
3. Apps → Install Headless channel
4. Headless → API Credentials
5. Copy these 4 values:
   - PUBLIC_STOREFRONT_API_TOKEN
   - PRIVATE_STOREFRONT_API_TOKEN
   - PUBLIC_STORE_DOMAIN
   - PUBLIC_STOREFRONT_ID
```

### Step 3: Add to Vercel Dashboard
```
1. Go to: https://vercel.com/dashboard
2. Click your "cantine" project
3. Click Settings tab
4. Click Environment Variables (left sidebar)
5. Add these 4 environment variables:

   Name: PUBLIC_STOREFRONT_API_TOKEN
   Value: [paste your token]
   Environments: Production, Preview, Development
   Click Add

   Name: PRIVATE_STOREFRONT_API_TOKEN
   Value: [paste your token - starts with shpat_]
   Environments: Production, Preview, Development
   Click Add

   Name: PUBLIC_STORE_DOMAIN
   Value: cantineco.myshopify.com
   Environments: Production, Preview, Development
   Click Add

   Name: PUBLIC_STOREFRONT_ID
   Value: [paste your ID]
   Environments: Production, Preview, Development
   Click Add
```

### Step 4: Redeploy with New Variables
```
Option A: Via GitHub (Easiest)
  git add .
  git commit -m "Ready for Shopify integration"
  git push origin main
  # Vercel auto-redeploys with new env vars

Option B: Via Vercel Dashboard
  1. Go to Deployments tab
  2. Find latest deployment
  3. Click the ... menu
  4. Click "Redeploy"
  5. Wait 1-2 minutes
```

### Step 5: Verify Real Products Load
```
1. Wait for deployment to complete (check Deployments tab)
2. Open your live URL
3. Go to /shop
4. Should see REAL products from Shopify
5. Check browser console (F12) for no errors
```

---

## 🔄 Workflow: Scenario A → Scenario B

```
PHASE 1: Get Client Feedback (Scenario A)
├─ Deploy to Vercel (no credentials)
├─ Share live URL with client
├─ Client reviews design/layout
├─ You make updates & redeploy
└─ Client approves design

PHASE 2: Add Real Products (Scenario B)
├─ Install Headless channel in Shopify
├─ Get 4 credentials
├─ Add to Vercel environment variables
├─ Redeploy (git push or manual)
├─ Real products now live
├─ Client tests shopping flow
└─ Make final adjustments

PHASE 3: Production Ready
├─ Client satisfied with everything
├─ Transfer store to client
├─ Client upgrades to paid plan
├─ Deploy to Shopify Oxygen
└─ You get recurring revenue share
```

---

## 🔐 Security Best Practices

✅ **DO:**
- Store secrets in Vercel Environment Variables dashboard
- Keep .env in .gitignore
- Use different credentials per environment (local vs production)
- Regenerate tokens if accidentally exposed

❌ **DON'T:**
- Commit .env to git
- Paste credentials in code
- Share credentials in chat/email
- Use development tokens in production

Your project already does this! ✅

---

## 📋 Comparison Table

| Scenario | Local Dev | Vercel Deploy | Products | Speed | Use Case |
|----------|-----------|---------------|----------|-------|----------|
| **A: No Credentials** | Fallback | Fallback | Hardcoded | Instant | Client feedback |
| **B: With Credentials** | Real | Real | From Shopify | Instant | Full integration |

---

## 🆘 Troubleshooting

### "Real products not showing on Vercel"
```
1. Check Vercel dashboard → Environment Variables
2. Verify all 4 variables are set
3. Make sure values don't have extra spaces
4. Go to Deployments tab → Check build logs
5. Redeploy manually if needed
```

### "Getting Shopify API errors"
```
1. Verify credentials are correct
2. Check PUBLIC_STORE_DOMAIN ends with .myshopify.com
3. Check PRIVATE_STOREFRONT_API_TOKEN starts with shpat_
4. Check browser console (F12) for exact error
```

### "Redeploy not picking up new variables"
```
1. Go to Deployments tab
2. Click the ... menu on latest deployment
3. Click "Redeploy"
4. Wait 1-2 minutes for build to complete
5. Check build logs if it fails
```

---

## 🎯 Decision: Which Scenario to Use?

**Choose Scenario A (No Credentials) if:**
- Want immediate feedback on design
- Shopify not fully set up yet
- Want to iterate on UI first

**Choose Scenario B (With Credentials) if:**
- Shopify Headless channel already installed
- Have credentials ready
- Want full integration from day 1

---

## ✅ Verification Checklist

**Before Deployment:**
- [ ] vercel.json exists
- [ ] npm run build works locally
- [ ] All pages work with npm run dev
- [ ] Git push works

**After Deployment (Scenario A):**
- [ ] Vercel deployment succeeds
- [ ] Live URL works
- [ ] Fallback products show
- [ ] Cart works
- [ ] All pages accessible

**After Adding Credentials (Scenario B):**
- [ ] Credentials added to Vercel dashboard
- [ ] Redeploy triggered
- [ ] Build succeeds
- [ ] Real products show
- [ ] Correct pricing displayed
- [ ] Images load from Shopify

---

## 🚀 Ready to Deploy?

You have two clear paths:

**Path A: Deploy NOW for feedback** (5 min)
- Don't set Vercel env vars yet
- Client gives feedback on design
- Later add Shopify credentials

**Path B: Deploy with integration** (30 min total)
- Set up Shopify Headless first
- Add Vercel env vars before deploying
- Client sees real products immediately

**Recommendation:** Path A for faster feedback loop, but either works!

---

*This document explains the exact behavior in each scenario so you know what to expect.*
