#!/usr/bin/env node

/**
 * Shopify Headless Credential Setup Helper
 * 
 * This script helps you validate and set up your Storefront API credentials
 * after installing the Headless channel in your Shopify admin.
 * 
 * Usage:
 *   node setup-credentials.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function setupCredentials() {
  console.log('\n========================================');
  console.log('  Shopify Headless Credential Setup');
  console.log('========================================\n');

  console.log('Before proceeding, make sure you have:');
  console.log('1. Installed the Headless channel in your Shopify admin');
  console.log('2. Gone to Apps → Headless → API Credentials');
  console.log('3. Copied all 4 credentials\n');

  const token1 = await question('Enter PUBLIC_STOREFRONT_API_TOKEN: ');
  const token2 = await question('Enter PRIVATE_STOREFRONT_API_TOKEN (starts with shpat_): ');
  const domain = await question('Enter PUBLIC_STORE_DOMAIN (e.g., cantineco.myshopify.com): ');
  const storefront = await question('Enter PUBLIC_STOREFRONT_ID: ');

  // Validate
  if (!token1 || !token2 || !domain || !storefront) {
    console.log('\n❌ Error: All 4 credentials are required!\n');
    rl.close();
    process.exit(1);
  }

  if (!token2.startsWith('shpat_')) {
    console.log('\n⚠️  Warning: PRIVATE_STOREFRONT_API_TOKEN should start with "shpat_"');
    const confirm = await question('Continue anyway? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      rl.close();
      process.exit(0);
    }
  }

  if (!domain.endsWith('.myshopify.com')) {
    console.log('\n⚠️  Warning: Store domain should end with ".myshopify.com"');
    const confirm = await question('Continue anyway? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      rl.close();
      process.exit(0);
    }
  }

  // Update .env
  const envPath = path.join(__dirname, '.env');
  let envContent = fs.readFileSync(envPath, 'utf8');

  envContent = envContent.replace(
    /PUBLIC_STOREFRONT_API_TOKEN=.*/,
    `PUBLIC_STOREFRONT_API_TOKEN=${token1}`
  );
  envContent = envContent.replace(
    /PRIVATE_STOREFRONT_API_TOKEN=.*/,
    `PRIVATE_STOREFRONT_API_TOKEN=${token2}`
  );
  envContent = envContent.replace(
    /PUBLIC_STORE_DOMAIN=.*/,
    `PUBLIC_STORE_DOMAIN=${domain}`
  );
  envContent = envContent.replace(
    /PUBLIC_STOREFRONT_ID=.*/,
    `PUBLIC_STOREFRONT_ID=${storefront}`
  );

  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ Credentials saved to .env!\n');
  console.log('Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Check that your store loads correctly\n');

  rl.close();
}

setupCredentials().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
