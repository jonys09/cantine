import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '~/lib/cart';
import { useI18n } from '~/lib/i18n';

export function CartDrawer() {
    const { items, removeItem, updateQty, itemCount, subtotal, isOpen, closeCart } = useCart();
    const { t, lang } = useI18n();

    // Sync body class for CSS-driven overlay / drawer open state
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('cart-open');
        } else {
            document.body.classList.remove('cart-open');
        }
        return () => {
            document.body.classList.remove('cart-open');
        };
    }, [isOpen]);

    // Format price for line items: "28 $" (fr) or "$28" (en)
    const formatPrice = (amount: number) => {
        if (lang === 'fr') {
            return `${amount} $`;
        }
        return `$${amount}`;
    };

    // Format subtotal: "120,00 $" (fr) or "$120.00" (en)
    const formatSubtotal = (amount: number) => {
        if (lang === 'fr') {
            return `${amount.toFixed(2).replace('.', ',')} $`;
        }
        return `$${amount.toFixed(2)}`;
    };

    const [checkingOut, setCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setCheckingOut(true);
        setCheckoutError(null);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({
                        variantId: (item as any).variantId ?? null,
                        quantity: item.quantity,
                        name: item.name,
                    })),
                }),
            });
            const data = await response.json() as any;
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else if (data.error === 'no_shopify_items') {
                setCheckoutError(
                    lang === 'fr'
                        ? 'Ajoutez des produits depuis la boutique pour passer à la caisse.'
                        : 'Add products from the shop page to proceed to checkout.'
                );
            } else {
                setCheckoutError(data.error || (lang === 'fr' ? 'Erreur lors du paiement.' : 'Checkout error.'));
            }
        } catch {
            setCheckoutError(lang === 'fr' ? 'Erreur de connexion.' : 'Connection error.');
        } finally {
            setCheckingOut(false);
        }
    };

    return (
        <React.Fragment>
            {/* Backdrop overlay */}
            <div
                className="cart-drawer-overlay"
                onClick={() => closeCart()}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                className="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-label={t('cart_title')}
            >
                {/* Header */}
                <div className="cart-drawer-header">
                    <h2>
                        {t('cart_title')}
                        {itemCount > 0 && (
                            <span style={{
                                marginLeft: 'var(--space-2)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--color-gray)',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                            }}>
                                ({itemCount})
                            </span>
                        )}
                    </h2>
                    <button
                        className="cart-drawer-close header-action-btn"
                        onClick={() => closeCart()}
                        aria-label={lang === 'fr' ? 'Fermer le panier' : 'Close cart'}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                            <path
                                d="M2 2L16 16M16 2L2 16"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="cart-drawer-content">
                    {items.length === 0 ? (
                        <div className="cart-drawer-empty">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                                <path
                                    d="M4 4H8L12 28H32L36 12H10"
                                    stroke="var(--color-border-dark)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="16" cy="33" r="2.5" fill="var(--color-border-dark)" />
                                <circle cx="28" cy="33" r="2.5" fill="var(--color-border-dark)" />
                            </svg>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray)' }}>
                                {t('cart_empty')}
                            </p>
                            <Link
                                to="/shop"
                                className="btn"
                                onClick={() => closeCart()}
                            >
                                {t('cart_continue')}
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-drawer-lines">
                            {items.map(item => (
                                <div key={item.id} className="cart-drawer-line">
                                    {/* Product image */}
                                    <div className="cart-drawer-line-image">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="cart-drawer-image-placeholder" aria-hidden="true" />
                                        )}
                                    </div>

                                    {/* Product info */}
                                    <div className="cart-drawer-line-info">
                                        <div className="cart-drawer-line-header">
                                            <h3>{item.name}</h3>
                                            <span className="cart-drawer-price">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>

                                        <span className="cart-drawer-variant">
                                            {formatPrice(item.price)} {lang === 'fr' ? '/ unité' : '/ each'}
                                        </span>

                                        <div className="cart-drawer-line-actions">
                                            {/* Quantity controls */}
                                            <div className="cart-drawer-qty">
                                                <button
                                                    className="cart-drawer-qty-btn"
                                                    onClick={() => updateQty(item.id, item.quantity - 1)}
                                                    aria-label={lang === 'fr' ? 'Réduire la quantité' : 'Decrease quantity'}
                                                    type="button"
                                                >
                                                    −
                                                </button>
                                                <span className="cart-drawer-qty-val">{item.quantity}</span>
                                                <button
                                                    className="cart-drawer-qty-btn"
                                                    onClick={() => updateQty(item.id, item.quantity + 1)}
                                                    aria-label={lang === 'fr' ? 'Augmenter la quantité' : 'Increase quantity'}
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                className="cart-drawer-remove"
                                                onClick={() => removeItem(item.id)}
                                                type="button"
                                            >
                                                {t('cart_remove')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer — only shown when items exist */}
                {items.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-drawer-summary">
                            <span>{t('cart_subtotal')}</span>
                            <span>{formatSubtotal(subtotal)}</span>
                        </div>

                        <p className="cart-drawer-note">{t('cart_note')}</p>

                        {checkoutError && (
                            <p style={{
                                fontSize: 'var(--text-xs)',
                                color: 'var(--color-terra)',
                                marginBottom: 'var(--space-3)',
                                textAlign: 'center',
                            }}>
                                {checkoutError}
                            </p>
                        )}

                        <button
                            className="btn btn-filled cart-drawer-checkout"
                            type="button"
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            style={{ opacity: checkingOut ? 0.7 : 1 }}
                        >
                            {checkingOut
                                ? (lang === 'fr' ? 'Redirection...' : 'Redirecting...')
                                : `${lang === 'fr' ? 'Paiement sécurisé' : 'Secure checkout'} — ${formatSubtotal(subtotal)}`}
                        </button>

                        <button
                            className="btn cart-drawer-checkout"
                            type="button"
                            onClick={() => closeCart()}
                            style={{ textAlign: 'center', justifyContent: 'center' }}
                        >
                            {t('cart_continue')}
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
