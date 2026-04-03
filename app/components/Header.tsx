import { useState, useEffect } from 'react';
import { Link, useLocation, useRevalidator } from 'react-router';
import { useI18n } from '~/lib/i18n';
import { useCart } from '~/lib/cart';

function LogoMark() {
    return (
        <svg
            className="header-logo-mark"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle cx="14" cy="14" r="12.5" stroke="currentColor" strokeWidth="0.75" />
            <ellipse cx="14" cy="14.5" rx="4" ry="6" stroke="currentColor" strokeWidth="0.75" />
            <path d="M10.5 12C12 10.8 15 11.2 17 12.5" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" />
            <path d="M10 14.5C11.8 13.3 15.5 13.8 17.5 15" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" />
            <line x1="14" y1="8" x2="14" y2="8.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
        </svg>
    );
}

export function Header({ transparent = false }: { transparent?: boolean }) {
    const { t, lang, toggle, changeLang } = useI18n();
    const { itemCount, openCart } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const revalidator = useRevalidator();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isTransparent = transparent && !scrolled && !mobileOpen;
    const headerClass = `header ${isTransparent ? 'header--transparent' : 'header--scrolled'}`;

    const navLinks = [
        { to: '/shop', label: t('nav_shop') },
        { to: '/about', label: t('nav_story') },
        { to: '/recipes', label: t('nav_recipes') },
        { to: '/contact', label: lang === 'fr' ? 'Contact' : 'Contact' },
    ];

    const isActive = (to: string) =>
        location.pathname === to || location.pathname.startsWith(to + '/');

    const handleLangChange = (newLang: 'fr' | 'en') => {
        changeLang(newLang);
        // Force React Router to re-run all server loaders with the new Accept-Language cookie
        if (revalidator.state === 'idle') revalidator.revalidate();
    };

    return (
        <>
            <header className={headerClass}>
                <div className="header-inner">
                    {/* Logo */}
                    <Link to="/" className="header-logo" aria-label="La Cantine — Accueil">
                        <LogoMark />
                        <span className="header-logo-text">
                            La Cantine
                            <span>Huile d'Olive · Puglia</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="header-nav" aria-label="Navigation principale">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`header-nav-link${isActive(to) ? ' active' : ''}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        {/* FR|EN toggle */}
                        <div className="lang-toggle-group">
                            <button
                                className={`lang-opt${lang === 'fr' ? ' lang-opt--active' : ''}`}
                                onClick={() => handleLangChange('fr')}
                                aria-label="Français"
                            >FR</button>
                            <span className="lang-sep" aria-hidden="true">|</span>
                            <button
                                className={`lang-opt${lang === 'en' ? ' lang-opt--active' : ''}`}
                                onClick={() => handleLangChange('en')}
                                aria-label="English"
                            >EN</button>
                        </div>

                        <button
                            className="header-action-btn cart-btn"
                            aria-label={t('nav_cart')}
                            onClick={openCart}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M1.5 1.5H3.5L5.2 11H13.8L16 4.5H4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="7" cy="14.5" r="1.2" fill="currentColor" />
                                <circle cx="12" cy="14.5" r="1.2" fill="currentColor" />
                            </svg>
                            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                        </button>

                        {/* Mobile hamburger */}
                        <button
                            className={`hamburger${mobileOpen ? ' open' : ''}`}
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={mobileOpen}
                        >
                            <span className="hamburger-line" />
                            <span className="hamburger-line" />
                            <span className="hamburger-line" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <nav
                className={`mobile-menu${mobileOpen ? ' open' : ''}`}
                aria-hidden={!mobileOpen}
                aria-label="Navigation mobile"
            >
                {navLinks.map(({ to, label }) => (
                    <Link key={to} to={to} className="mobile-nav-link">
                        {label}
                    </Link>
                ))}

                <div className="mobile-menu-footer">
                    <button className="mobile-menu-lang" onClick={() => handleLangChange(lang === 'fr' ? 'en' : 'fr')}>
                        {lang === 'fr' ? 'English' : 'Français'}
                    </button>
                    <div className="mobile-menu-social">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
