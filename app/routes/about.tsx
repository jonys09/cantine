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
                        <p className="eyebrow">{t('about_title')}</p>
                        <h1>{t('story_eyebrow')}</h1>
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
                    <div className="about-split">
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
                    </div>
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

            {/* ── L'Expérience Cantine ──────────────────────────────────────── */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)', textAlign: 'center' }}>
                <div className="container container-narrow">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? "L'Expérience Cantine" : 'The Cantine Experience'}
                        </p>
                        <h2 className="heading-2" style={{ marginBottom: 'var(--space-5)' }}>
                            {lang === 'fr' ? 'Au-delà du produit, une intention.' : 'Beyond the product lies an intention.'}
                        </h2>
                        <p className="body-lg text-muted" style={{ maxWidth: '560px', margin: '0 auto var(--space-4)' }}>
                            {lang === 'fr'
                                ? "Revenir à l'essentiel. Ralentir. Partager. Revenir à l'essentiel."
                                : "A return to the essential. Slow down. Share. Come back to what matters."}
                        </p>
                        <p style={{ fontStyle: 'italic', color: 'var(--color-olive)', fontWeight: 500, marginBottom: 'var(--space-8)' }}>
                            {lang === 'fr'
                                ? "Si ce n'est pas exceptionnel, cela n'a pas sa place chez Cantine."
                                : "If it isn't exceptional, it doesn't belong at Cantine."}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </>
    );
}
