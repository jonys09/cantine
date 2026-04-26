import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n, localizeProduct } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Boutique — La Cantine" },
    {
        name: 'description',
        content:
            "Commandez l'huile d'olive 100% Coratina de La Cantine. Livraison au Canada.",
    },
];

// ── Loader: Fetch products from Shopify (or fallback to hardcoded) ──
export async function loader({ request, context }: LoaderFunctionArgs) {
    const env = context.env as Env;
    const cookieLang = request.headers.get('cookie')?.match(/cantine-lang=(fr|en)/)?.[1] ?? 'fr';
    const acceptLanguage = cookieLang === 'en' ? 'en-CA,en;q=0.9' : 'fr-CA,fr;q=0.9';

    if (env.PUBLIC_STOREFRONT_API_TOKEN && env.PUBLIC_STORE_DOMAIN) {
        try {
            const query = `
                query GetProducts {
                    products(first: 20) {
                        edges {
                            node {
                                id
                                handle
                                title
                                images(first: 2) {
                                    edges {
                                        node {
                                            url
                                            altText
                                        }
                                    }
                                }
                                variants(first: 1) {
                                    edges {
                                        node {
                                            id
                                            price {
                                                amount
                                                currencyCode
                                            }
                                            availableForSale
                                        }
                                    }
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
                        'Accept-Language': acceptLanguage,
                    },
                    body: JSON.stringify({ query }),
                }
            );

            if (response.ok) {
                const data = await response.json() as any;
                if (data.errors) {
                    console.warn('Shopify API returned errors:', JSON.stringify(data.errors));
                } else {
                    const products = data.data?.products?.edges || [];
                    console.log(`✅ Shopify connected — ${products.length} product(s) found`);
                    return { products, fromShopify: true };
                }
            } else {
                const text = await response.text();
                console.warn(`Shopify API HTTP ${response.status}:`, text.slice(0, 300));
            }
        } catch (error) {
            console.warn('Could not fetch from Shopify, using fallback products:', error);
        }
    }

    return { products: [], fromShopify: false };
}

const FEATURES_FR = [
    { icon: '🫒', title: '100% Coratina', desc: 'Variété emblématique des Pouilles' },
    { icon: '🧊', title: 'Pressée à Froid', desc: 'Première pression dans les 24h' },
    { icon: '🌿', title: 'Polyphénols', desc: 'Concentration exceptionnelle' },
    { icon: '🚚', title: 'Livraison au Canada', desc: '1–7 jours ouvrables' },
];

const FEATURES_EN = [
    { icon: '🫒', title: '100% Coratina', desc: 'Iconic Puglian variety' },
    { icon: '🧊', title: 'Cold Pressed', desc: 'First press within 24 hours' },
    { icon: '🌿', title: 'Polyphenols', desc: 'Exceptional concentration' },
    { icon: '🚚', title: 'Canada Shipping', desc: '1–7 business days' },
];

export default function Shop() {
    const { t, lang } = useI18n();
    const { products: shopifyProducts, fromShopify } = useLoaderData<typeof loader>();

    const features = lang === 'fr' ? FEATURES_FR : FEATURES_EN;

    // ── Hardcoded fallback products ──
    const fallbackProducts = [
        {
            key: 'huile-coratina-500ml',
            handle: 'huile-coratina-500ml',
            name: t('product_single_name'),
            price: lang === 'fr' ? '35 $' : '$35',
            priceNote: lang === 'fr' ? '+ taxes' : '+ taxes',
            image: '/images/bottle.png',
            hoverImage: null as string | null,
            badge: null as string | null,
            availableForSale: true,
        },
        {
            key: 'huile-coratina-bundle',
            handle: 'huile-coratina-bundle',
            name: t('product_bundle_name'),
            price: lang === 'fr' ? '90 $' : '$90',
            priceNote: lang === 'fr' ? 'Économisez 15 $' : 'Save $15',
            image: '/images/bundle.png',
            hoverImage: null as string | null,
            badge: t('product_bundle_badge'),
            availableForSale: true,
        },
    ];

    // ── Format Shopify products ──
    const products = shopifyProducts.length > 0
        ? shopifyProducts.map((edge: any) => {
            const images = edge.node.images?.edges ?? [];
            const variant = edge.node.variants?.edges?.[0]?.node;
            const priceAmt = parseFloat(variant?.price?.amount || '0');
            return {
                key: edge.node.handle,
                handle: edge.node.handle,
                name: localizeProduct(edge.node, lang).title,
                price: lang === 'fr' ? `${priceAmt.toFixed(2)} $` : `$${priceAmt.toFixed(2)}`,
                priceNote: '',
                image: images[0]?.node?.url ?? null,
                hoverImage: images[1]?.node?.url ?? null,
                badge: null as string | null,
                availableForSale: variant?.availableForSale ?? true,
            };
        })
        : fallbackProducts;

    return (
        <>
            <Header />

            {/* ── Shop Header ─────────────────────────────────────────────── */}
            <div className="shop-header">
                <div className="container">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">{t('products_eyebrow')}</p>
                        <h1>{t('products_heading')}</h1>
                        <p>
                            {lang === 'fr'
                                ? "Chaque produit est sélectionné avec soin pour vous offrir le meilleur de Puglia."
                                : 'Each product is carefully selected to bring you the best of Puglia.'}
                        </p>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Features Strip ──────────────────────────────────────────── */}
            <div
                style={{
                    backgroundColor: 'var(--color-olive)',
                    padding: 'var(--space-6) var(--container-padding)',
                }}
            >
                <div className="container">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'var(--space-10)',
                            flexWrap: 'wrap',
                        }}
                    >
                        {features.map(f => (
                            <div
                                key={f.title}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    color: 'var(--color-cream)',
                                }}
                            >
                                <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 'var(--text-sm)',
                                            fontWeight: 500,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {f.title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 'var(--text-xs)',
                                            color: 'rgba(250,248,242,0.65)',
                                        }}
                                    >
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Products Grid ────────────────────────────────────────────── */}
            <section className="section shop-body">
                <div className="container">
                    <StaggerContainer className="shop-products-grid">
                        {products.map(product => (
                            <Link
                                key={product.key}
                                to={`/products/${product.handle}`}
                                className="shop-product-card"
                                aria-label={product.name}
                            >
                                {/* Image */}
                                <div className="shop-product-image">
                                    {product.image ? (
                                        <>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="shop-product-img shop-product-img--primary"
                                            />
                                            {product.hoverImage && (
                                                <img
                                                    src={product.hoverImage}
                                                    alt={`${product.name} — vue alternative`}
                                                    loading="lazy"
                                                    className="shop-product-img shop-product-img--hover"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <div className="shop-product-placeholder" aria-label={product.name}>
                                            🫙
                                        </div>
                                    )}
                                    {product.badge && (
                                        <span className="shop-product-badge badge badge--terra">
                                            {product.badge}
                                        </span>
                                    )}
                                    {/* Hover CTA overlay */}
                                    <div className="shop-product-overlay">
                                        <span className="shop-product-overlay-btn">
                                            {lang === 'fr' ? 'Voir le produit' : 'View product'}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="shop-product-body">
                                    <div className="shop-product-top">
                                        <h3 className="shop-product-name">{product.name}</h3>
                                        <div className="shop-product-price-col">
                                            <span className="shop-product-price">{product.price}</span>
                                            {product.priceNote && (
                                                <span className="shop-product-price-note">{product.priceNote}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="shop-product-footer">
                                        {!product.availableForSale ? (
                                            <span className="shop-product-sold-out">
                                                {lang === 'fr' ? 'Épuisé' : 'Out of stock'}
                                            </span>
                                        ) : (
                                            <span className="shop-product-cta-hint">
                                                {lang === 'fr' ? 'Voir les détails →' : 'View details →'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </StaggerContainer>

                    {/* Reassurance */}
                    <AnimatedSection>
                        <div
                            style={{
                                marginTop: 'var(--space-16)',
                                padding: 'var(--space-8)',
                                backgroundColor: 'var(--color-bg-subtle)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 'var(--space-6)',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            {[
                                {
                                    icon: '🔒',
                                    label: lang === 'fr' ? 'Paiement sécurisé' : 'Secure payment',
                                },
                                {
                                    icon: '📦',
                                    label: lang === 'fr' ? 'Emballage protecteur' : 'Protective packaging',
                                },
                                {
                                    icon: '🇮🇹',
                                    label: lang === 'fr' ? "Importé d'Italie" : 'Imported from Italy',
                                },
                                {
                                    icon: '🚚',
                                    label: lang === 'fr' ? 'Livraison au Canada' : 'Canada-wide shipping',
                                },
                            ].map(item => (
                                <div
                                    key={item.label}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-2)',
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    <span
                                        style={{
                                            fontSize: 'var(--text-sm)',
                                            color: 'var(--color-gray)',
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── CTA to recipes ──────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)', textAlign: 'center' }}>
                <div className="container container-text">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'Inspirations' : 'Inspiration'}
                        </p>
                        <h2 className="heading-2" style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                            {lang === 'fr' ? "Comment l'utiliser ?" : 'How to use it?'}
                        </h2>
                        <p className="body-lg text-muted" style={{ marginBottom: 'var(--space-8)' }}>
                            {lang === 'fr'
                                ? "Découvrez nos recettes conçues pour mettre en valeur les arômes uniques de l'huile Coratina."
                                : 'Discover our recipes designed to showcase the unique aromas of Coratina oil.'}
                        </p>
                        <Link to="/recipes" className="btn">
                            {t('nav_recipes')}
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </>
    );
}
