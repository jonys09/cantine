import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Politique de Livraison — La Cantine" },
    {
        name: 'description',
        content:
            "Notre politique de livraison : livraison au Canada, délais, tarifs et informations de suivi. Shipping Policy — La Cantine.",
    },
];

export default function Livraison() {
    const { lang } = useI18n();

    return (
        <>
            <Header />

            {/* ── Page Hero ─────────────────────────────────────────────────── */}
            <div className="page-hero">
                <div className="container container-narrow">
                    <AnimatedSection>
                        <p className="eyebrow">
                            {lang === 'fr' ? 'Informations' : 'Information'}
                        </p>
                        <h1>
                            {lang === 'fr' ? 'Politique de livraison' : 'Shipping Policy'}
                        </h1>
                        <p className="page-hero-sub">
                            {lang === 'fr'
                                ? 'Tout ce que vous devez savoir sur la livraison de vos commandes.'
                                : 'Everything you need to know about your order delivery.'}
                        </p>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Policy Body ───────────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container container-narrow">
                    <AnimatedSection>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
                            {/* General Shipping Info Text */}
                            <div style={{ 
                                padding: 'var(--space-8)', 
                                backgroundColor: 'var(--color-bg-subtle)', 
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--color-border)',
                                fontSize: 'var(--font-size-md)',
                                lineHeight: 1.6,
                                color: 'var(--color-text)'
                            }}>
                                <p style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr'
                                        ? 'Nous expédions nos produits partout à travers le Canada. Les commandes sont préparées sous 48 heures ouvrables, du lundi au vendredi, avec des délais de livraison variant généralement entre 1 et 7 jours ouvrables.'
                                        : 'We ship our products anywhere across Canada. Orders are prepared within 48 business hours, Monday to Friday, with delivery typically taking between 1 to 7 business days.'}
                                </p>
                                <p style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr'
                                        ? 'Dès l\'expédition de votre commande, un numéro de suivi vous sera transmis par courriel afin de suivre l\'acheminement de votre colis en toute tranquillité.'
                                        : 'Once your order ships, a tracking number will be sent to you by email so you can monitor your package’s journey with peace of mind.'}
                                </p>
                                <p style={{ color: 'var(--color-gray)', fontSize: '0.9em' }}>
                                    {lang === 'fr'
                                        ? "* Veuillez-vous assurer de l'exactitude des informations fournies au moment de la commande."
                                        : '* Please ensure all shipping details are accurate at checkout.'}
                                </p>
                            </div>

                            {/* Rates Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                                {/* QC / ON card */}
                                <div style={{
                                    padding: 'var(--space-8)',
                                    backgroundColor: 'var(--color-bg-subtle)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}>
                                    <p className="eyebrow eyebrow--olive" style={{ marginBottom: 'var(--space-4)' }}>
                                        {lang === 'fr' ? 'Québec & Ontario' : 'Québec & Ontario'}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                            <span style={{ color: 'var(--color-olive)', fontWeight: 600, marginTop: '2px' }}>✓</span>
                                            <span>
                                                {lang === 'fr' ? 'Livraison offerte à partir de 125 $' : 'Complimentary shipping on orders over $125'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                            <span style={{ color: 'var(--color-terra)', fontWeight: 600, marginTop: '2px' }}>→</span>
                                            <span style={{ color: 'var(--color-gray)' }}>
                                                {lang === 'fr' ? 'Tarif fixe de 15 $ pour les commandes inférieures' : 'Flat rate of $15 for smaller orders'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Other provinces card */}
                                <div style={{
                                    padding: 'var(--space-8)',
                                    backgroundColor: 'var(--color-bg-subtle)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}>
                                    <p className="eyebrow eyebrow--olive" style={{ marginBottom: 'var(--space-4)' }}>
                                        {lang === 'fr' ? 'Autres provinces' : 'Other Provinces'}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                            <span style={{ color: 'var(--color-olive)', fontWeight: 600, marginTop: '2px' }}>✓</span>
                                            <span>
                                                {lang === 'fr' ? 'Livraison offerte à partir de 150 $' : 'Complimentary shipping on orders over $150'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                            <span style={{ color: 'var(--color-terra)', fontWeight: 600, marginTop: '2px' }}>→</span>
                                            <span style={{ color: 'var(--color-gray)' }}>
                                                {lang === 'fr' ? 'Tarif fixe de 15 $ pour les commandes inférieures' : 'Flat rate of $15 for smaller orders'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA block */}
                            <div style={{
                                marginTop: 'var(--space-4)',
                                paddingTop: 'var(--space-8)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                borderTop: '1px solid var(--color-border)'
                            }}>
                                <p style={{ color: 'var(--color-gray)', marginBottom: 'var(--space-6)', maxWidth: '440px', lineHeight: 1.5 }}>
                                    {lang === 'fr'
                                        ? 'Des questions sur votre commande ou la livraison ? Nous sommes là pour vous aider.'
                                        : 'Questions about your order or shipping? We are here to help.'}
                                </p>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <Link to="/contact" className="btn">
                                        {lang === 'fr' ? 'Nous contacter' : 'Contact us'}
                                    </Link>
                                    <Link to="/shop" className="btn btn-filled">
                                        {lang === 'fr' ? 'Continuer vos achats' : 'Continue shopping'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </>
    );
}
