import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Points de vente — La Cantine" },
    {
        name: 'description',
        content: "Trouvez nos huiles d'olive artisanales dans les boutiques près de chez vous.",
    },
];

type Store = {
    id: string;
    name: string;
    address: string;
    city: string;
    postal: string;
    province: string;
    phone?: string;
    lat: number;
    lng: number;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
    const env = context.env as any;
    
    // Default fallback store
    const fallbackStores: Store[] = [];

    if (env.PUBLIC_STOREFRONT_API_TOKEN && env.PUBLIC_STORE_DOMAIN) {
        try {
            const query = `
                query GetStores {
                    metaobjects(type: "store_location", first: 50) {
                        edges {
                            node {
                                id
                                fields {
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            `;

            const response = await fetch(
                `https://${env.PUBLIC_STORE_DOMAIN}/api/2024-01/graphql.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Storefront-Access-Token': env.PUBLIC_STOREFRONT_API_TOKEN,
                    },
                    body: JSON.stringify({ query }),
                }
            );

            if (response.ok) {
                const data = await response.json() as any;
                if (!data.errors && data.data?.metaobjects?.edges) {
                    const shopifyStores = data.data.metaobjects.edges.map((edge: any) => {
                        const fields = edge.node.fields;
                        const getValue = (key: string) => fields.find((f: any) => f.key === key)?.value || '';
                        
                        return {
                            id: edge.node.id,
                            name: getValue('store_name') || getValue('name') || 'Unnamed Store',
                            address: getValue('address'),
                            city: getValue('city'),
                            postal: getValue('postal_code') || getValue('postal'),
                            province: getValue('province'),
                            phone: getValue('phone'),
                            lat: parseFloat(getValue('latitude')) || 45.5017,
                            lng: parseFloat(getValue('longitude')) || -73.5673,
                        };
                    });

                    if (shopifyStores.length > 0) {
                        return { stores: shopifyStores, fromShopify: true };
                    }
                }
            }
        } catch (error) {
            console.warn('Could not fetch stores from Shopify, using fallback:', error);
        }
    }

    return { stores: fallbackStores, fromShopify: false };
}

export default function Stores() {
    const { t, lang } = useI18n();
    const { stores: STORES } = useLoaderData<typeof loader>();
    const [selectedCity, setSelectedCity] = useState<string>('All');
    const [activeStore, setActiveStore] = useState<string | null>(null);

    const CITIES = Array.from(new Set(STORES.map((s: Store) => s.city))).filter(Boolean).sort();

    const filteredStores = selectedCity === 'All'
        ? STORES
        : STORES.filter(s => s.city === selectedCity);

    return (
        <>
            <Header />

            {/* ── Find Us Banner ────────────────────────────────────────────── */}
            <div className="shop-header" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/images/find_us_banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                color: 'var(--color-cream)',
                minHeight: '55vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 'var(--header-height, 80px)'
            }}>
                <div className="container">
                    <AnimatedSection>
                        <p className="eyebrow" style={{ color: 'var(--color-cream)' }}>
                            {lang === 'fr' ? 'Points de vente' : 'Find Us'}
                        </p>
                        <h1 style={{ color: 'var(--color-cream)' }}>
                            {lang === 'fr' ? 'Où nous trouver' : 'Where to find us'}
                        </h1>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Elegant Divider ───────────────────────────────────────────── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-10) 0',
                backgroundColor: 'var(--color-bg)'
            }}>
                <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-olive)', marginRight: 'var(--space-4)' }} />
                <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-olive)', fontStyle: 'italic', fontSize: 'var(--text-lg)' }}>
                    {lang === 'fr' ? 'Notre Réseau' : 'Our Network'}
                </span>
                <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-olive)', marginLeft: 'var(--space-4)' }} />
            </div>

            <div className="store-locator" style={{ marginTop: 0, minHeight: '600px', height: '80vh', borderTop: '1px solid var(--color-border)' }}>
                <div className="store-locator-sidebar">
                    <AnimatedSection>
                        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
                            {lang === 'fr'
                                ? 'Découvrez notre huile d\'olive dans nos boutiques partenaires.'
                                : 'Discover our olive oil in our partner shops.'}
                        </p>

                        <div className="store-filters" style={{ marginBottom: 'var(--space-6)' }}>
                            <label htmlFor="city-filter" className="sr-only">Filtrer par ville</label>
                            <div className="custom-select-wrapper">
                                <select
                                    id="city-filter"
                                    className="store-select"
                                    value={selectedCity}
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                        setActiveStore(null);
                                    }}
                                >
                                    <option value="All">{lang === 'fr' ? 'Toutes les villes' : 'All cities'}</option>
                                    {CITIES.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <span className="select-arrow" aria-hidden="true">▾</span>
                            </div>
                        </div>

                        <div className="store-list">
                            {filteredStores.length === 0 ? (
                                <p className="text-muted">Aucun point de vente trouvé.</p>
                            ) : (
                                filteredStores.map(store => (
                                    <button
                                        key={store.id}
                                        className={`store-item ${activeStore === store.id ? 'active' : ''}`}
                                        onClick={() => setActiveStore(store.id)}
                                    >
                                        <h3 className="store-name">{store.name}</h3>
                                        <p className="store-address">{store.address}</p>
                                        <p className="store-city">{store.city}, {store.province} {store.postal}</p>
                                        {store.phone && <p className="store-phone">{store.phone}</p>}
                                        
                                        <span className="store-dir-link">
                                            {lang === 'fr' ? 'Itinéraire' : 'Directions'} →
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </AnimatedSection>
                </div>

                <div className="store-locator-map">
                    {(() => {
                        const activeStoreData = activeStore ? STORES.find(s => s.id === activeStore) : null;
                        const mapQuery = activeStoreData 
                            ? `${activeStoreData.name}, ${activeStoreData.address}, ${activeStoreData.city}, ${activeStoreData.province} ${activeStoreData.postal}`
                            : 'Montreal, QC, Canada';
                        const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

                        return (
                            <iframe 
                                title={lang === 'fr' ? 'Carte des points de vente' : 'Store locations map'}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                src={mapUrl}
                                allowFullScreen
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        );
                    })()}
                </div>
            </div>

            <Footer />
        </>
    );
}
