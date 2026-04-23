import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection, StaggerContainer } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Recettes — La Cantine" },
    {
        name: 'description',
        content:
            "Recettes et inspirations culinaires mettant en valeur l'huile d'olive Coratina La Cantine.",
    },
];

const ALL_RECIPES_FR = [
    {
        title: 'Bruschetta à l\'Huile d\'Olive Coratina',
        excerpt: 'La simplicité au service de la saveur. Pain grillé, tomates fraîches, basilic et un généreux filet de notre Coratina.',
        time: '10 min',
        category: 'Entrée',
        slug: 'bruschetta-huile-olive-coratina',
        image: '/images/recipe_bruschetta.jpg',
    },
    {
        title: 'Salade Méditerranéenne & Vinaigrette Coratina',
        excerpt: 'Légumes croquants, olives de Kalamata, feta fondante et une vinaigrette à l\'huile d\'olive intense.',
        time: '15 min',
        category: 'Salade',
        slug: 'salade-mediterraneenne-vinaigrette-coratina',
        image: '/images/recipe_salad_med.jpg',
    },
    {
        title: 'Pasta Aglio e Olio Authentique',
        excerpt: 'Quatre ingrédients. Un résultat sublime. L\'ail doré à l\'huile Coratina crée une sauce parfaite.',
        time: '20 min',
        category: 'Pâtes',
        slug: 'pasta-aglio-e-olio',
        image: '/images/recipe_pasta.jpg',
    },
    {
        title: 'Artichauts Rôtis à l\'Huile d\'Olive',
        excerpt: 'Des artichauts coupés en deux, badigeonnés d\'huile Coratina et rôtis jusqu\'à la perfection dorée.',
        time: '35 min',
        category: 'Légumes',
        slug: 'artichauts-rotis-huile-olive',
        image: '/images/recipe_artichokes.jpg',
    },
    {
        title: 'Salade de Radicchio, Fenouil & Oranges Sanguines',
        excerpt: 'Amertume du radicchio, douceur anisée du fenouil, acidité des oranges sanguines — équilibrés par l\'huile Coratina.',
        time: '15 min',
        category: 'Salade',
        slug: 'salade-radicchio-fenouil-oranges',
        image: '/images/recipe_radicchio.jpg',
    },
    {
        title: 'Tartare de Thon à l\'Huile d\'Olive & Citron',
        excerpt: 'Thon frais coupé au couteau, relevé d\'un trait d\'huile Coratina, citron et câpres. Élégant et rafraîchissant.',
        time: '15 min',
        category: 'Poisson',
        slug: 'tartare-thon-huile-olive-citron',
        image: '/images/recipe_tuna_tartare.jpg',
    },
];

const ALL_RECIPES_EN = [
    {
        title: 'Bruschetta with Coratina Olive Oil',
        excerpt: 'Simplicity in service of flavor. Toasted bread, fresh tomatoes, basil and a generous drizzle of our Coratina.',
        time: '10 min',
        category: 'Appetizer',
        slug: 'bruschetta-huile-olive-coratina',
        image: '/images/recipe_bruschetta.jpg',
    },
    {
        title: 'Mediterranean Salad & Coratina Dressing',
        excerpt: 'Crisp vegetables, Kalamata olives, creamy feta and an intense olive oil vinaigrette.',
        time: '15 min',
        category: 'Salad',
        slug: 'salade-mediterraneenne-vinaigrette-coratina',
        image: '/images/recipe_salad_med.jpg',
    },
    {
        title: 'Authentic Pasta Aglio e Olio',
        excerpt: 'Four ingredients. One sublime result. Garlic golden in Coratina oil creates a perfect sauce.',
        time: '20 min',
        category: 'Pasta',
        slug: 'pasta-aglio-e-olio',
        image: '/images/recipe_pasta.jpg',
    },
    {
        title: 'Roasted Artichokes with Olive Oil',
        excerpt: 'Artichokes halved, brushed with Coratina oil and roasted to golden perfection.',
        time: '35 min',
        category: 'Vegetables',
        slug: 'artichauts-rotis-huile-olive',
        image: '/images/recipe_artichokes.jpg',
    },
    {
        title: 'Radicchio, Fennel & Blood Orange Salad',
        excerpt: 'Bitterness of radicchio, anise sweetness of fennel, acidity of blood oranges — balanced by Coratina oil.',
        time: '15 min',
        category: 'Salad',
        slug: 'salade-radicchio-fenouil-oranges',
        image: '/images/recipe_radicchio.jpg',
    },
    {
        title: 'Tuna Tartare with Olive Oil & Lemon',
        excerpt: 'Hand-cut fresh tuna, lifted by a drizzle of Coratina oil, lemon and capers. Elegant and refreshing.',
        time: '15 min',
        category: 'Fish',
        slug: 'tartare-thon-huile-olive-citron',
        image: '/images/recipe_tuna_tartare.jpg',
    },
];

