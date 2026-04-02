import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction, MetaFunction } from 'react-router';
import { I18nProvider } from '~/lib/i18n';
import { CartProvider } from '~/lib/cart';
import { CartDrawer } from '~/components/CartDrawer';

import resetStyles from '~/styles/reset.css?url';
import headerStyles from '~/styles/header.css?url';
import footerStyles from '~/styles/footer.css?url';
import sectionsStyles from '~/styles/sections.css?url';

export const meta: MetaFunction = () => [
    { title: 'La Cantine — Huile d\'Olive Premium des Pouilles' },
    { name: 'description', content: 'Huile d\'olive Coratina DOP des Pouilles, pressée à froid. Disponible au Québec.' },
];

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap',
    },
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: headerStyles },
    { rel: 'stylesheet', href: footerStyles },
    { rel: 'stylesheet', href: sectionsStyles },
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🫙</text></svg>' },
];

export default function App() {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <CartProvider>
                    <I18nProvider>
                        <CartDrawer />
                        <Outlet />
                    </I18nProvider>
                </CartProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Erreur — La Cantine</title>
                <Links />
            </head>
            <body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1A1A12', background: '#FAFAF4' }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🫙</p>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quelque chose s'est mal passé</h1>
                    <a href="/" style={{ fontSize: '0.875rem', textDecoration: 'underline', color: '#2B3D1A' }}>Retour à l'accueil</a>
                </div>
                <Scripts />
            </body>
        </html>
    );
}
