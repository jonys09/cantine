import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';
import { useCart } from '~/lib/cart';

export const meta: MetaFunction = () => [
    { title: "La Cantine — Huile d'Olive Premium des Pouilles" },
    {
        name: 'description',
        content:
            "Huile d'olive 100% Coratina des Pouilles, pressée à froid. Polyphénols exceptionnels. Livraison au Canada.",
    },
];

// ── Loader: Fetch featured products from Shopify ──
export async function loader({ request, context }: LoaderFunctionArgs) {
    const env = context.env as Env;
    const cookieLang = request.headers.get('cookie')?.match(/cantine-lang=(fr|en)/)?.[1] ?? 'fr';
    const acceptLanguage = cookieLang === 'en' ? 'en-CA,en;q=0.9' : 'fr-CA,fr;q=0.9';
    if (env.PUBLIC_STOREFRONT_API_TOKEN && env.PUBLIC_STORE_DOMAIN) {
        try {
            const response = await fetch(
                `https://${env.PUBLIC_STORE_DOMAIN}/api/2024-01/graphql.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Storefront-Access-Token': env.PUBLIC_STOREFRONT_API_TOKEN,
                        'Accept-Language': acceptLanguage,
                    },
                    body: JSON.stringify({
                        query: `query FeaturedProducts {
                            products(first: 6) {
                                edges {
                                    node {
                                        id handle title description
                                        featuredImage { url altText }
                                        images(first: 2) {
                                            edges { node { url altText } }
                                        }
                                        variants(first: 1) {
                                            edges {
                                                node {
                                                    id
                                                    price { amount currencyCode }
                                                    availableForSale
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }`,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json() as any;
                if (!data.errors) {
                    const products = data.data?.products?.edges || [];
                    if (products.length > 0) return { shopifyProducts: products };
                }
            }
        } catch {
            // Fall through to hardcoded products
        }
    }
    return { shopifyProducts: [] };
}

const MARQUEE_ITEMS = {
    fr: [
        '100% CORATINA',
        'PRESSÉE À FROID',
        'POUILLES, ITALIE',
        'POLYPHÉNOLS ÉLEVÉS',
        'ACIDITÉ < 0,3 %',
        'RÉCOLTE À LA MAIN',
        'ARTISANAL',
        'LIVRAISON AU CANADA',
    ],
    en: [
        '100% CORATINA',
        'COLD-PRESSED',
        'PUGLIA, ITALY',
        'HIGH POLYPHENOLS',
        'ACIDITY < 0.3%',
        'HAND-HARVESTED',
        'ARTISANAL',
        'CANADA SHIPPING',
    ],
};

export default function Index() {
    const { t, lang } = useI18n();
    const { addItem } = useCart();
    const { shopifyProducts } = useLoaderData<typeof loader>();

    // Fallback products shown when Shopify returns nothing
    const fallbackProducts = [
        {
            key: 'single',
            name: t('product_single_name'),
            size: t('product_single_size'),
            price: lang === 'fr' ? '35 $' : '$35',
            priceNum: 35,
            image: '/images/bottle.png',
            hoverImage: '/images/our_story_bottle.jpg',
            badge: null,
            variantId: null,
        },
        {
            key: 'bundle',
            name: t('product_bundle_name'),
            size: t('product_bundle_size'),
            price: lang === 'fr' ? '90 $' : '$90',
            priceNum: 90,
            image: '/images/bundle.png',
            hoverImage: '/images/bottle_tomato.jpg',
            badge: t('product_bundle_badge'),
            variantId: null,
        },
    ];

    // Map Shopify products if available, otherwise use fallback
    const products = shopifyProducts.length > 0
        ? shopifyProducts.map((edge: any) => {
            const imgEdges = edge.node.images?.edges || [];
            const priceAmt = parseFloat(edge.node.variants?.edges?.[0]?.node?.price?.amount || '0');
            return {
                key: edge.node.handle,
                name: edge.node.title,
                size: '',
                price: lang === 'fr' ? `${priceAmt.toFixed(2)} $` : `$${priceAmt.toFixed(2)}`,
                priceNum: priceAmt,
                image: imgEdges[0]?.node?.url || edge.node.featuredImage?.url || null,
                hoverImage: imgEdges[1]?.node?.url || null,
                badge: null,
                variantId: edge.node.variants?.edges?.[0]?.node?.id || null,
            };
        })
        : fallbackProducts;

    const marqueeContent = (
        <span className="qs-set" aria-hidden="true">
            {MARQUEE_ITEMS[lang].map((item, i) => (
                <span key={i}>
                    <span>{item}</span>
                    <span className="qs-sep">·</span>
                </span>
            ))}
        </span>
    );

    return (
        <>
            <Header transparent />

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="hero" aria-label="Introduction">
                <div className="hero-bg">
                    <img
                        src="/images/Home.jpg"
                        alt="Huile d'olive Coratina La Cantine versée"
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>
                <div className="hero-overlay" aria-hidden="true" />

                <div className="hero-content container">
                    <p className="eyebrow">{t('hero_eyebrow')}</p>
                    <h1 className="heading-display hero-headline">{t('hero_headline')}</h1>

                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(250,248,242,0.70)', fontStyle: 'italic', marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)', letterSpacing: '0.02em' }}>
                        {t('hero_tagline')}
                    </p>
                    <div className="hero-cta-row">
                        <Link to="/shop" className="btn btn-cream">
                            {t('hero_cta')}
                        </Link>
                        <Link to="/about" className="cta-link" style={{ color: 'rgba(250,248,242,0.80)' }}>
                            {t('nav_story')} <span className="arrow">→</span>
                        </Link>
                    </div>
                </div>

                <div className="hero-scroll-indicator" aria-hidden="true">
                    <span>{t('hero_scroll')}</span>
                    <div className="hero-scroll-line" />
                </div>
            </section>

            {/* ── Quality Marquee Strip ──────────────────────────────────────── */}
            <div className="quality-strip" role="marquee" aria-label="Certifications et caractéristiques">
                <div className="quality-strip-track">
                    {marqueeContent}
                    {marqueeContent}
                </div>
            </div>

            {/* ── Products ──────────────────────────────────────────────────── */}
            <section className="section products-section">
                <div className="container">
                    <AnimatedSection className="products-header">
                        <p className="eyebrow eyebrow--olive">{t('products_eyebrow')}</p>
                        <h2 className="heading-2">{t('products_heading')}</h2>
                    </AnimatedSection>

                    <StaggerContainer className="products-grid">
                        {products.map((product: any) => (
                            <article key={product.key} className="product-card">
                                <div className="product-card-image">
                                    {product.image ? (
                                        <>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="product-img-primary"
                                            />
                                            {product.hoverImage && (
                                                <img
                                                    src={product.hoverImage}
                                                    alt={`${product.name} — vue alternative`}
                                                    loading="lazy"
                                                    className="product-img-hover"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <div className="product-card-image-placeholder" aria-label={product.name}>
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
                                        <span className="product-card-price">{product.price}</span>
                                    </div>
                                    <div className="product-card-footer">
                                        <button
                                            className="btn btn-filled"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                            type="button"
                                            onClick={() => addItem({
                                                id: product.key,
                                                name: product.name,
                                                price: product.priceNum,
                                                priceLabel: product.price,
                                                image: product.image,
                                            })}
                                        >
                                            {t('product_cta')}
                                        </button>
                                        <Link to={`/products/${product.key}`} className="cta-link">
                                            {t('product_view')} <span className="arrow">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ── Features Trust Strip ──────────────────────────────────────── */}
            <div className="features-strip">
                <div className="container">
                    <StaggerContainer className="features-grid">
                        {/* Variety */}
                        <div className="feature-item">
                            <svg className="feature-icon" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                                <circle cx="19" cy="19" r="16" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M13 19l4 4 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="feature-title">100% Coratina</p>
                                <p className="feature-sub">{lang === 'fr' ? 'Variété emblématique des Pouilles' : 'Iconic Puglian variety'}</p>
                            </div>
                        </div>
                        {/* Cold press */}
                        <div className="feature-item">
                            <svg className="feature-icon" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                                <path d="M19 6v26M6 19h26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                <circle cx="19" cy="19" r="5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M10 10l4 4M28 10l-4 4M10 28l4-4M28 28l-4-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                            </svg>
                            <div>
                                <p className="feature-title">{lang === 'fr' ? 'Pressée à froid' : 'Cold-Pressed'}</p>
                                <p className="feature-sub">{lang === 'fr' ? 'Extraction à moins de 27 °C' : 'Extracted below 27 °C'}</p>
                            </div>
                        </div>
                        {/* Acidity */}
                        <div className="feature-item">
                            <svg className="feature-icon" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                                <path d="M14 6h10v16a5 5 0 0 1-10 0V6z" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M14 14h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                                <path d="M14 10h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                            </svg>
                            <div>
                                <p className="feature-title">{lang === 'fr' ? 'Acidité < 0,3 %' : 'Acidity < 0.3%'}</p>
                                <p className="feature-sub">{lang === 'fr' ? 'Polyphénols exceptionnels' : 'Exceptional polyphenols'}</p>
                            </div>
                        </div>
                        {/* Delivery */}
                        <div className="feature-item">
                            <svg className="feature-icon" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                                <path d="M4 26h2m28 0h-6M4 26V16l8-8h14l8 8v10M4 26h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="10" cy="26" r="3" stroke="currentColor" strokeWidth="1.2" />
                                <circle cx="26" cy="26" r="3" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            <div>
                                <p className="feature-title">{lang === 'fr' ? 'Livraison au Canada' : 'Canada-Wide Shipping'}</p>
                                <p className="feature-sub">{lang === 'fr' ? '1–7 jours ouvrables' : '1–7 business days'}</p>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </div>

            {/* ── Story Teaser ──────────────────────────────────────────────── */}
            <section className="section story-section">
                <div className="container">
                    <div className="story-inner">
                        <AnimatedSection className="story-content">
                            <p className="eyebrow">{t('story_eyebrow')}</p>
                            <h2 className="heading-2">{t('story_heading')}</h2>
                            <p className="body-lg">{t('story_p1')}</p>
                            <p className="body-lg text-muted">{t('story_p2')}</p>
                            <div className="story-stats">
                                <div className="story-stat">
                                    <p className="story-stat-num">{t('story_stat1_num')}</p>
                                    <p className="story-stat-label">{t('story_stat1_label')}</p>
                                </div>
                                <div className="story-stat">
                                    <p className="story-stat-num">{t('story_stat2_num')}</p>
                                    <p className="story-stat-label">{t('story_stat2_label')}</p>
                                </div>
                                <div className="story-stat">
                                    <p className="story-stat-num">{t('story_stat3_num')}</p>
                                    <p className="story-stat-label">{t('story_stat3_label')}</p>
                                </div>
                                <div className="story-stat">
                                    <p className="story-stat-num">{t('story_stat4_num')}</p>
                                    <p className="story-stat-label">{t('story_stat4_label')}</p>
                                </div>
                            </div>
                            <Link to="/about" className="btn">
                                {t('story_cta')}
                            </Link>
                        </AnimatedSection>

                        <AnimatedSection delay={1} className="story-image">
                            <img
                                src="/images/our_story_bottle.jpg"
                                alt={lang === 'fr' ? "Bouteille d'huile La Cantine avec tomates" : 'La Cantine olive oil bottle with tomatoes'}
                                loading="lazy"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Stores ────────────────────────────────────────────────────── */}
            <section className="section stores-section" id="stores">
                <div className="container">
                    <div className="stores-inner">
                        <AnimatedSection className="stores-content">
                            <p className="eyebrow eyebrow--olive">{t('stores_eyebrow')}</p>
                            <h2 className="heading-2">{t('stores_heading')}</h2>
                            <p>{t('stores_sub')}</p>
                            <div className="stores-features">
                                <div className="store-feature">
                                    <div className="store-feature-icon" aria-hidden="true">🚚</div>
                                    <div className="store-feature-text">
                                        <h4>{t('stores_delivery_title')}</h4>
                                        <p>{t('stores_delivery_desc')}</p>
                                    </div>
                                </div>
                                <div className="store-feature">
                                    <div className="store-feature-icon" aria-hidden="true">🛒</div>
                                    <div className="store-feature-text">
                                        <h4>{t('stores_online_title')}</h4>
                                        <p>{t('stores_online_desc')}</p>
                                    </div>
                                </div>
                            </div>
                            <Link to="/shop" className="btn btn-filled">
                                {t('stores_cta')}
                            </Link>
                        </AnimatedSection>

                        <AnimatedSection delay={1} className="stores-visual">
                            <img
                                src="/images/yello.jpg"
                                alt={lang === 'fr' ? "Bouteille d'huile d'olive La Cantine" : 'La Cantine olive oil bottle'}
                                loading="lazy"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Reviews removed per client request */}
            {/* Recettes section removed from homepage per client request — accessible via /recipes nav */}

            <Footer />
        </>
    );
}
