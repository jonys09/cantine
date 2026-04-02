// Post-build script: moves dist/server into api/dist/ so Vercel's function
// bundler can resolve imports within the api/ directory.
import { cpSync, rmSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const serverDist = join(root, 'dist', 'server');
const apiDist = join(root, 'api', 'dist');

// Clean and copy dist/server → api/dist
rmSync(apiDist, { recursive: true, force: true });
mkdirSync(apiDist, { recursive: true });
cpSync(serverDist, apiDist, { recursive: true });

console.log('✓ Copied dist/server → api/dist');
