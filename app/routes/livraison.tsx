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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>

                            {/* Zone de livraison */}
                            <div>
                                <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr' ? 'Zone de livraison' : 'Delivery Area'}
                                </h2>
                                <p className="body-lg">
                                    {lang === 'fr'
                                        ? 'Nous livrons à travers le Canada.'
                                        : 'We ship across Canada.'}
                                </p>
                            </div>

                            {/* Délais */}
                            <div>
                                <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr' ? 'Délais de préparation et livraison' : 'Processing & Delivery Times'}
                                </h2>
                                <p>
                                    {lang === 'fr'
                                        ? 'Les commandes sont préparées sous 48 heures ouvrables, du lundi au vendredi. Les délais de livraison varient généralement entre 1 et 7 jours ouvrables.'
                                        : 'Orders are prepared within 48 business hours, Monday to Friday. Delivery typically takes between 1 to 7 business days.'}
                                </p>
                                <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-gray)' }}>
                                    {lang === 'fr'
                                        ? "Veuillez-vous assurer de l'exactitude des informations fournies au moment de la commande."
                                        : 'Please ensure all shipping details are accurate at checkout.'}
                                </p>
                            </div>

                            {/* Tarifs */}
                            <div>
                                <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr' ? 'Tarifs de livraison' : 'Shipping Rates'}
                                </h2>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                        gap: 'var(--space-6)',
                                        marginTop: 'var(--space-4)',
                                    }}
                                >
                                    {/* QC / ON card */}
                                    <div
                                        style={{
                                            padding: 'var(--space-8)',
                                            backgroundColor: 'var(--color-bg-subtle)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--color-border)',
                                        }}
                                    >
                                        <p
                                            className="eyebrow eyebrow--olive"
                                            style={{ marginBottom: 'var(--space-3)' }}
                                        >
                                            {lang === 'fr' ? 'Québec & Ontario' : 'Québec & Ontario'}
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <span style={{ color: 'var(--color-olive)', fontWeight: 600 }}>✓</span>
                                                <span>
                                                    {lang === 'fr'
                                                        ? 'Offerte à partir de 125 $'
                                                        : 'Complimentary on orders over $125'}
                                                </span>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <span style={{ color: 'var(--color-terra)', fontWeight: 600 }}>→</span>
                                                <span>
                                                    {lang === 'fr'
                                                        ? 'Sinon, 15 $'
                                                        : 'Otherwise, $15'}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Other provinces card */}
                                    <div
                                        style={{
                                            padding: 'var(--space-8)',
                                            backgroundColor: 'var(--color-bg-subtle)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--color-border)',
                                        }}
                                    >
                                        <p
                                            className="eyebrow eyebrow--olive"
                                            style={{ marginBottom: 'var(--space-3)' }}
                                        >
                                            {lang === 'fr' ? 'Autres provinces' : 'Other Provinces'}
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <span style={{ color: 'var(--color-olive)', fontWeight: 600 }}>✓</span>
                                                <span>
                                                    {lang === 'fr'
                                                        ? 'Offerte à partir de 150 $'
                                                        : 'Complimentary on orders over $150'}
                                                </span>
                                            </li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                                <span style={{ color: 'var(--color-terra)', fontWeight: 600 }}>→</span>
                                                <span>
                                                    {lang === 'fr'
                                                        ? 'Sinon, 15 $'
                                                        : 'Otherwise, $15'}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Suivi */}
                            <div>
                                <h2 className="heading-2" style={{ marginBottom: 'var(--space-4)' }}>
                                    {lang === 'fr' ? 'Suivi de commande' : 'Order Tracking'}
                                </h2>
                                <p>
                                    {lang === 'fr'
                                        ? 'Un numéro de suivi vous sera transmis par courriel à l\'expédition pour suivre votre colis.'
                                        : 'A tracking number will be provided by email once your order has shipped.'}
                                </p>
                            </div>

                            {/* CTA */}
                            <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                                <p style={{ color: 'var(--color-gray)', marginBottom: 'var(--space-6)' }}>
                                    {lang === 'fr'
                                        ? 'Des questions sur votre commande ? Contactez-nous à tout moment.'
                                        : 'Questions about your order? Contact us at any time.'}
                                </p>
                                <Link to="/shop" className="btn btn-filled">
                                    {lang === 'fr' ? 'Commander maintenant' : 'Order now'}
                                </Link>
                            </div>

                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </>
    );
}
