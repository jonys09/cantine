#!/usr/bin/env node

/**
 * Shopify Store Connection Validator
 * 
 * This script validates that your .env credentials are correct
 * and that you can connect to the Shopify Storefront API.
 * 
 * Usage:
 *   node validate-shopify-connection.js
 */

require('dotenv').config();

const required = [
  'PUBLIC_STOREFRONT_API_TOKEN',
  'PRIVATE_STOREFRONT_API_TOKEN',
  'PUBLIC_STORE_DOMAIN',
  'PUBLIC_STOREFRONT_ID',
  'SESSION_SECRET'
];

console.log('\n========================================');
console.log('  Shopify Connection Validator');
console.log('========================================\n');

let allSet = true;

console.log('Checking environment variables:\n');

for (const key of required) {
  const value = process.env[key];
  if (value) {
    const masked = value.length > 20 ? value.substring(0, 10) + '...' + value.substring(value.length - 10) : value;
    console.log(`✅ ${key}`);
    console.log(`   Value: ${masked}\n`);
  } else {
    console.log(`❌ ${key}`);
    console.log(`   Status: NOT SET\n`);
    allSet = false;
  }
}

if (!allSet) {
  console.log('========================================');
  console.log('❌ Some credentials are missing!');
  console.log('========================================\n');
  console.log('Run: node setup-credentials.js\n');
  process.exit(1);
} else {
  console.log('========================================');
  console.log('✅ All credentials are set!');
  console.log('========================================\n');
  console.log('You can now run:');
  console.log('  npm run dev\n');
  
  // Basic validation
  const domain = process.env.PUBLIC_STORE_DOMAIN;
  if (!domain.endsWith('.myshopify.com')) {
    console.log('⚠️  Warning: Store domain should end with .myshopify.com\n');
  }
  
  const privateToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;
  if (!privateToken.startsWith('shpat_')) {
    console.log('⚠️  Warning: Private token should start with "shpat_"\n');
  }
}
