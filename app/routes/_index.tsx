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
            "Huile d'olive Coratina DOP des Pouilles, pressée à froid. Notes herbacées, polyphénols exceptionnels. Livraison au Québec.",
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

const REVIEWS = [
    {
        quote: {
            fr: "Une huile d'une qualité exceptionnelle. Son goût fruité et légèrement amer est parfaitement équilibré. Je ne peux plus m'en passer.",
            en: "An exceptionally high-quality oil. Its fruity, slightly bitter taste is perfectly balanced. I can't live without it anymore.",
        },
        name: 'Marie-Claude B.',
        location: 'Montréal',
        initials: 'MB',
        avatarColor: '#C4603A',
    },
    {
        quote: {
            fr: "J'ai découvert La Cantine grâce à un ami. Depuis, impossible de revenir à une huile ordinaire. La différence est flagrante.",
            en: "I discovered La Cantine through a friend. Since then, it's impossible to go back to a regular oil. The difference is striking.",
        },
        name: 'Jean-François D.',
        location: 'Longueuil',
        initials: 'JD',
        avatarColor: '#2B3D1A',
    },
    {
        quote: {
            fr: 'Le coffret 3 bouteilles est le cadeau parfait pour les amateurs de bonne cuisine. Tout le monde a adoré.',
            en: 'The 3-bottle bundle is the perfect gift for food lovers. Everyone loved it.',
        },
        name: 'Sophie M.',
        location: 'Brossard',
        initials: 'SM',
        avatarColor: '#C49A3C',
    },
];

