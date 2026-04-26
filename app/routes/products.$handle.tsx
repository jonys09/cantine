import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import { useState, useCallback } from 'react';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n, localizeProduct } from '~/lib/i18n';
import { useCart } from '~/lib/cart';

/* ── Types ────────────────────────────────────────────────────────────────── */
type ProductImage = { url: string; altText: string | null };
type ProductVariant = {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
};
type ShopifyProduct = {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    images: ProductImage[];
    variants: ProductVariant[];
    tags: string[];
    vendor: string;
};

/* ── Loader ───────────────────────────────────────────────────────────────── */
export async function loader({ request, params, context }: LoaderFunctionArgs) {
    const { handle } = params;
    const env = context.env as Env;

    const cookieLang = request.headers.get('cookie')?.match(/cantine-lang=(fr|en)/)?.[1] ?? 'fr';
    const acceptLanguage = cookieLang === 'en' ? 'en-CA,en;q=0.9' : 'fr-CA,fr;q=0.9';

    if (env.PUBLIC_STOREFRONT_API_TOKEN && env.PUBLIC_STORE_DOMAIN && handle) {
        try {
            const languageCode = cookieLang === 'en' ? 'EN' : 'FR';
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
                        query: `
                            query ProductByHandle($handle: String!, $language: LanguageCode) @inContext(language: $language) {
                                product(handle: $handle) {
                                    id handle title
                                    description(truncateAt: 2000)
                                    descriptionHtml
                                    vendor tags
                                    images(first: 20) {
                                        edges { node { url altText } }
                                    }
                                    variants(first: 10) {
                                        edges {
                                            node {
                                                id title
                                                price { amount currencyCode }
                                                availableForSale
                                                selectedOptions { name value }
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        variables: { handle, language: languageCode },
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json() as any;
                if (!data.errors && data.data?.product) {
                    const p = data.data.product;
                    const product: ShopifyProduct = {
                        id: p.id,
                        handle: p.handle,
                        title: p.title,
                        description: p.description,
                        descriptionHtml: p.descriptionHtml,
                        images: p.images.edges.map((e: any) => e.node),
                        variants: p.variants.edges.map((e: any) => e.node),
                        tags: p.tags,
                        vendor: p.vendor,
                    };
                    return { product, lang: cookieLang };
                }
            }
        } catch {
            /* fall through */
        }
    }

    return { product: null, lang: cookieLang };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = data?.product?.title ?? 'Produit';
    return [
        { title: `${title} — La Cantine` },
        {
            name: 'description',
            content: data?.product?.description?.slice(0, 155) ?? "Huile d'olive 100% Coratina des Pouilles — La Cantine.",
        },
    ];
};

/* ── Component ────────────────────────────────────────────────────────────── */
export default function ProductDetail() {
    const { product: rawProduct } = useLoaderData<typeof loader>();
    const { addItem } = useCart();
    const { t, lang } = useI18n();
    const product = localizeProduct(rawProduct, lang);

    const [activeImage, setActiveImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const handleAddToCart = useCallback(() => {
        if (!product) return;
        const variant = product.variants[selectedVariant];
        const priceAmt = parseFloat(variant?.price?.amount || '0');
        const priceLabel = lang === 'fr' ? `${priceAmt.toFixed(2)} $` : `$${priceAmt.toFixed(2)}`;
        addItem({
            id: product.handle,
            name: product.title,
            price: priceAmt,
            priceLabel,
            image: product.images[0]?.url ?? null,
        });
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 2200);
    }, [product, selectedVariant, lang, addItem]);

    if (!product) {
        return (
            <>
                <Header />
                <div className="not-found-page">
                    <div>
                        <p style={{ fontSize: '3rem' }}>🫙</p>
                        <h1>{lang === 'fr' ? 'Produit introuvable' : 'Product not found'}</h1>
                        <p>
                            {lang === 'fr'
                                ? "Ce produit n'existe pas ou a été retiré."
                                : "This product doesn't exist or has been removed."}
                        </p>
                        <Link to="/shop" className="btn btn-filled">
                            {lang === 'fr' ? 'Voir la boutique' : 'Visit the shop'}
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const variant = product.variants[selectedVariant];
    const priceAmt = parseFloat(variant?.price?.amount || '0');
    const priceLabel = lang === 'fr'
        ? `${priceAmt.toFixed(2)} $`
        : `$${priceAmt.toFixed(2)}`;
    const isAvailable = variant?.availableForSale !== false;

    return (
        <>
            <Header />

            {/* ── Breadcrumb ──────────────────────────────────────────────── */}
            <div className="pdp-breadcrumb">
                <div className="container">
                    <nav aria-label="breadcrumb" className="pdp-breadcrumb-nav">
                        <Link to="/shop" className="pdp-breadcrumb-link">
                            {lang === 'fr' ? 'Boutique' : 'Shop'}
                        </Link>
                        <span className="pdp-breadcrumb-sep" aria-hidden="true">/</span>
                        <span className="pdp-breadcrumb-current">{product.title}</span>
                    </nav>
                </div>
            </div>

            {/* ── Main PDP Layout ─────────────────────────────────────────── */}
            <section className="pdp-section">
                <div className="container">
                    <div className="pdp-inner">

                        {/* ══ LEFT: Gallery ═══════════════════════════════════ */}
                        <div className="pdp-gallery">

                            {/* Main image */}
                            <div className="pdp-main-image">
                                {product.images.length > 0 ? (
                                    <>
                                        <img
                                            key={activeImage}
                                            src={product.images[activeImage].url}
                                            alt={product.images[activeImage].altText ?? product.title}
                                            loading="eager"
                                            className="pdp-main-img"
                                        />
                                        {product.images.length > 1 && (
                                            <>
                                                <button
                                                    className="pdp-nav-arrow pdp-nav-prev"
                                                    onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                                                    aria-label="Previous image"
                                                >
                                                    &larr;
                                                </button>
                                                <button
                                                    className="pdp-nav-arrow pdp-nav-next"
                                                    onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                                                    aria-label="Next image"
                                                >
                                                    &rarr;
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="pdp-no-image">🫙</div>
                                )}
                            </div>

                            {/* Thumbnail strip */}
                            {product.images.length > 1 && (
                                <div
                                    className="pdp-thumbnails"
                                    role="list"
                                    aria-label={lang === 'fr' ? 'Galerie produit' : 'Product gallery'}
                                >
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            role="listitem"
                                            className={`pdp-thumb${i === activeImage ? ' pdp-thumb--active' : ''}`}
                                            onClick={() => setActiveImage(i)}
                                            aria-label={`Image ${i + 1}`}
                                            aria-pressed={i === activeImage}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.altText ?? `${product.title} ${i + 1}`}
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ══ RIGHT: Product Info ══════════════════════════════ */}
                        <div className="pdp-info">

                            {/* Origin label */}
                            <div className="pdp-origin">
                                <span className="pdp-origin-dot" aria-hidden="true" />
                                <span>
                                    {product.vendor
                                        ? `${product.vendor} · Puglia, Italie`
                                        : 'Puglia, Italie'}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="pdp-title">{product.title}</h1>

                            {/* Price row */}
                            <div className="pdp-price-row">
                                <span className="pdp-price">{priceLabel}</span>
                                {!isAvailable && (
                                    <span className="pdp-out-of-stock">
                                        {lang === 'fr' ? 'Épuisé' : 'Out of stock'}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            {product.descriptionHtml ? (
                                <div
                                    className="pdp-description"
                                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                                />
                            ) : product.description ? (
                                <p className="pdp-description">{product.description}</p>
                            ) : null}

                            {/* Variant selector */}
                            {product.variants.length > 1 && (
                                <div className="pdp-variants">
                                    <p className="pdp-variants-label">
                                        {lang === 'fr' ? 'Format' : 'Size'}
                                    </p>
                                    <div className="pdp-variant-pills">
                                        {product.variants.map((v, i) => (
                                            <button
                                                key={v.id}
                                                type="button"
                                                className={`pdp-variant-pill${i === selectedVariant ? ' pdp-variant-pill--active' : ''}${!v.availableForSale ? ' pdp-variant-pill--sold-out' : ''}`}
                                                onClick={() => setSelectedVariant(i)}
                                                disabled={!v.availableForSale}
                                            >
                                                {v.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Trust badges */}
                            <div className="pdp-badges">
                                <div className="pdp-badge">
                                    <span className="pdp-badge-icon">🫒</span>
                                    <span>100% Coratina</span>
                                </div>
                                <div className="pdp-badge">
                                    <span className="pdp-badge-icon">❄️</span>
                                    <span>{lang === 'fr' ? 'Pressée à froid' : 'Cold-pressed'}</span>
                                </div>
                                <div className="pdp-badge">
                                    <span className="pdp-badge-icon">🚚</span>
                                    <span>{lang === 'fr' ? 'Livraison au Canada' : 'Canada shipping'}</span>
                                </div>
                                <div className="pdp-badge">
                                    <span className="pdp-badge-icon">🌿</span>
                                    <span>{lang === 'fr' ? 'Riche en polyphénols' : 'High polyphenols'}</span>
                                </div>
                            </div>

                            {/* Add to cart */}
                            <div className="pdp-cta">
                                <button
                                    type="button"
                                    className={`btn btn-filled pdp-atc-btn${addedFeedback ? ' pdp-atc-btn--added' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={!isAvailable}
                                    id="pdp-add-to-cart"
                                >
                                    {addedFeedback
                                        ? (lang === 'fr' ? '✓ Ajouté au panier' : '✓ Added to cart')
                                        : (!isAvailable
                                            ? (lang === 'fr' ? 'Épuisé' : 'Out of stock')
                                            : t('product_cta')
                                        )
                                    }
                                </button>
                                <Link to="/shop" className="pdp-back-link">
                                    {lang === 'fr' ? '← Retour à la boutique' : '← Back to shop'}
                                </Link>
                            </div>

                            {/* Tags */}
                            {product.tags.filter(tag => tag !== 'DOP').length > 0 && (
                                <div className="pdp-tags">
                                    {product.tags.filter(tag => tag !== 'DOP').map(tag => (
                                        <span key={tag} className="pdp-tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Quality Callouts ──────────────────────────────────────────── */}
            <section className="pdp-qualities-section">
                <div className="container">
                    <div className="pdp-qualities-grid">
                        {[
                            {
                                num: '< 0,2%',
                                label: lang === 'fr' ? 'Acidité' : 'Acidity',
                                sub: lang === 'fr' ? 'Extra vierge certifiée' : 'Certified extra virgin',
                            },
                            {
                                num: '24h',
                                label: lang === 'fr' ? 'Après récolte' : 'After harvest',
                                sub: lang === 'fr' ? 'Première pression à froid' : 'First cold press',
                            },
                            {
                                num: '100%',
                                label: 'Coratina',
                                sub: lang === 'fr' ? 'Variété pure, Puglia' : 'Single variety, Puglia',
                            },
                            {
                                num: '2024',
                                label: lang === 'fr' ? 'Récolte' : 'Harvest',
                                sub: lang === 'fr' ? 'Saison fraîche' : 'Fresh season',
                            },
                        ].map(item => (
                            <div key={item.label} className="pdp-quality-item">
                                <span className="pdp-quality-num">{item.num}</span>
                                <span className="pdp-quality-label">{item.label}</span>
                                <span className="pdp-quality-sub">{item.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
