import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n, localizeProduct } from '~/lib/i18n';
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
        'ACIDITÉ < 0,2 %',
        'RÉCOLTE À LA MAIN',
        'ARTISANAL',
        'LIVRAISON AU CANADA',
    ],
    en: [
        '100% CORATINA',
        'COLD-PRESSED',
        'PUGLIA, ITALY',
        'HIGH POLYPHENOLS',
        'ACIDITY < 0.2%',
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
                    <p className="eyebrow" style={{ fontSize: '1rem' }}>{t('hero_eyebrow')}</p>
                    <h1 className="heading-display hero-headline">{t('hero_headline')}</h1>

                    <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(250,248,242,0.70)', fontStyle: 'italic', marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)', letterSpacing: '0.02em' }}>
                        {t('hero_tagline')}
                    </p>
                    <div className="hero-cta-row">
                        <Link to="/shop" className="cta-link" style={{ color: 'rgba(250,248,242,0.80)' }}>
                            {t('hero_cta')} <span className="arrow">→</span>
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
                        {t('products_eyebrow') && <p className="eyebrow eyebrow--olive">{t('products_eyebrow')}</p>}
                        <h2 className="heading-2">{t('products_heading')}</h2>
                    </AnimatedSection>

                    <StaggerContainer className="products-grid" style={{ justifyContent: 'center' }}>
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
                                    <button
                                        className="product-card-quick-add"
                                        type="button"
                                        aria-label={t('product_cta')}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addItem({
                                                id: product.key,
                                                name: product.name,
                                                price: product.priceNum,
                                                priceLabel: product.price,
                                                image: product.image,
                                            });
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="21" r="1"/>
                                            <circle cx="20" cy="21" r="1"/>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                            <line x1="12" y1="10" x2="12" y2="16"/>
                                            <line x1="9" y1="13" x2="15" y2="13"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="product-card-body">
                                    <div className="product-card-top">
                                        <h3 className="product-card-name">{product.name}</h3>
                                        <span className="product-card-price" style={{ color: 'var(--color-gray)' }}>{product.price}</span>
                                    </div>
                                    <Link to={`/products/${product.key}`} className="cta-link" style={{ justifyContent: 'center', marginTop: 'var(--space-2)' }}>
                                        {t('product_view')} <span className="arrow">→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ── Story Teaser ──────────────────────────────────────────────── */}
            <section className="section story-section">
                <div className="container">
                    <div className="story-inner">
                        <AnimatedSection delay={1} className="story-image">
                            <img
                                src="/images/bottle_tomato.jpg"
                                alt={lang === 'fr' ? "Bouteille d'huile La Cantine avec tomates" : 'La Cantine olive oil bottle with tomatoes'}
                                loading="lazy"
                            />
                        </AnimatedSection>
                        
                        <AnimatedSection className="story-content">
                            <p className="eyebrow">{t('story_eyebrow')}</p>
                            <h2 className="heading-2">{t('story_heading')}</h2>
                            <p>{t('story_p1')}</p>
                            <p className="text-muted">{t('story_p2')}</p>
                            
                            <Link to="/about" className="btn" style={{ marginTop: 'var(--space-6)' }}>
                                {t('story_cta')}
                            </Link>
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

            <Footer />
        </>
    );
}