const MARQUEE_ITEMS = {
    fr: [
        'CORATINA DOP',
        'PRESSÉE À FROID',
        'POUILLES, ITALIE',
        'POLYPHÉNOLS ÉLEVÉS',
        'ACIDITÉ < 0,3 %',
        'RÉCOLTE À LA MAIN',
        'CERTIFICATION BIOLOGIQUE',
        'LIVRAISON RAPIDE',
    ],
    en: [
        'CORATINA DOP',
        'COLD-PRESSED',
        'PUGLIA, ITALY',
        'HIGH POLYPHENOLS',
        'ACIDITY < 0.3%',
        'HAND-HARVESTED',
        'ORGANIC CERTIFIED',
        'FAST DELIVERY',
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
            desc: t('product_single_desc'),
            price: lang === 'fr' ? '28 $' : '$28',
            priceNum: 28,
            image: '/images/bottle.png',
            badge: null,
            variantId: null,
        },
        {
            key: 'bundle',
            name: t('product_bundle_name'),
            size: t('product_bundle_size'),
            desc: t('product_bundle_desc'),
            price: lang === 'fr' ? '72 $' : '$72',
            priceNum: 72,
            image: '/images/bundle.png',
            badge: t('product_bundle_badge'),
            variantId: null,
        },
        {
            key: 'pourer',
            name: t('product_pourer_name'),
            size: t('product_pourer_size'),
            desc: t('product_pourer_desc'),
            price: lang === 'fr' ? '14 $' : '$14',
            priceNum: 14,
            image: null,
            badge: null,
            variantId: null,
        },
    ];

    // Map Shopify products if available, otherwise use fallback
    const products = shopifyProducts.length > 0
        ? shopifyProducts.map((edge: any) => {
            const priceAmt = parseFloat(edge.node.variants?.edges?.[0]?.node?.price?.amount || '0');
            return {
                key: edge.node.handle,
                name: edge.node.title,
                size: '',
                desc: edge.node.description || '',
                price: lang === 'fr' ? `${priceAmt.toFixed(2)} $` : `$${priceAmt.toFixed(2)}`,
                priceNum: priceAmt,
                image: edge.node.featuredImage?.url || null,
                badge: null,
                variantId: edge.node.variants?.edges?.[0]?.node?.id || null,
            };
        })
        : fallbackProducts;

    const recipes = [
        {
            title: t('recipe1_title'),
            excerpt: t('recipe1_excerpt'),
            time: t('recipe1_time'),
            category: t('recipe1_category'),
            slug: 'bruschetta-huile-olive-coratina',
            image: '/images/bundle.png',
        },
        {
            title: t('recipe2_title'),
            excerpt: t('recipe2_excerpt'),
            time: t('recipe2_time'),
            category: t('recipe2_category'),
            slug: 'salade-mediterraneenne-vinaigrette-coratina',
            image: '/images/salad.png',
        },
        {
            title: t('recipe3_title'),
            excerpt: t('recipe3_excerpt'),
            time: t('recipe3_time'),
            category: t('recipe3_category'),
            slug: 'pasta-aglio-e-olio',
            image: '/images/pasta.png',
        },
    ];

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
                        src="/images/pour.png"
                        alt="Huile d'olive Coratina La Cantine versée"
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>
                <div className="hero-overlay" aria-hidden="true" />

                <div className="hero-content container">
                    <p className="eyebrow">{t('hero_eyebrow')}</p>
                    <h1 className="heading-display hero-headline">{t('hero_headline')}</h1>
                    <p className="hero-sub">{t('hero_sub')}</p>
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
                                        <img src={product.image} alt={product.name} loading="lazy" />
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
                                    <p className="product-card-desc">{product.desc}</p>
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
                                        <Link to="/shop" className="cta-link">
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
                        {/* DOP Certified */}
                        <div className="feature-item">
                            <svg className="feature-icon" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                                <circle cx="19" cy="19" r="16" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M13 19l4 4 8-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="feature-title">Coratina DOP</p>
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
                                <p className="feature-title">{lang === 'fr' ? 'Livraison gratuite' : 'Free Delivery'}</p>
                                <p className="feature-sub">{lang === 'fr' ? 'Région de Longueuil' : 'Longueuil area'}</p>
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
                                src="/images/artichokes.png"
                                alt={lang === 'fr' ? 'Artichokes rôtis avec huile La Cantine' : 'Roasted artichokes with La Cantine olive oil'}
                                loading="lazy"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Recipes ───────────────────────────────────────────────────── */}
            <section className="section recipes-section">
                <div className="container">
                    <div className="recipes-header">
                        <AnimatedSection>
                            <p className="eyebrow">{t('recipes_eyebrow')}</p>
                            <h2 className="heading-2">{t('recipes_heading')}</h2>
                        </AnimatedSection>
                        <AnimatedSection delay={1} className="hide-mobile">
                            <Link to="/recipes" className="cta-link">
                                {t('recipes_cta')} <span className="arrow">→</span>
                            </Link>
                        </AnimatedSection>
                    </div>

                    <StaggerContainer className="recipes-grid">
                        {recipes.map(recipe => (
                            <Link key={recipe.slug} to={`/recipes/${recipe.slug}`} className="recipe-card">
                                <div className="recipe-card-image">
                                    <img src={recipe.image} alt={recipe.title} loading="lazy" />
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-card-meta">
                                        <span>{recipe.category}</span>
                                        <span className="dot-separator" aria-hidden="true" />
                                        <span>{recipe.time}</span>
                                    </div>
                                    <h3 className="recipe-card-title">{recipe.title}</h3>
                                    <p className="recipe-card-excerpt">{recipe.excerpt}</p>
                                    <div className="recipe-card-link">
                                        <span className="cta-link">
                                            {lang === 'fr' ? 'Voir la recette' : 'View recipe'}{' '}
                                            <span className="arrow">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </StaggerContainer>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
                        <Link to="/recipes" className="btn">
                            {t('recipes_cta')}
                        </Link>
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
                                src="/images/bottle.png"
                                alt={lang === 'fr' ? "Bouteille d'huile d'olive La Cantine" : 'La Cantine olive oil bottle'}
                                loading="lazy"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Reviews ───────────────────────────────────────────────────── */}
            <section className="section reviews-section">
                <div className="container">
                    <AnimatedSection className="reviews-header">
                        <p className="eyebrow">{t('reviews_eyebrow')}</p>
                        <h2 className="heading-2">{t('reviews_heading')}</h2>
                    </AnimatedSection>

                    <AnimatedSection>
                        <div className="reviews-stats">
                            <div className="reviews-stat">
                                <span className="reviews-stat-num">4.9 <span className="reviews-stat-star">★</span></span>
                                <span className="reviews-stat-label">{lang === 'fr' ? 'Note moyenne' : 'Average rating'}</span>
                            </div>
                            <div className="reviews-stat-divider" aria-hidden="true" />
                            <div className="reviews-stat">
                                <span className="reviews-stat-num">500+</span>
                                <span className="reviews-stat-label">{lang === 'fr' ? 'Clients satisfaits' : 'Happy clients'}</span>
                            </div>
                            <div className="reviews-stat-divider" aria-hidden="true" />
                            <div className="reviews-stat">
                                <span className="reviews-stat-num">100%</span>
                                <span className="reviews-stat-label">{lang === 'fr' ? 'Artisanal' : 'Artisanal'}</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="reviews-grid">
                        {REVIEWS.map(review => (
                            <div key={review.name} className="review-card">
                                <div className="review-stars" aria-label="5 étoiles">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <span
                                            key={i}
                                            className="review-star"
                                            style={{ '--star-i': i } as React.CSSProperties}
                                            aria-hidden="true"
                                        >★</span>
                                    ))}
                                </div>
                                <p className="review-quote">"{review.quote[lang]}"</p>
                                <div className="review-author">
                                    <div
                                        className="review-avatar"
                                        style={{ '--avatar-color': review.avatarColor } as React.CSSProperties}
                                        aria-hidden="true"
                                    >
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="review-name">{review.name}</p>
                                        <p className="review-location">{review.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <Footer />
        </>
    );
}
