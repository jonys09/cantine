import type { MetaFunction } from 'react-router';
import { Link, useParams } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Recette — La Cantine" },
];

type Ingredient = { name: string; amount: string };
type RecipeData = {
    title: { fr: string; en: string };
    category: { fr: string; en: string };
    time: string;
    servings: number;
    image: string;
    intro: { fr: string; en: string };
    ingredients: { fr: Ingredient[]; en: Ingredient[] };
    steps: { fr: string[]; en: string[] };
};

const RECIPES: Record<string, RecipeData> = {
    'bruschetta-huile-olive-coratina': {
        title: {
            fr: "Bruschetta à l'Huile d'Olive Coratina",
            en: 'Bruschetta with Coratina Olive Oil',
        },
        category: { fr: 'Entrée', en: 'Appetizer' },
        time: '10 min',
        servings: 4,
        image: '/images/bundle.png',
        intro: {
            fr: "La bruschetta est l'une des façons les plus simples et les plus éloquentes de mettre en valeur une huile d'olive de qualité. Avec notre Coratina des Pouilles, ce classique italien atteint un niveau de saveur incomparable. La clé : une huile fraîche, fruitée et légèrement poivrée.",
            en: 'Bruschetta is one of the simplest and most eloquent ways to showcase a quality olive oil. With our Puglia Coratina, this Italian classic reaches an incomparable level of flavor. The key: a fresh, fruity, and slightly peppery oil.',
        },
        ingredients: {
            fr: [
                { name: "Pain ciabatta ou baguette rustique", amount: '8 tranches' },
                { name: 'Tomates cerises ou roma mûres', amount: '400 g' },
                { name: 'Basilic frais', amount: '1 bouquet' },
                { name: 'Ail', amount: '2 gousses' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4 c. à soupe' },
                { name: 'Sel de mer fin', amount: 'Au goût' },
                { name: 'Poivre noir fraîchement moulu', amount: 'Au goût' },
            ],
            en: [
                { name: 'Ciabatta or rustic baguette', amount: '8 slices' },
                { name: 'Ripe cherry or roma tomatoes', amount: '400 g' },
                { name: 'Fresh basil', amount: '1 bunch' },
                { name: 'Garlic', amount: '2 cloves' },
                { name: 'Coratina La Cantine olive oil', amount: '4 tbsp' },
                { name: 'Fine sea salt', amount: 'To taste' },
                { name: 'Freshly ground black pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préchauffer le grill ou une poêle à griller à feu vif. Couper le pain en tranches épaisses d'environ 1,5 cm.",
                "Griller les tranches de pain 2 à 3 minutes de chaque côté jusqu'à ce qu'elles soient dorées et croustillantes.",
                "Frotter immédiatement chaque tranche grillée avec la gousse d'ail coupée en deux. L'ail infuse dans le pain encore chaud.",
                "Couper les tomates en dés ou en quartiers. Dans un bol, mélanger avec le basilic déchiré, une pincée de sel et une cuillère à soupe d'huile d'olive.",
                "Disposer les tomates sur les toasts chauds. Arroser généreusement d'huile d'olive Coratina La Cantine. Terminer avec du poivre noir. Servir immédiatement.",
            ],
            en: [
                'Preheat the grill or a grill pan over high heat. Cut the bread into thick slices about 1.5 cm thick.',
                'Grill the bread slices 2-3 minutes on each side until golden and crispy.',
                'Immediately rub each grilled slice with the halved garlic clove. The garlic infuses into the still-warm bread.',
                'Dice or quarter the tomatoes. In a bowl, mix with torn basil, a pinch of salt and one tablespoon of olive oil.',
                'Top the warm toasts with the tomatoes. Drizzle generously with Coratina La Cantine olive oil. Finish with black pepper. Serve immediately.',
            ],
        },
    },
    'salade-mediterraneenne-vinaigrette-coratina': {
        title: {
            fr: 'Salade Méditerranéenne & Vinaigrette Coratina',
            en: 'Mediterranean Salad & Coratina Dressing',
        },
        category: { fr: 'Salade', en: 'Salad' },
        time: '15 min',
        servings: 4,
        image: '/images/salad.png',
        intro: {
            fr: "Cette salade méditerranéenne vibrante capture l'essence du soleil des Pouilles. La vinaigrette à l'huile Coratina, intense et fruitée, transforme des ingrédients simples en une expérience gustative mémorable.",
            en: 'This vibrant Mediterranean salad captures the essence of the Puglian sun. The Coratina olive oil dressing, intense and fruity, transforms simple ingredients into a memorable culinary experience.',
        },
        ingredients: {
            fr: [
                { name: 'Mesclun ou roquette', amount: '200 g' },
                { name: 'Tomates cerises', amount: '200 g' },
                { name: 'Olives de Kalamata', amount: '100 g' },
                { name: 'Feta', amount: '150 g' },
                { name: 'Concombre', amount: '1 moyen' },
                { name: 'Oignon rouge', amount: '½' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4 c. à soupe' },
                { name: 'Jus de citron frais', amount: '2 c. à soupe' },
                { name: 'Origan séché', amount: '1 c. à café' },
                { name: 'Sel et poivre', amount: 'Au goût' },
            ],
            en: [
                { name: 'Mixed greens or arugula', amount: '200 g' },
                { name: 'Cherry tomatoes', amount: '200 g' },
                { name: 'Kalamata olives', amount: '100 g' },
                { name: 'Feta cheese', amount: '150 g' },
                { name: 'Cucumber', amount: '1 medium' },
                { name: 'Red onion', amount: '½' },
                { name: 'Coratina La Cantine olive oil', amount: '4 tbsp' },
                { name: 'Fresh lemon juice', amount: '2 tbsp' },
                { name: 'Dried oregano', amount: '1 tsp' },
                { name: 'Salt and pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préparer la vinaigrette : dans un petit bol, fouetter l'huile d'olive Coratina avec le jus de citron, l'origan, le sel et le poivre. Laisser reposer 5 minutes.",
                "Couper le concombre en demi-rondelles, l'oignon rouge en fines lamelles, et les tomates cerises en deux.",
                "Dans un grand saladier, disposer les feuilles de salade. Ajouter les légumes coupés et les olives par-dessus.",
                "Émietter la feta sur la salade. Verser la vinaigrette et mélanger délicatement. Servir immédiatement.",
            ],
            en: [
                'Prepare the dressing: in a small bowl, whisk Coratina olive oil with lemon juice, oregano, salt and pepper. Let rest 5 minutes.',
                'Slice the cucumber into half-rounds, thinly slice the red onion, and halve the cherry tomatoes.',
                'In a large salad bowl, arrange the greens. Add the cut vegetables and olives on top.',
                'Crumble the feta over the salad. Pour the dressing and toss gently. Serve immediately.',
            ],
        },
    },
    'pasta-aglio-e-olio': {
        title: {
            fr: 'Pasta Aglio e Olio Authentique',
            en: 'Authentic Pasta Aglio e Olio',
        },
        category: { fr: 'Pâtes', en: 'Pasta' },
        time: '20 min',
        servings: 2,
        image: '/images/pasta.png',
        intro: {
            fr: "Aglio e Olio — ail et huile. Quatre ingrédients, une philosophie entière. Ce plat napolitain révèle la vérité fondamentale de la cuisine italienne : la qualité des ingrédients est tout. Notre huile Coratina, dorée et intense, est l'âme de cette recette.",
            en: 'Aglio e Olio — garlic and oil. Four ingredients, an entire philosophy. This Neapolitan dish reveals the fundamental truth of Italian cuisine: the quality of ingredients is everything. Our golden, intense Coratina oil is the soul of this recipe.',
        },
        ingredients: {
            fr: [
                { name: 'Spaghetti ou linguine', amount: '320 g' },
                { name: 'Ail', amount: '6 à 8 gousses' },
                { name: "Huile d'olive Coratina La Cantine", amount: '6 c. à soupe' },
                { name: 'Piment rouge séché (peperoncino)', amount: '1 à 2' },
                { name: 'Persil plat frais', amount: '1 bouquet' },
                { name: 'Parmesan râpé (optionnel)', amount: '50 g' },
                { name: "Eau de cuisson des pâtes", amount: '200 ml réservés' },
                { name: 'Gros sel', amount: 'Pour la cuisson' },
            ],
            en: [
                { name: 'Spaghetti or linguine', amount: '320 g' },
                { name: 'Garlic', amount: '6 to 8 cloves' },
                { name: 'Coratina La Cantine olive oil', amount: '6 tbsp' },
                { name: 'Dried red chili (peperoncino)', amount: '1 to 2' },
                { name: 'Fresh flat-leaf parsley', amount: '1 bunch' },
                { name: 'Grated Parmesan (optional)', amount: '50 g' },
                { name: 'Pasta cooking water', amount: '200 ml reserved' },
                { name: 'Coarse salt', amount: 'For cooking' },
            ],
        },
        steps: {
            fr: [
                "Cuire les pâtes dans une grande quantité d'eau bouillante très salée (comme la mer) jusqu'à ce qu'elles soient al dente. Réserver 200 ml d'eau de cuisson avant d'égoutter.",
                "Pendant la cuisson des pâtes, émincer finement l'ail. Dans une large poêle, chauffer l'huile d'olive à feu moyen-doux. Ajouter l'ail et le piment entier.",
                "Faire revenir l'ail très doucement, en remuant constamment, jusqu'à ce qu'il soit doré pâle et odorant (3 à 4 minutes). Attention : ne jamais laisser l'ail brunir.",
                "Ajouter les pâtes égouttées dans la poêle avec 3 à 4 cuillères d'eau de cuisson. Mélanger vigoureusement à feu vif pendant 1 à 2 minutes pour créer une sauce émulsionnée et brillante.",
                "Hors du feu, incorporer le persil haché grossièrement. Servir dans des assiettes chaudes avec un filet d'huile Coratina crue et, si désiré, un peu de parmesan.",
            ],
            en: [
                "Cook the pasta in a large amount of very heavily salted boiling water (as salty as the sea) until al dente. Reserve 200 ml of pasta water before draining.",
                'While the pasta cooks, finely slice the garlic. In a wide skillet, heat the olive oil over medium-low heat. Add the garlic and whole chili.',
                'Gently sauté the garlic, stirring constantly, until pale golden and fragrant (3 to 4 minutes). Important: never let the garlic brown.',
                'Add the drained pasta to the skillet with 3 to 4 spoonfuls of pasta water. Toss vigorously over high heat for 1 to 2 minutes to create a glossy, emulsified sauce.',
                "Off the heat, fold in the roughly chopped parsley. Serve in warm bowls with a drizzle of raw Coratina oil and, if desired, a little Parmesan.",
            ],
        },
    },
    'artichauts-rotis-huile-olive': {
        title: {
            fr: "Artichauts Rôtis à l'Huile d'Olive",
            en: 'Roasted Artichokes with Olive Oil',
        },
        category: { fr: 'Légumes', en: 'Vegetables' },
        time: '35 min',
        servings: 4,
        image: '/images/artichokes.png',
        intro: {
            fr: "L'artichaut et l'huile d'olive Coratina partagent la même origine : les terres arides et ensoleillées de la Méditerranée. Ensemble, ils créent un plat d'une simplicité majestueuse. La légère amertume de l'artichaut est magnifiée par le fruité intense de la Coratina.",
            en: "Artichoke and Coratina olive oil share the same origin: the arid, sun-drenched lands of the Mediterranean. Together, they create a dish of majestic simplicity. The slight bitterness of the artichoke is magnified by the intense fruitiness of the Coratina.",
        },
        ingredients: {
            fr: [
                { name: 'Artichauts frais', amount: '4 gros' },
                { name: "Huile d'olive Coratina La Cantine", amount: '5 c. à soupe' },
                { name: 'Citron', amount: '2' },
                { name: 'Ail', amount: '4 gousses' },
                { name: 'Thym frais', amount: '4 branches' },
                { name: 'Sel de mer', amount: 'Au goût' },
                { name: 'Poivre', amount: 'Au goût' },
            ],
            en: [
                { name: 'Fresh artichokes', amount: '4 large' },
                { name: 'Coratina La Cantine olive oil', amount: '5 tbsp' },
                { name: 'Lemon', amount: '2' },
                { name: 'Garlic', amount: '4 cloves' },
                { name: 'Fresh thyme', amount: '4 sprigs' },
                { name: 'Sea salt', amount: 'To taste' },
                { name: 'Pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préchauffer le four à 200°C. Couper les artichauts en deux dans le sens de la longueur. Retirer les feuilles dures extérieures et le foin du cœur. Frotter immédiatement les surfaces coupées avec le demi-citron pour éviter l'oxydation.",
                "Dans un grand plat allant au four, disposer les moitiés d'artichauts face coupée vers le haut. Glisser une demi-gousse d'ail et une branche de thym entre les feuilles de chaque artichaut.",
                "Arroser généreusement d'huile d'olive Coratina. Saler, poivrer. Presser le jus du second citron sur l'ensemble.",
                "Couvrir le plat de papier aluminium et rôtir 20 minutes. Retirer le papier aluminium et poursuivre la cuisson 10 à 15 minutes jusqu'à ce que les artichauts soient tendres et légèrement dorés.",
                "Servir chaud, nappé d'un dernier filet d'huile Coratina crue.",
            ],
            en: [
                "Preheat the oven to 200°C (400°F). Cut the artichokes in half lengthwise. Remove the tough outer leaves and the fuzzy choke. Immediately rub the cut surfaces with half a lemon to prevent oxidation.",
                "In a large oven-safe dish, arrange the artichoke halves cut-side up. Tuck half a garlic clove and a thyme sprig between the leaves of each artichoke.",
                "Drizzle generously with Coratina olive oil. Season with salt and pepper. Squeeze the juice of the second lemon over everything.",
                "Cover the dish with aluminum foil and roast for 20 minutes. Remove the foil and continue cooking 10 to 15 minutes until the artichokes are tender and lightly golden.",
                "Serve warm, drizzled with a final flourish of raw Coratina oil.",
            ],
        },
    },
    'salade-radicchio-fenouil-oranges': {
        title: {
            fr: 'Salade de Radicchio, Fenouil & Oranges Sanguines',
            en: 'Radicchio, Fennel & Blood Orange Salad',
        },
        category: { fr: 'Salade', en: 'Salad' },
        time: '15 min',
        servings: 4,
        image: '/images/pasta.png',
        intro: {
            fr: "Cette salade hivernale est un chef-d'œuvre d'équilibre. L'amertume du radicchio, la douceur anisée du fenouil, l'acidité vive des oranges sanguines — le tout uni par la générosité de notre huile Coratina. Une salade qui ressemble à un tableau.",
            en: 'This winter salad is a masterpiece of balance. The bitterness of radicchio, the anise sweetness of fennel, the bright acidity of blood oranges — all united by the generosity of our Coratina oil. A salad that looks like a painting.',
        },
        ingredients: {
            fr: [
                { name: 'Radicchio', amount: '1 tête' },
                { name: 'Fenouil', amount: '1 bulbe' },
                { name: 'Oranges sanguines', amount: '3' },
                { name: 'Oignon rouge', amount: '½' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4 c. à soupe' },
                { name: 'Vinaigre balsamique blanc', amount: '1 c. à soupe' },
                { name: 'Sel et poivre', amount: 'Au goût' },
            ],
            en: [
                { name: 'Radicchio', amount: '1 head' },
                { name: 'Fennel bulb', amount: '1' },
                { name: 'Blood oranges', amount: '3' },
                { name: 'Red onion', amount: '½' },
                { name: 'Coratina La Cantine olive oil', amount: '4 tbsp' },
                { name: 'White balsamic vinegar', amount: '1 tbsp' },
                { name: 'Salt and pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préparer les oranges en suprêmes : peler à vif et lever les segments. Récupérer le jus qui coule — il servira pour la vinaigrette.",
                "Émincer finement le fenouil à la mandoline ou au couteau. Couper l'oignon rouge en fines lamelles. Effeuiller et déchirer grossièrement le radicchio.",
                "Préparer la vinaigrette : mélanger l'huile Coratina, le vinaigre balsamique blanc, le jus d'orange récupéré, le sel et le poivre.",
                "Disposer le radicchio, le fenouil et l'oignon dans un saladier. Ajouter les suprêmes d'orange. Verser la vinaigrette, mélanger délicatement et servir aussitôt.",
            ],
            en: [
                "Segment the oranges: peel off the skin and white pith, then cut out the segments. Collect any juice that drips — it will go in the dressing.",
                "Finely slice the fennel on a mandoline or with a knife. Thinly slice the red onion. Tear the radicchio into large pieces.",
                "Prepare the dressing: mix Coratina oil, white balsamic vinegar, the reserved orange juice, salt and pepper.",
                "Arrange the radicchio, fennel and onion in a salad bowl. Add the orange segments. Pour the dressing, toss gently and serve immediately.",
            ],
        },
    },
    'tartare-thon-huile-olive-citron': {
        title: {
            fr: "Tartare de Thon à l'Huile d'Olive & Citron",
            en: 'Tuna Tartare with Olive Oil & Lemon',
        },
        category: { fr: 'Poisson', en: 'Fish' },
        time: '15 min',
        servings: 2,
        image: '/images/bottle.png',
        intro: {
            fr: "La fraîcheur du thon, la vivacité du citron, la profondeur de l'huile Coratina — ce tartare est une célébration de la Méditerranée dans sa forme la plus pure. Simple, élégant, mémorable.",
            en: "The freshness of tuna, the brightness of lemon, the depth of Coratina oil — this tartare is a celebration of the Mediterranean in its purest form. Simple, elegant, memorable.",
        },
        ingredients: {
            fr: [
                { name: 'Thon frais (qualité sashimi)', amount: '250 g' },
                { name: "Huile d'olive Coratina La Cantine", amount: '3 c. à soupe' },
                { name: 'Citron jaune (zeste et jus)', amount: '1' },
                { name: 'Câpres', amount: '1 c. à soupe' },
                { name: 'Ciboulette fraîche', amount: '2 c. à soupe' },
                { name: 'Fleur de sel', amount: 'Au goût' },
                { name: 'Poivre noir', amount: 'Au goût' },
            ],
            en: [
                { name: 'Fresh tuna (sashimi grade)', amount: '250 g' },
                { name: 'Coratina La Cantine olive oil', amount: '3 tbsp' },
                { name: 'Lemon (zest and juice)', amount: '1' },
                { name: 'Capers', amount: '1 tbsp' },
                { name: 'Fresh chives', amount: '2 tbsp' },
                { name: 'Fleur de sel', amount: 'To taste' },
                { name: 'Black pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Couper le thon en petits dés d'environ 8 mm. Utiliser un couteau très tranchant pour préserver la texture de la chair.",
                "Dans un bol, mélanger délicatement le thon avec l'huile d'olive Coratina, le jus de citron, les câpres hachées et la ciboulette ciselée.",
                "Assaisonner de fleur de sel et de poivre noir. Goûter et ajuster l'acidité avec un peu plus de citron si nécessaire.",
                "Dresser dans des emporte-pièces ronds ou librement dans les assiettes. Terminer avec quelques gouttes d'huile Coratina, le zeste de citron et une pincée de fleur de sel. Servir immédiatement.",
            ],
            en: [
                'Cut the tuna into small dice, about 8 mm. Use a very sharp knife to preserve the texture of the flesh.',
                'In a bowl, gently mix the tuna with Coratina olive oil, lemon juice, chopped capers and sliced chives.',
                'Season with fleur de sel and black pepper. Taste and adjust acidity with a little more lemon if needed.',
                'Plate using round ring molds or freely in bowls. Finish with a few drops of Coratina oil, lemon zest and a pinch of fleur de sel. Serve immediately.',
            ],
        },
    },
};

export default function RecipeDetail() {
    const { slug } = useParams();
    const { lang } = useI18n();

    const recipe = slug ? RECIPES[slug] : null;

    if (!recipe) {
        return (
            <>
                <Header />
                <div className="not-found-page">
                    <div>
                        <p style={{ fontSize: '3rem' }}>🫙</p>
                        <h1>
                            {lang === 'fr' ? 'Recette introuvable' : 'Recipe not found'}
                        </h1>
                        <p>
                            {lang === 'fr'
                                ? "Cette recette n'existe pas ou a été déplacée."
                                : "This recipe doesn't exist or has been moved."}
                        </p>
                        <Link to="/recipes" className="btn btn-filled">
                            {lang === 'fr' ? 'Toutes les recettes' : 'All recipes'}
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const title = recipe.title[lang];
    const category = recipe.category[lang];
    const intro = recipe.intro[lang];
    const ingredients = recipe.ingredients[lang];
    const steps = recipe.steps[lang];

    return (
        <>
            <Header />

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <div className="recipe-detail-hero">
                <div className="recipe-detail-hero-bg">
                    <img src={recipe.image} alt={title} loading="eager" />
                </div>
                <div className="recipe-detail-hero-overlay" aria-hidden="true" />
                <div className="recipe-detail-hero-content container">
                    <div className="recipe-detail-hero-meta">
                        <Link
                            to="/recipes"
                            style={{
                                color: 'rgba(250,248,242,0.7)',
                                fontSize: 'var(--text-xs)',
                                letterSpacing: 'var(--tracking-wider)',
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                            }}
                        >
                            ← {lang === 'fr' ? 'Recettes' : 'Recipes'}
                        </Link>
                        <span aria-hidden="true">·</span>
                        <span>{category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{recipe.time}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                            {recipe.servings}{' '}
                            {lang === 'fr'
                                ? recipe.servings > 1 ? 'portions' : 'portion'
                                : recipe.servings > 1 ? 'servings' : 'serving'}
                        </span>
                    </div>
                    <h1 className="recipe-detail-title">{title}</h1>
                </div>
            </div>

            {/* ── Body ──────────────────────────────────────────────────────── */}
            <section className="section recipe-detail-body">
                <div className="container">
                    <div className="recipe-detail-inner">
                        {/* Main content */}
                        <div className="recipe-detail-main">
                            <AnimatedSection>
                                <p className="recipe-detail-intro">{intro}</p>
                            </AnimatedSection>

                            {/* Ingredients */}
                            <AnimatedSection className="recipe-detail-section">
                                <h3>
                                    {lang === 'fr' ? 'Ingrédients' : 'Ingredients'}
                                </h3>
                                <ul className="recipe-ingredients-list" role="list">
                                    {ingredients.map((ingredient, i) => (
                                        <li key={i} className="recipe-ingredient">
                                            <span>{ingredient.name}</span>
                                            <span className="recipe-ingredient-amount">
                                                {ingredient.amount}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedSection>

                            {/* Steps */}
                            <AnimatedSection className="recipe-detail-section">
                                <h3>
                                    {lang === 'fr' ? 'Préparation' : 'Instructions'}
                                </h3>
                                <ol className="recipe-steps-list" role="list">
                                    {steps.map((step, i) => (
                                        <li key={i} className="recipe-step">
                                            <div className="recipe-step-num" aria-hidden="true">
                                                {i + 1}
                                            </div>
                                            <p className="recipe-step-text">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </AnimatedSection>
                        </div>

                        {/* Sidebar */}
                        <aside className="recipe-detail-sidebar">
                            {/* Recipe info card */}
                            <AnimatedSection delay={1} className="recipe-sidebar-card">
                                <h4>{lang === 'fr' ? 'Infos Recette' : 'Recipe Info'}</h4>
                                <div className="recipe-info-grid">
                                    <div className="recipe-info-row">
                                        <span className="recipe-info-label">
                                            {lang === 'fr' ? 'Temps' : 'Time'}
                                        </span>
                                        <span className="recipe-info-value">{recipe.time}</span>
                                    </div>
                                    <div className="recipe-info-row">
                                        <span className="recipe-info-label">
                                            {lang === 'fr' ? 'Portions' : 'Servings'}
                                        </span>
                                        <span className="recipe-info-value">{recipe.servings}</span>
                                    </div>
                                    <div className="recipe-info-row">
                                        <span className="recipe-info-label">
                                            {lang === 'fr' ? 'Catégorie' : 'Category'}
                                        </span>
                                        <span className="recipe-info-value">{category}</span>
                                    </div>
                                    <div className="recipe-info-row">
                                        <span className="recipe-info-label">
                                            {lang === 'fr' ? 'Difficulté' : 'Difficulty'}
                                        </span>
                                        <span className="recipe-info-value">
                                            {lang === 'fr' ? 'Facile' : 'Easy'}
                                        </span>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Product promo card */}
                            <AnimatedSection delay={2} className="recipe-sidebar-card">
                                <h4>{lang === 'fr' ? "L'Ingrédient Clé" : 'The Key Ingredient'}</h4>
                                <div className="recipe-product-promo">
                                    <div className="recipe-product-promo-img">
                                        <img
                                            src="/images/bottle.png"
                                            alt="La Cantine Coratina"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="recipe-product-promo-text">
                                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', fontWeight: 400 }}>
                                            {lang === 'fr'
                                                ? "Huile d'Olive Coratina"
                                                : 'Coratina Olive Oil'}
                                        </p>
                                        <p>
                                            {lang === 'fr'
                                                ? 'DOP · Puglia · 500 ml'
                                                : 'DOP · Puglia · 500 ml'}
                                        </p>
                                        <Link to="/shop" className="btn btn-filled" style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2) var(--space-5)', fontSize: 'var(--text-xs)' }}>
                                            {lang === 'fr' ? 'Commander' : 'Order'}
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Other recipes */}
                            <AnimatedSection delay={3} className="recipe-sidebar-card">
                                <h4>{lang === 'fr' ? 'D\'autres Recettes' : 'More Recipes'}</h4>
                                <Link to="/recipes" className="cta-link">
                                    {lang === 'fr' ? 'Voir toutes les recettes' : 'See all recipes'}{' '}
                                    <span className="arrow">→</span>
                                </Link>
                            </AnimatedSection>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
