import { useState } from 'react';
import { Link } from 'react-router';
import { useI18n } from '~/lib/i18n';

export function Footer() {
    const { t, lang } = useI18n();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    const companyLinks = [
        { label: t('nav_story'), to: '/about' },
        { label: t('nav_recipes'), to: '/recipes' },
        { label: t('nav_stores'), to: '/about#stores' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-main">
                    {/* Brand column */}
                    <div className="footer-brand-col">
                        <Link to="/" className="footer-logo">
                            La Cantine
                        </Link>
                        <p className="footer-tagline">{t('footer_tagline')}</p>
                        <div className="footer-social">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="1.5"
                                        y="1.5"
                                        width="11"
                                        height="11"
                                        rx="3"
                                        stroke="currentColor"
                                        strokeWidth="1.1"
                                    />
                                    <circle
                                        cx="7"
                                        cy="7"
                                        r="2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.1"
                                    />
                                    <circle cx="10.5" cy="3.5" r="0.7" fill="currentColor" />
                                </svg>
                                Instagram
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M9 2.5H7.5C6.4 2.5 5.5 3.4 5.5 4.5V6H3.5V8H5.5V12.5H7.5V8H9L9.5 6H7.5V5C7.5 4.7 7.7 4.5 8 4.5H9V2.5Z"
                                        stroke="currentColor"
                                        strokeWidth="0.9"
                                        fill="none"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Facebook
                            </a>
                        </div>
                    </div>

                    {/* Company links */}
                    <div className="footer-col">
                        <h3 className="footer-col-heading">{t('footer_company')}</h3>
                        <ul className="footer-links">
                            {companyLinks.map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-newsletter-col">
                        <h3 className="footer-col-heading">{t('footer_follow')}</h3>
                        <p className="footer-newsletter-sub">{t('newsletter_sub')}</p>
                        {submitted ? (
                            <p className="footer-success">{t('newsletter_success')}</p>
                        ) : (
                            <form className="footer-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="footer-email-input"
                                    placeholder={t('newsletter_placeholder')}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="footer-submit">
                                    {t('newsletter_cta')} →
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p className="footer-legal">
                        © {new Date().getFullYear()} La Cantine · {t('footer_legal')}
                    </p>
                    <p className="footer-credit">
                        {lang === 'fr' ? 'Fait avec' : 'Made with'}{' '}
                        <span className="footer-heart">♥</span>{' '}
                        {lang === 'fr' ? 'par' : 'by'}{' '}
                        <a href="https://Ytechs.ca" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
                            Ytechs
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
