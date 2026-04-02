import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';
import { useCart } from '~/lib/cart';

export const meta: MetaFunction = () => [
    { title: "Boutique — La Cantine" },
    {
        name: 'description',
        content:
            "Commandez l'huile d'olive Coratina DOP de La Cantine. Livraison gratuite au Québec.",
    },
];

// ── Loader: Fetch products from Shopify (or fallback to hardcoded) ──
export async function loader({ request, context }: LoaderFunctionArgs) {
    const env = context.env as Env;
    const cookieLang = request.headers.get('cookie')?.match(/cantine-lang=(fr|en)/)?.[1] ?? 'fr';
    const acceptLanguage = cookieLang === 'en' ? 'en-CA,en;q=0.9' : 'fr-CA,fr;q=0.9';

    // Try to fetch from Shopify if credentials are available
    if (env.PUBLIC_STOREFRONT_API_TOKEN && env.PUBLIC_STORE_DOMAIN) {
        try {
            const query = `
                query GetProducts {
                    products(first: 10) {
                        edges {
                            node {
                                id
                                handle
                                title
                                description
                                featuredImage {
                                    url
                                    altText
                                }
                                variants(first: 1) {
                                    edges {
                                        node {
                                            id
                                            price {
                                                amount
                                                currencyCode
                                            }
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

    // Return fallback signal (component will use hardcoded products)
    return { products: [], fromShopify: false };
}

const FEATURES_FR = [
    { icon: '🫒', title: 'DOP Certifiée', desc: 'Dénomination d\'Origine Protégée' },
    { icon: '🧊', title: 'Pressée à Froid', desc: 'Première pression dans les 24h' },
    { icon: '🌿', title: 'Polyphénols', desc: 'Concentration exceptionnelle' },
    { icon: '🚚', title: 'Livraison Gratuite', desc: 'Région de Longueuil' },
];

const FEATURES_EN = [
    { icon: '🫒', title: 'DOP Certified', desc: 'Protected Designation of Origin' },
    { icon: '🧊', title: 'Cold Pressed', desc: 'First press within 24 hours' },
    { icon: '🌿', title: 'Polyphenols', desc: 'Exceptional concentration' },
    { icon: '🚚', title: 'Free Delivery', desc: 'Longueuil region' },
];

export default function Shop() {
    const { t, lang } = useI18n();
    const { addItem } = useCart();
    const { products: shopifyProducts, fromShopify } = useLoaderData<typeof loader>();
    
    const features = lang === 'fr' ? FEATURES_FR : FEATURES_EN;

    // ── Hardcoded fallback products ──
    const fallbackProducts = [
        {
            key: 'single',
            name: t('product_single_name'),
            size: t('product_single_size'),
            desc: t('product_single_desc'),
            price: lang === 'fr' ? '28 $' : '$28',
            priceNote: lang === 'fr' ? '+ taxes' : '+ taxes',
            image: '/images/bottle.png',
            badge: null,
            details: lang === 'fr'
                ? ['Variété : Coratina', 'Origine : Puglia, Italie', 'Format : 500 ml', 'Acidité : < 0,2 %']
                : ['Variety: Coratina', 'Origin: Puglia, Italy', 'Format: 500 ml', 'Acidity: < 0.2%'],
        },
        {
            key: 'bundle',
            name: t('product_bundle_name'),
            size: t('product_bundle_size'),
            desc: t('product_bundle_desc'),
            price: lang === 'fr' ? '72 $' : '$72',
            priceNote: lang === 'fr' ? 'Économisez 12 $' : 'Save $12',
            image: '/images/bundle.png',
            badge: t('product_bundle_badge'),
            details: lang === 'fr'
                ? ['3 × 500 ml', 'Idéal pour offrir', 'Livraison gratuite incluse', 'Économie de 12 $']
                : ['3 × 500 ml', 'Perfect as a gift', 'Free shipping included', 'Save $12'],
        },
        {
            key: 'pourer',
            name: t('product_pourer_name'),
            size: t('product_pourer_size'),
            desc: t('product_pourer_desc'),
            price: lang === 'fr' ? '14 $' : '$14',
            priceNote: '',
            image: null,
            badge: null,
            details: lang === 'fr'
                ? ['Acier inoxydable', 'Compatible 500 ml', 'Bec anti-gouttes', 'Bouchon inclus']
                : ['Stainless steel', 'Compatible 500 ml', 'Drip-free spout', 'Cap included'],
        },
    ];

    // ── Format Shopify products if available ──
    const products = shopifyProducts.length > 0 
        ? shopifyProducts.map((edge: any) => ({
            key: edge.node.handle,
            shopifyId: edge.node.id,
            variantId: edge.node.variants?.edges?.[0]?.node?.id,
            name: edge.node.title,
            size: '',
            desc: edge.node.description || '',
            price: `$${parseFloat(edge.node.variants?.edges?.[0]?.node?.price?.amount || 0).toFixed(2)}`,
            priceNote: '',
            image: edge.node.featuredImage?.url,
            badge: null,
            details: [],
        }))
        : fallbackProducts;

    return (
        <>
            <Header />

            {/* ── Shop Header ───────────────────────────────────────────────── */}
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

            {/* ── Features Strip ────────────────────────────────────────────── */}
            <div
                style={{
                    backgroundColor: 'var(--color-olive)',
                    padding: 'var(--space-6) var(--container-padding)',
                }}
            >
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 'var(--space-4)',
                        }}
                        className="hide-mobile"
                        aria-hidden
                    />
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

            {/* ── Products Grid ─────────────────────────────────────────────── */}
            <section className="section shop-body">
                <div className="container">
                    <StaggerContainer className="products-grid">
                        {products.map(product => (
                            <article key={product.key} className="product-card">
                                <div className="product-card-image">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div
                                            className="product-card-image-placeholder"
                                            aria-label={product.name}
                                        >
                                            🫙
                                        </div>
                                    )}
                                    {product.badge && (
                                        <span className="product-card-badge badge badge--terra">
                                            {product.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="product-card-body">
                                    <div className="product-card-top">
                                        <div>
                                            <h3 className="product-card-name">{product.name}</h3>
                                            <p className="product-card-size">{product.size}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="product-card-price">{product.price}</span>
                                            {product.priceNote && (
                                                <p
                                                    style={{
                                                        fontSize: 'var(--text-xs)',
                                                        color: 'var(--color-terra)',
                                                        marginTop: '2px',
                                                    }}
                                                >
                                                    {product.priceNote}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="product-card-desc">{product.desc}</p>

                                    <ul
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 'var(--space-1)',
                                            padding: 'var(--space-4) 0',
                                            borderTop: '1px solid var(--color-border)',
                                        }}
                                    >
                                        {product.details.map(detail => (
                                            <li
                                                key={detail}
                                                style={{
                                                    fontSize: 'var(--text-xs)',
                                                    color: 'var(--color-gray)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-2)',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: '3px',
                                                        height: '3px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'var(--color-olive-light)',
                                                        flexShrink: 0,
                                                    }}
                                                    aria-hidden="true"
                                                />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="product-card-footer">
                                        <button
                                            className="btn btn-filled"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                            type="button"
                                            onClick={() => addItem({
                                                id: product.key,
                                                name: product.name,
                                                price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
                                                priceLabel: product.price,
                                                image: product.image,
                                                variantId: product.variantId ?? null,
                                            })}
                                        >
                                            {t('add_to_cart')}
                                        </button>
                                    </div>
                                </div>
                            </article>
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
                                    icon: '🔄',
                                    label: lang === 'fr' ? 'Satisfaction garantie' : 'Satisfaction guaranteed',
                                },
                                {
                                    icon: '📦',
                                    label: lang === 'fr' ? 'Emballage protecteur' : 'Protective packaging',
                                },
                                {
                                    icon: '🇮🇹',
                                    label: lang === 'fr' ? 'Importé d\'Italie' : 'Imported from Italy',
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

            {/* ── CTA to recipes ────────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)', textAlign: 'center' }}>
                <div className="container container-text">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'Inspirations' : 'Inspiration'}
                        </p>
                        <h2 className="heading-2" style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                            {lang === 'fr' ? 'Comment l\'utiliser ?' : 'How to use it?'}
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
