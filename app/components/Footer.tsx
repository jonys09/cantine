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
                                href="https://instagram.com/lacantineco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.1" />
                                    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.1" />
                                    <circle cx="10.5" cy="3.5" r="0.7" fill="currentColor" />
                                </svg>
                                Instagram
                            </a>
                            <a
                                href="https://facebook.com/lacantineco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path d="M9 2.5H7.5C6.4 2.5 5.5 3.4 5.5 4.5V6H3.5V8H5.5V12.5H7.5V8H9L9.5 6H7.5V5C7.5 4.7 7.7 4.5 8 4.5H9V2.5Z" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinejoin="round" />
                                </svg>
                                Facebook
                            </a>
                            <a
                                href="https://ca.pinterest.com/christopher0042/olive-oil/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.435 2.981 7.435 6.942 0 4.156-2.617 7.502-6.255 7.502-1.22 0-2.368-.634-2.761-1.385l-.754 2.876c-.274 1.039-1.023 2.34-1.524 3.136 1.189.362 2.453.559 3.754.559 6.627 0 11.986-5.365 11.986-11.985C24 5.367 18.636 0 12.017 0z"/>
                                </svg>
                                Pinterest
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
