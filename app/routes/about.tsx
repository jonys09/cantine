import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Notre Histoire — La Cantine" },
    {
        name: 'description',
        content:
            "Découvrez l'histoire de La Cantine : de Puglia au Québec, une passion pour l'huile d'olive artisanale italienne.",
    },
];

const VALUES_FR = [
    {
        title: 'Authenticité',
        desc: "Directement des oliveraies centenaires de Coratina, en Puglia. Aucun intermédiaire, aucun compromis.",
    },
    {
        title: 'Qualité Exceptionnelle',
        desc: "Pressée à froid dans les 24h après la récolte. Acidité inférieure à 0,2 %. Certification DOP garantie.",
    },
    {
        title: 'Durabilité',
        desc: "Agriculture raisonnée, respect des écosystèmes, préservation des pratiques ancestrales de la région.",
    },
    {
        title: 'Traçabilité Totale',
        desc: "Chaque bouteille est traçable jusqu'au moulin Panorama Pieralisi. Vous savez exactement ce que vous buvez.",
    },
];

const VALUES_EN = [
    {
        title: 'Authenticity',
        desc: "Directly from century-old Coratina groves in Puglia. No intermediaries, no compromises.",
    },
    {
        title: 'Exceptional Quality',
        desc: "Cold-pressed within 24 hours of harvest. Acidity below 0.2%. Guaranteed DOP certification.",
    },
    {
        title: 'Sustainability',
        desc: "Responsible farming, ecosystem respect, preserving the ancestral practices of the region.",
    },
    {
        title: 'Full Traceability',
        desc: "Every bottle is traceable to the Panorama Pieralisi mill. You know exactly what you're getting.",
    },
];

const PROCESS_FR = [
    {
        num: '01',
        title: 'Récolte Manuelle',
        desc: "En octobre-novembre, les olives Coratina sont récoltées à la main au pic de leur maturité. Cette méthode préserve les fruits et maximise les polyphénols.",
    },
    {
        num: '02',
        title: 'Pression à Froid',
        desc: "Dans les 24h suivant la récolte, les olives sont pressées à froid au moulin Panorama Pieralisi. La température contrôlée préserve tous les arômes et nutriments.",
    },
    {
        num: '03',
        title: 'Certification DOP',
        desc: "Notre huile est certifiée DOP (Denominazione di Origine Protetta), la plus haute distinction de qualité italienne pour les huiles d'olive.",
    },
];

const PROCESS_EN = [
    {
        num: '01',
        title: 'Hand Harvesting',
        desc: "In October-November, Coratina olives are hand-picked at peak ripeness. This method preserves the fruit and maximizes polyphenols.",
    },
    {
        num: '02',
        title: 'Cold Pressing',
        desc: "Within 24 hours of harvest, the olives are cold-pressed at the Panorama Pieralisi mill. Controlled temperature preserves all aromas and nutrients.",
    },
    {
        num: '03',
        title: 'DOP Certification',
        desc: "Our oil is DOP certified (Denominazione di Origine Protetta), the highest quality distinction for Italian olive oils.",
    },
];

