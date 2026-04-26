import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';
import { PinterestBoard } from '~/components/PinterestBoard';

export const meta: MetaFunction = () => [
    { title: "Notre Histoire — La Cantine" },
    {
        name: 'description',
        content:
            "Découvrez l'histoire de La Cantine : de Puglia au Québec, une passion pour l'huile d'olive artisanale italienne.",
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
        title: 'Sélection Exigeante',
        desc: "Chez Cantine, nous sélectionnons peu, mais avec exigence. Uniquement des producteurs qui travaillent avec attention, patience, et respect.",
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
        title: 'Demanding Selection',
        desc: "At Cantine, we select few, but with high standards. Only producers who work with attention, patience, and respect.",
    },
];

export default function About() {
    const { t, lang } = useI18n();
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

            {/* ── Notre Histoire ─────────────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container">
                    <div className="about-split">
                        <div className="about-image image-reveal">
                            <img
                                src="/images/olive_trees.jpg"
                                alt={
                                    lang === 'fr'
                                        ? "Oliveraies des Pouilles — La Cantine"
                                        : 'Olive groves in Puglia — La Cantine'
                                }
                                loading="lazy"
                            />
                        </div>

                        <AnimatedSection className="about-body">
                            <p className="eyebrow eyebrow--olive">
                                {lang === 'fr' ? 'Notre Histoire' : 'Our Story'}
                            </p>
                            <h2 className="heading-2">
                                {lang === 'fr'
                                    ? "Une histoire d'amitié — et de famille"
                                    : 'A story of friendship — and family'}
                            </h2>
                            <p>
                                {lang === 'fr'
                                    ? "Cantine est avant tout une histoire d'amitié — et de famille. Christopher et Tanyssa se rencontrent à l'université et découvrent rapidement une passion commune pour la gastronomie, le voyage et l'art de vivre du sud de l'Italie — où les repas prennent le temps, et où chaque produit a une histoire."
                                    : "Cantine is first and foremost a story of friendship — and family. Christopher and Tanyssa meet at university and quickly discover a shared passion for gastronomy, travel, and the way of life of southern Italy — where meals take their time, and every product has a story."}
                            </p>
                            <p>
                                {lang === 'fr'
                                    ? "Pour Tanyssa, cette histoire est personnelle. D'origine italienne, elle est profondément liée aux terres familiales de son mari Ruggiero, dans les Pouilles. Là-bas, l'huile d'olive n'est pas seulement un produit. C'est un rituel. On la récolte ensemble. On la partage en famille. On la transmet. C'est dans ce quotidien, simple et essentiel, que Cantine prend racine."
                                    : "For Tanyssa, this story is personal. Of Italian origin, she is deeply connected to the family lands of her husband Ruggiero, in Puglia. There, olive oil is not just a product. It is a ritual. You harvest it together. You share it as a family. You pass it on. It is in this simple, essential daily life that Cantine takes root."}
                            </p>

                            <Link to="/shop" className="btn btn-filled" style={{ marginTop: 'var(--space-6)' }}>
                                {t('stores_cta')}
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Des Pouilles à Votre Table ────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
                <div className="container">
                    <div className="about-split" style={{ flexDirection: 'row-reverse' } as React.CSSProperties}>
                        <div className="about-image image-reveal">
                            <img
                                src="/images/farm_road.jpg"
                                alt={
                                    lang === 'fr'
                                        ? "Domaines agricoles des Pouilles"
                                        : 'Puglia farm lands'
                                }
                                loading="lazy"
                            />
                        </div>

                        <AnimatedSection className="about-body">
                            <p className="eyebrow eyebrow--olive">
                                {lang === 'fr' ? 'Des Pouilles à Votre Table' : 'From Puglia to Your Table'}
                            </p>
                            <h2 className="heading-2">
                                {lang === 'fr' ? "L'origine de chaque goutte" : 'The origin of every drop'}
                            </h2>
                            <p>
                                {lang === 'fr'
                                    ? "Notre huile d'olive provient directement de ces terres. Elle est cultivée avec soin, récoltée à la main et produite dans le respect de pratiques transmises depuis des générations."
                                    : "Our olive oil comes directly from these lands. It is cultivated with care, harvested by hand, and produced in accordance with practices passed down through generations."}
                            </p>
                            <p>
                                {lang === 'fr'
                                    ? "Chaque récolte raconte le travail de familles qui connaissent leur terre, leurs arbres, et le temps qu'il faut pour bien faire les choses. Ce que nous proposons n'est pas standardisé. C'est le prolongement d'une histoire familiale."
                                    : "Each harvest tells the story of families who know their land, their trees, and the time it takes to do things right. What we offer is not standardized. It is the continuation of a family story."}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── Notre Approche ────────────────────────────────────────────── */}
            <section className="section process-section">
                <div className="container">
                    <AnimatedSection className="process-header">
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'Notre Approche' : 'Our Approach'}
                        </p>
                        <h2 className="heading-2">
                            {lang === 'fr' ? 'Le soin du détail, à chaque étape' : 'Care at every step'}
                        </h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', color: 'var(--color-gray)' }}>
                            {lang === 'fr'
                                ? "Chez Cantine, nous croyons que les meilleurs produits sont ceux qui ont une origine claire et sincère. Nous sélectionnons peu, mais avec exigence. Nous privilégions des producteurs qui travaillent avec attention, patience, et respect de ce qui se transmet."
                                : "At Cantine, we believe the best products are those with a clear and sincere origin. We select few, but with high standards. We favour producers who work with attention, patience, and respect for what is passed on."}
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

            {/* ── L'Expérience Cantine ──────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)', textAlign: 'center' }}>
                <div className="container container-narrow">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? "L'Expérience Cantine" : 'The Cantine Experience'}
                        </p>
                        <h2 className="heading-2" style={{ marginBottom: 'var(--space-5)' }}>
                            {lang === 'fr' ? 'Notre Engagement' : 'Our Commitment'}
                        </h2>
                        <p className="body-lg text-muted" style={{ maxWidth: '560px', margin: '0 auto var(--space-4)' }}>
                            {lang === 'fr'
                                ? "Cantine va au-delà du produit. C'est une invitation à revenir à quelque chose de plus simple. Se rassembler. Partager. Prendre le temps. Comme autour d'une table familiale, où chaque détail compte."
                                : "Cantine goes beyond the product. It is an invitation to return to something simpler. To gather. To share. To take the time. Like around a family table, where every detail matters."}
                        </p>
                        <p style={{ fontStyle: 'italic', color: 'var(--color-olive)', fontWeight: 500, marginBottom: 'var(--space-8)' }}>
                            {lang === 'fr'
                                ? "Si ce n'est pas exceptionnel, cela n'a pas sa place chez Cantine."
                                : "If it is not exceptional, it has no place at Cantine."}
                        </p>
                        <Link to="/shop" className="btn btn-filled">
                            {lang === 'fr' ? 'Découvrir Cantine' : 'Discover Cantine'}
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── Pinterest Moodboard ───────────────────────────────────────── */}
            <PinterestBoard />

            <Footer />
        </>
    );
}