export default function Recipes() {
    const { t, lang } = useI18n();
    const recipes = lang === 'fr' ? ALL_RECIPES_FR : ALL_RECIPES_EN;

    return (
        <>
            <Header />

            {/* ── Page Header ───────────────────────────────────────────────── */}
            <div className="recipes-page-header">
                <div className="container">
                    <AnimatedSection>
                        <p className="eyebrow">{t('recipes_eyebrow')}</p>
                        <h1>{t('recipes_heading')}</h1>
                        <p>
                            {lang === 'fr'
                                ? "Des recettes simples et savoureuses qui mettent en valeur les arômes uniques de l'huile d'olive Coratina."
                                : 'Simple and flavorful recipes that showcase the unique aromas of Coratina olive oil.'}
                        </p>
                    </AnimatedSection>
                </div>
            </div>

            {/* ── Recipes Grid ──────────────────────────────────────────────── */}
            <section className="section recipes-page-body">
                <div className="container">
                    <StaggerContainer className="recipes-grid">
                        {recipes.map(recipe => (
                            <Link
                                key={recipe.slug}
                                to={`/recipes/${recipe.slug}`}
                                className="recipe-card"
                            >
                                <div className="recipe-card-image">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-card-meta">
                                        <span>{recipe.category}</span>
                                        <span className="dot-separator" aria-hidden="true" />
                                        <span>{recipe.time}</span>
                                    </div>
                                    <h2 className="recipe-card-title">{recipe.title}</h2>
                                    <p className="recipe-card-excerpt">{recipe.excerpt}</p>
                                    <div className="recipe-card-link">
                                        <span className="cta-link">
                                            {lang === 'fr' ? 'Voir la recette' : 'View recipe'}{' '}
                                            <span className="arrow">→</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ── CTA to shop ───────────────────────────────────────────────── */}
            <section
                className="section"
                style={{ backgroundColor: 'var(--color-bg-subtle)', textAlign: 'center' }}
            >
                <div className="container container-text">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--olive">
                            {lang === 'fr' ? 'L\'ingrédient essentiel' : 'The essential ingredient'}
                        </p>
                        <h2
                            className="heading-2"
                            style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}
                        >
                            {lang === 'fr'
                                ? "Toutes ces recettes commencent par une bonne huile"
                                : 'All these recipes start with a good oil'}
                        </h2>
                        <p
                            className="body-lg text-muted"
                            style={{ marginBottom: 'var(--space-8)' }}
                        >
                            {lang === 'fr'
                                ? "L'huile d'olive Coratina La Cantine est l'ingrédient qui transforme un plat ordinaire en expérience mémorable."
                                : "La Cantine Coratina olive oil is the ingredient that transforms an ordinary dish into a memorable experience."}
                        </p>
                        <Link to="/shop" className="btn btn-filled">
                            {t('stores_cta')}
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            <Footer />
        </>
    );
}