export default function About() {
    const { t, lang } = useI18n();
    const values = lang === 'fr' ? VALUES_FR : VALUES_EN;
    const process = lang === 'fr' ? PROCESS_FR : PROCESS_EN;

    return (
        <>
            <Header />

            {/* ── Page Hero ─────────────────────────────────────────────────── */}
            <div className="page-hero">
                <div className="container container-narrow">
                    <AnimatedSection>
                        <p className="eyebrow">{t('story_eyebrow')}</p>
                        <h1>{t('about_title')}</h1>
                        <p className="page-hero-sub">{t('about_subtitle')}</p>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Story Split ───────────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container">
                    <div className="about-split">
                        <div className="about-image image-reveal">
                            <img
                                src="/images/our_story.jpg"
                                alt={
                                    lang === 'fr'
                                        ? "Huile d'olive La Cantine versée"
                                        : 'La Cantine olive oil being poured'
                                }
                                loading="lazy"
                            />
                        </div>

                        <AnimatedSection className="about-body">
                            <p className="eyebrow eyebrow--olive">
                                {lang === 'fr' ? 'Les Origines' : 'The Origins'}
                            </p>
                            <h2 className="heading-2">{t('story_heading')}</h2>
                            <p>{t('story_p1')}</p>
                            <p>{t('story_p2')}</p>
                            <p>
                                {lang === 'fr'
                                    ? "La variété Coratina est connue pour ses polyphénols exceptionnellement élevés — jusqu'à 5 fois plus que les huiles ordinaires. C'est cette richesse qui lui confère ses vertus antioxydantes et son profil aromatique unique : herbe fraîche, tomate verte, artichaut, avec une amertume et un piquant caractéristiques."
                                    : 'The Coratina variety is known for its exceptionally high polyphenols — up to 5 times more than ordinary oils. This richness gives it its antioxidant properties and unique aromatic profile: fresh grass, green tomato, artichoke, with characteristic bitterness and spiciness.'}
                            </p>

                            <div className="about-values">
                                {values.map(v => (
                                    <div key={v.title} className="about-value">
                                        <h4>{v.title}</h4>
                                        <p>{v.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <Link to="/shop" className="btn btn-filled">
                                {t('stores_cta')}
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Process Section ───────────────────────────────────────────── */}
            <section className="section process-section">
                <div className="container">
                    <AnimatedSection className="process-header">
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'De l\'Olivier à la Bouteille' : 'From Tree to Bottle'}
                        </p>
                        <h2 className="heading-2">
                            {lang === 'fr' ? 'Notre Processus' : 'Our Process'}
                        </h2>
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

            {/* ── Stats Banner ──────────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
                <div className="container container-narrow">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-8)', textAlign: 'center' }}>
                        {[
                            { num: t('story_stat1_num'), label: t('story_stat1_label') },
                            { num: t('story_stat2_num'), label: t('story_stat2_label') },
                            { num: t('story_stat3_num'), label: t('story_stat3_label') },
                            { num: t('story_stat4_num'), label: t('story_stat4_label') },
                        ].map(stat => (
                            <AnimatedSection key={stat.label}>
                                <p className="story-stat-num" style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
                                    {stat.num}
                                </p>
                                <p className="story-stat-label">{stat.label}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Second Image Section ──────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }} id="stores">
                <div className="container">
                    <div className="about-split">
                        <AnimatedSection className="about-body">
                            <p className="eyebrow">
                                {lang === 'fr' ? 'Disponible au Québec' : 'Available in Québec'}
                            </p>
                            <h2 className="heading-2">
                                {lang === 'fr' ? 'De Puglia à Longueuil' : 'From Puglia to Longueuil'}
                            </h2>
                            <p>
                                {lang === 'fr'
                                    ? "La Cantine a été fondée pour une raison simple : l'huile d'olive italienne artisanale méritait d'être accessible aux Québécois. Nous importons directement du producteur, sans compromis sur la qualité ni sur la fraîcheur."
                                    : 'La Cantine was founded for a simple reason: artisanal Italian olive oil deserved to be accessible to Quebecers. We import directly from the producer, without compromises on quality or freshness.'}
                            </p>
                            <p>
                                {lang === 'fr'
                                    ? "Livraison gratuite dans la région de Longueuil et ses environs. Commandez en ligne et recevez votre huile dans les 48h."
                                    : 'Free delivery in the Longueuil area and surroundings. Order online and receive your oil within 48 hours.'}
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
                                <Link to="/shop" className="btn btn-filled">
                                    {t('stores_cta')}
                                </Link>
                                <Link to="/recipes" className="btn">
                                    {t('nav_recipes')}
                                </Link>
                            </div>
                        </AnimatedSection>

                        <div className="about-image image-reveal">
                            <img
                                src="/images/Screenshot 2026-03-28 at 1.44.42 AM.png"
                                alt={
                                    lang === 'fr'
                                        ? 'Salade caprese avec La Cantine'
                                        : 'Caprese salad with La Cantine'
                                }
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
