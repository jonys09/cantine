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

const PROCESS_FR = [
    {
        num: '01',
        title: 'Récolte à maturité',
        desc: "Récoltées au moment idéal, les olives conservent toute la richesse du fruit.",
    },
    {
        num: '02',
        title: 'Pression à froid',
        desc: "Pressées dans les 24 heures suivant la récolte, à température contrôlée, pour préserver arômes et nutriments.",
    },
    {
        num: '03',
        title: 'Sélection exigeante',
        desc: "Nous sélectionnons peu — mais avec exigence, guidés par l'attention, la patience et le respect.",
    },
];

const PROCESS_EN = [
    {
        num: '01',
        title: 'Harvest at peak maturity',
        desc: "Picked at the optimal moment, the olives retain the full richness of the fruit.",
    },
    {
        num: '02',
        title: 'Cold Pressed',
        desc: "Pressed within 24 hours of harvest, at controlled temperatures, to preserve aromas and nutrients.",
    },
    {
        num: '03',
        title: 'Selective sourcing',
        desc: "We select little — but with rigor, guided by attention, patience and respect.",
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
                                metafield(namespace: "custom", key: "presale") {
                                    value
                                }
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

export default function Shop() {
    const { t, lang } = useI18n();
    const { products: shopifyProducts, fromShopify } = useLoaderData<typeof loader>();
    const process = lang === 'fr' ? PROCESS_FR : PROCESS_EN;

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
            const presaleValue = edge.node.metafield?.value ?? null;
            return {
                key: edge.node.handle,
                handle: edge.node.handle,
                name: localizeProduct(edge.node, lang).title,
                price: lang === 'fr' ? `${priceAmt.toFixed(2)} $` : `$${priceAmt.toFixed(2)}`,
                priceNote: '',
                image: images[0]?.node?.url ?? null,
                hoverImage: images[1]?.node?.url ?? null,
                badge: null as string | null,
                presale: presaleValue === 'Yes',
                availableForSale: variant?.availableForSale ?? true,
            };
        })
        : fallbackProducts;

    return (
        <>
            <Header />

            {/* ── Shop Header ─────────────────────────────────────────────── */}
            <div className="shop-header" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("/images/shop_banner.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 55%',
                color: 'var(--color-cream)',
                minHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container">
                    <AnimatedSection>
                        {t('products_eyebrow') && <p className="eyebrow" style={{ color: 'var(--color-cream)' }}>{t('products_eyebrow')}</p>}
                        <h1 style={{ color: 'var(--color-cream)' }}>{t('products_heading')}</h1>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Products Grid ────────────────────────────────────────────── */}
            <section className="section shop-body">
                <div className="container">
                    <StaggerContainer className="shop-products-grid">
                        {products.map(product => (
                            <article
                                key={product.key}
                                className="shop-product-card"
                                aria-label={product.name}
                            >
                                {/* Image */}
                                <div className="shop-product-image">
                                    <Link to={`/products/${product.handle}`} style={{ display: 'block', height: '100%' }}>
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
                                    </Link>
                                    {/* Presale badge — top left, only when metafield = Yes */}
                                    {(product as any).presale && (
                                        <span className="presale-badge">
                                            {lang === 'fr' ? 'Prévente' : 'Pre-sale'}
                                        </span>
                                    )}
                                    {product.badge && (
                                        <span className="shop-product-badge badge badge--terra">
                                            {product.badge}
                                        </span>
                                    )}
                                    <button
                                        className="product-card-quick-add"
                                        type="button"
                                        aria-label={lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
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

                                {/* Info */}
                                <div className="shop-product-body">
                                    <div className="shop-product-top">
                                        <h3 className="shop-product-name">{product.name}</h3>
                                        <span className="shop-product-price" style={{ color: 'var(--color-gray)' }}>{product.price}</span>
                                        {product.priceNote && (
                                            <span className="shop-product-price-note">{product.priceNote}</span>
                                        )}
                                    </div>
                                    <div className="shop-product-footer" style={{ marginTop: 'var(--space-2)' }}>
                                        {!product.availableForSale ? (
                                            <span className="shop-product-sold-out">
                                                {lang === 'fr' ? 'Épuisé' : 'Out of stock'}
                                            </span>
                                        ) : (
                                            <Link to={`/products/${product.handle}`} className="cta-link" style={{ justifyContent: 'center' }}>
                                                {lang === 'fr' ? 'Voir le produit' : 'View product'} <span className="arrow">→</span>
                                            </Link>
                                        )}
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

            {/* ── Notre Approche ────────────────────────────────────────────── */}
            <section className="section process-section">
                <div className="container">
                    <AnimatedSection className="process-header">
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'Notre approche' : 'Our Approach'}
                        </p>
                        <h2 className="heading-2">
                            {lang === 'fr' ? 'Le soin du détail, à chaque étape' : 'Care at every step'}
                        </h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', color: 'var(--color-gray)' }}>
                            {lang === 'fr' ? (
                                <>
                                    Chez Cantine, nous privilégions l'essentiel :<br />
                                    une origine claire, des gestes maîtrisés et une exigence constante.<br />
                                    Nous sélectionnons peu, mais avec précision.
                                </>
                            ) : (
                                <>
                                    At Cantine, we focus on what matters most:<br />
                                    a clear origin, controlled processes and uncompromising standards.<br />
                                    We select little but with precision.
                                </>
                            )}
                        </p>
                    </AnimatedSection>

                    <StaggerContainer className="process-grid">
                        {process.map(step => (
                            <div key={step.num} className="process-step">
                                <p className="process-step-num">{step.num}</p>
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </StaggerContainer>
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
