import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Vercel-specific Vite config: no oxygen() plugin so it builds for Node.js (not webworker)
export default defineConfig({
    plugins: [hydrogen(), reactRouter(), tsconfigPaths()],
    build: {
        assetsInlineLimit: 0,
    },
    ssr: {
        optimizeDeps: {
            include: ['set-cookie-parser', 'cookie', 'react-router'],
        },
    },
});
