import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Vercel/Render Vite config: no oxygen() plugin (Node.js target, not webworker)
// ssr.noExternal bundles all deps so runtime module resolution matches build-time
export default defineConfig({
    plugins: [hydrogen(), reactRouter(), tsconfigPaths()],
    build: {
        assetsInlineLimit: 0,
    },
    ssr: {
        noExternal: true,
        resolve: {
            // Use browser conditions so react-dom/server resolves to the version
            // that exports renderToReadableStream (needed for streaming SSR)
            conditions: ['browser', 'module', 'main'],
        },
        optimizeDeps: {
            include: ['set-cookie-parser', 'cookie', 'react-router'],
        },
    },
});
