import type { MetaFunction } from 'react-router';
import { Link, useParams } from 'react-router';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: "Recette — La Cantine" },
    {
        name: 'description',
        content: "Recette mise en valeur avec l'huile d'olive 100% Coratina La Cantine des Pouilles.",
    },
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
    tip: { fr: string; en: string };
};

const RECIPES: Record<string, RecipeData> = {

    /* ── 1. Bruschetta ────────────────────────────────────────────────────── */
    'bruschetta-huile-olive-coratina': {
        title: {
            fr: "Bruschetta à l'Huile d'Olive Coratina",
            en: 'Bruschetta with Coratina Olive Oil',
        },
        category: { fr: 'Entrée', en: 'Appetizer' },
        time: '10 min',
        servings: 4,
        image: '/images/recipe_bruschetta.jpg',
        intro: {
            fr: "La bruschetta est l'une des façons les plus simples et les plus éloquentes de mettre en valeur une huile d'olive de qualité. Avec notre Coratina des Pouilles — intense, fruitée, légèrement poivrée — ce classique italien atteint une saveur incomparable. La règle d'or : utilisez des ingrédients irréprochables et une huile généreuse.",
            en: "Bruschetta is one of the simplest and most eloquent ways to showcase a quality olive oil. With our Coratina from Puglia — intense, fruity, slightly peppery — this Italian classic reaches an incomparable level of flavor. The golden rule: use impeccable ingredients and a generous drizzle of oil.",
        },
        ingredients: {
            fr: [
                { name: 'Pain ciabatta ou baguette rustique', amount: '8 tranches' },
                { name: 'Tomates cerises ou roma bien mûres', amount: '400 g' },
                { name: 'Basilic frais', amount: '1 bouquet' },
                { name: 'Ail', amount: '2 gousses' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4–5 c. à soupe' },
                { name: 'Fleur de sel', amount: 'Au goût' },
                { name: 'Poivre noir fraîchement moulu', amount: 'Au goût' },
                { name: 'Vinaigre balsamique (optionnel)', amount: 'Quelques gouttes' },
            ],
            en: [
                { name: 'Ciabatta or rustic baguette', amount: '8 slices' },
                { name: 'Ripe cherry or roma tomatoes', amount: '400 g' },
                { name: 'Fresh basil', amount: '1 bunch' },
                { name: 'Garlic', amount: '2 cloves' },
                { name: 'Coratina La Cantine olive oil', amount: '4–5 tbsp' },
                { name: 'Fleur de sel', amount: 'To taste' },
                { name: 'Freshly ground black pepper', amount: 'To taste' },
                { name: 'Balsamic vinegar (optional)', amount: 'A few drops' },
            ],
        },
        steps: {
            fr: [
                "Préchauffer le grill ou une poêle à griller à feu vif. Couper le pain en tranches épaisses d'environ 1,5 cm.",
                "Griller les tranches 2–3 minutes de chaque côté jusqu'à ce qu'elles soient bien dorées et croustillantes.",
                "Frotter immédiatement chaque tranche avec la gousse d'ail coupée en deux — l'ail infuse dans le pain encore chaud.",
                "Couper les tomates en dés. Dans un bol, mélanger avec le basilic déchiré à la main, une pincée de fleur de sel et 1 c. à soupe d'huile Coratina.",
                "Disposer les tomates sur les toasts. Arroser généreusement d'huile Coratina La Cantine. Terminer avec du poivre noir et quelques feuilles de basilic frais. Servir immédiatement.",
            ],
            en: [
                "Preheat the grill or a grill pan over high heat. Cut the bread into thick slices, about 1.5 cm.",
                "Grill the bread 2–3 minutes per side until deeply golden and crispy.",
                "Immediately rub each grilled slice with the halved garlic clove — the garlic infuses into the warm bread.",
                "Dice the tomatoes. In a bowl, toss with hand-torn basil, a pinch of fleur de sel and 1 tbsp Coratina oil.",
                "Top the warm toasts with the tomato mixture. Drizzle generously with Coratina La Cantine olive oil. Finish with black pepper and fresh basil leaves. Serve immediately.",
            ],
        },
        tip: {
            fr: "Le secret : ne jamais laisser les tomates macérer trop longtemps — elles perdent leur eau et la bruschetta devient détrempée. Préparez la garniture au moment de dresser.",
            en: "The secret: never let the tomatoes sit too long — they release water and make the bruschetta soggy. Prepare the topping just before serving.",
        },
    },

    /* ── 2. Salade Méditerranéenne ────────────────────────────────────────── */
    'salade-mediterraneenne-vinaigrette-coratina': {
        title: {
            fr: 'Salade Méditerranéenne & Vinaigrette Coratina',
            en: 'Mediterranean Salad & Coratina Dressing',
        },
        category: { fr: 'Salade', en: 'Salad' },
        time: '15 min',
        servings: 4,
        image: '/images/recipe_salad_med.jpg',
        intro: {
            fr: "Cette salade méditerranéenne capture l'essence du soleil des Pouilles dans chaque bouchée. La vinaigrette à l'huile Coratina — intense et fruitée — transforme des ingrédients du quotidien en une expérience gustative mémorable. Un repas complet en moins de 20 minutes.",
            en: "This Mediterranean salad captures the essence of the Puglian sun in every bite. The Coratina olive oil dressing — intense and fruity — transforms everyday ingredients into a memorable culinary experience. A complete meal in under 20 minutes.",
        },
        ingredients: {
            fr: [
                { name: 'Mesclun ou roquette', amount: '200 g' },
                { name: 'Tomates cerises', amount: '200 g' },
                { name: 'Olives de Kalamata dénoyautées', amount: '100 g' },
                { name: 'Feta en bloc', amount: '150 g' },
                { name: 'Concombre', amount: '1 moyen' },
                { name: 'Oignon rouge', amount: '½' },
                { name: 'Poivron rouge grillé', amount: '1' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4 c. à soupe' },
                { name: 'Jus de citron frais', amount: '2 c. à soupe' },
                { name: 'Origan séché', amount: '1 c. à café' },
                { name: 'Sel et poivre', amount: 'Au goût' },
            ],
            en: [
                { name: 'Mixed greens or arugula', amount: '200 g' },
                { name: 'Cherry tomatoes', amount: '200 g' },
                { name: 'Pitted Kalamata olives', amount: '100 g' },
                { name: 'Block feta cheese', amount: '150 g' },
                { name: 'Cucumber', amount: '1 medium' },
                { name: 'Red onion', amount: '½' },
                { name: 'Roasted red pepper', amount: '1' },
                { name: 'Coratina La Cantine olive oil', amount: '4 tbsp' },
                { name: 'Fresh lemon juice', amount: '2 tbsp' },
                { name: 'Dried oregano', amount: '1 tsp' },
                { name: 'Salt and pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préparer la vinaigrette : dans un petit bol, fouetter vigoureusement l'huile d'olive Coratina avec le jus de citron, l'origan, le sel et le poivre. Laisser reposer 5 minutes pour que les saveurs se mélangent.",
                "Couper le concombre en demi-rondelles épaisses. Émincer l'oignon rouge en fines lamelles. Couper les tomates cerises en deux. Trancher le poivron grillé en lanières.",
                "Couper la feta en cubes généreux ou l'émietter grossièrement selon votre préférence.",
                "Dans un grand saladier, disposer les feuilles de salade. Ajouter les légumes et les olives par-dessus de façon harmonieuse.",
                "Verser la vinaigrette Coratina sur la salade et mélanger délicatement. Disposer la feta par-dessus. Finir avec un filet d'huile Coratina crue. Servir immédiatement.",
            ],
            en: [
                "Prepare the dressing: in a small bowl, whisk the Coratina olive oil vigorously with lemon juice, oregano, salt and pepper. Let rest 5 minutes for the flavors to meld.",
                "Slice the cucumber into thick half-rounds. Thinly slice the red onion. Halve the cherry tomatoes. Cut the roasted pepper into strips.",
                "Cut the feta into generous cubes or crumble it coarsely depending on your preference.",
                "In a large salad bowl, arrange the greens. Add the vegetables and olives on top in a harmonious arrangement.",
                "Pour the Coratina dressing over the salad and toss gently. Place the feta on top. Finish with a drizzle of raw Coratina oil. Serve immediately.",
            ],
        },
        tip: {
            fr: "Utilisez de la feta en bloc, jamais émiettée d'avance — sa texture crémeuse et sa salinité naturelle sont bien supérieures. Et n'hésitez pas à être généreux avec l'huile : c'est elle qui fait tout.",
            en: "Use block feta, never pre-crumbled — its creamy texture and natural saltiness are far superior. And don't be shy with the oil: it's what makes this salad sing.",
        },
    },

    /* ── 3. Pasta Aglio e Olio ────────────────────────────────────────────── */
    'pasta-aglio-e-olio': {
        title: {
            fr: 'Pasta Aglio e Olio Authentique',
            en: 'Authentic Pasta Aglio e Olio',
        },
        category: { fr: 'Pâtes', en: 'Pasta' },
        time: '20 min',
        servings: 2,
        image: '/images/recipe_pasta.jpg',
        intro: {
            fr: "Aglio e Olio — ail et huile. Quatre ingrédients. Une philosophie entière. Ce plat napolitain révèle la vérité fondamentale de la cuisine italienne : la qualité de l'huile est tout. Notre Coratina, avec ses notes herbacées et sa légère amertume, transforme ce plat modeste en quelque chose de mémorable.",
            en: "Aglio e Olio — garlic and oil. Four ingredients. An entire philosophy. This Neapolitan dish reveals the fundamental truth of Italian cooking: the quality of the oil is everything. Our Coratina, with its herbaceous notes and gentle bitterness, elevates this humble dish into something truly memorable.",
        },
        ingredients: {
            fr: [
                { name: 'Spaghetti ou linguine', amount: '320 g' },
                { name: 'Ail frais', amount: '6–8 gousses' },
                { name: "Huile d'olive Coratina La Cantine", amount: '6 c. à soupe' },
                { name: 'Piment rouge séché (peperoncino)', amount: '1–2' },
                { name: 'Persil plat frais', amount: '1 bouquet' },
                { name: 'Eau de cuisson des pâtes', amount: '150–200 ml (réservés)' },
                { name: 'Parmesan râpé (optionnel)', amount: '40 g' },
                { name: 'Gros sel', amount: 'Pour la cuisson' },
            ],
            en: [
                { name: 'Spaghetti or linguine', amount: '320 g' },
                { name: 'Fresh garlic cloves', amount: '6–8' },
                { name: 'Coratina La Cantine olive oil', amount: '6 tbsp' },
                { name: 'Dried red chili (peperoncino)', amount: '1–2' },
                { name: 'Fresh flat-leaf parsley', amount: '1 bunch' },
                { name: 'Pasta cooking water', amount: '150–200 ml (reserved)' },
                { name: 'Grated Parmesan (optional)', amount: '40 g' },
                { name: 'Coarse salt', amount: 'For cooking' },
            ],
        },
        steps: {
            fr: [
                "Porter une grande casserole d'eau à ébullition. Saler très généreusement — l'eau doit être salée comme la mer méditerranée. Y cuire les pâtes al dente selon les indications du paquet. Réserver 200 ml d'eau de cuisson avant d'égoutter.",
                "Pendant la cuisson, émincer finement l'ail. Dans une grande poêle, verser l'huile Coratina et faire chauffer à feu moyen-doux. Ajouter l'ail émincé et le piment entier.",
                "Faire revenir doucement, en remuant constamment, jusqu'à ce que l'ail soit doré pâle et dégage un arôme intense — 3 à 4 minutes. ⚠️ Ne jamais laisser l'ail brunir, il deviendrait amer.",
                "Retirer le piment. Ajouter les pâtes égouttées dans la poêle. Verser 3 à 4 c. à soupe d'eau de cuisson. Mélanger vigoureusement à feu vif pendant 1 minute pour créer une émulsion brillante.",
                "Hors du feu, incorporer le persil haché grossièrement. Servir dans des assiettes chaudes. Finir avec un filet généreux d'huile Coratina crue et, si désiré, du parmesan râpé.",
            ],
            en: [
                "Bring a large pot of water to a boil. Season it very generously with salt — the water should taste like the Mediterranean sea. Cook the pasta al dente according to package directions. Reserve 200 ml of pasta water before draining.",
                "While the pasta cooks, finely slice the garlic. In a large skillet, add the Coratina oil and heat over medium-low. Add the sliced garlic and whole chili.",
                "Gently sauté, stirring constantly, until the garlic is pale golden and intensely aromatic — 3 to 4 minutes. ⚠️ Never let the garlic brown, it will turn bitter.",
                "Remove the chili. Add the drained pasta to the skillet. Add 3–4 tbsp of pasta water. Toss vigorously over high heat for 1 minute to create a glossy emulsified sauce.",
                "Off the heat, stir in the roughly chopped parsley. Serve in warm bowls. Finish with a generous drizzle of raw Coratina oil and, if desired, grated Parmesan.",
            ],
        },
        tip: {
            fr: "L'eau de cuisson féculente est le liant secret de ce plat — elle crée une sauce onctueuse et brillante. Ne la jetez jamais avant d'avoir fini le dressage.",
            en: "The starchy pasta water is the secret binder of this dish — it creates a silky, glossy sauce. Never discard it before you've finished plating.",
        },
    },

    /* ── 4. Artichauts Rôtis ──────────────────────────────────────────────── */
    'artichauts-rotis-huile-olive': {
        title: {
            fr: "Artichauts Rôtis à l'Huile d'Olive",
            en: 'Roasted Artichokes with Olive Oil',
        },
        category: { fr: 'Légumes', en: 'Vegetables' },
        time: '35 min',
        servings: 4,
        image: '/images/recipe_artichokes.jpg',
        intro: {
            fr: "L'artichaut et l'huile d'olive Coratina partagent la même origine — les terres arides et ensoleillées de la Méditerranée. Ensemble, ils créent une harmonie naturelle. La légère amertume de l'artichaut est magnifiée par l'intensité fruitée de la Coratina. Un plat d'une simplicité majestueuse.",
            en: "Artichoke and Coratina olive oil share the same origin — the arid, sun-drenched lands of the Mediterranean. Together, they create a natural harmony. The slight bitterness of the artichoke is magnified by the intense fruitiness of the Coratina. A dish of majestic simplicity.",
        },
        ingredients: {
            fr: [
                { name: 'Artichauts frais', amount: '4 gros' },
                { name: "Huile d'olive Coratina La Cantine", amount: '5 c. à soupe' },
                { name: 'Citron', amount: '2' },
                { name: 'Ail', amount: '4 gousses' },
                { name: 'Thym frais', amount: '4 branches' },
                { name: 'Persil plat', amount: '2 c. à soupe (pour finir)' },
                { name: 'Sel de mer', amount: 'Au goût' },
                { name: 'Poivre noir', amount: 'Au goût' },
            ],
            en: [
                { name: 'Fresh artichokes', amount: '4 large' },
                { name: 'Coratina La Cantine olive oil', amount: '5 tbsp' },
                { name: 'Lemon', amount: '2' },
                { name: 'Garlic', amount: '4 cloves' },
                { name: 'Fresh thyme', amount: '4 sprigs' },
                { name: 'Flat-leaf parsley', amount: '2 tbsp (to finish)' },
                { name: 'Sea salt', amount: 'To taste' },
                { name: 'Black pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préchauffer le four à 200 °C. Couper les artichauts en deux dans le sens de la longueur. Retirer les feuilles dures extérieures et le foin du cœur avec une cuillère. Frotter immédiatement les surfaces coupées avec un demi-citron pour éviter l'oxydation.",
                "Dans un grand plat allant au four, disposer les moitiés d'artichaut face coupée vers le haut. Glisser une demi-gousse d'ail et une branche de thym entre les feuilles de chaque artichaut.",
                "Arroser généreusement d'huile d'olive Coratina. Saler, poivrer. Presser le jus du second citron sur l'ensemble.",
                "Couvrir le plat hermétiquement de papier aluminium. Rôtir 20 minutes. Retirer le papier aluminium et poursuivre 12–15 minutes jusqu'à ce que les artichauts soient tendres et légèrement dorés sur les bords.",
                "Servir chauds, nappés d'un dernier filet d'huile Coratina crue et d'une poignée de persil haché. Accompagner de pain rustique pour saucer.",
            ],
            en: [
                "Preheat oven to 200 °C (400 °F). Cut the artichokes in half lengthwise. Remove the tough outer leaves and the fuzzy choke with a spoon. Immediately rub the cut surfaces with half a lemon to prevent browning.",
                "In a large oven-safe dish, arrange the artichoke halves cut-side up. Tuck half a garlic clove and a thyme sprig between the leaves of each half.",
                "Drizzle generously with Coratina olive oil. Season with salt and pepper. Squeeze the juice of the second lemon over everything.",
                "Cover the dish tightly with aluminum foil. Roast for 20 minutes. Remove the foil and continue cooking 12–15 minutes until the artichokes are tender and the edges are lightly golden.",
                "Serve warm, drizzled with a final flourish of raw Coratina oil and a handful of chopped parsley. Serve with rustic bread for dipping.",
            ],
        },
        tip: {
            fr: "Pour vérifier la cuisson, piquer la base de l'artichaut avec la pointe d'un couteau — elle doit s'enfoncer sans résistance. Trop cuite, l'artichaut devient fibreuse ; juste cuite, elle est fondante.",
            en: "To check doneness, pierce the base of the artichoke with a knife tip — it should slide in without resistance. Overcooked, it becomes fibrous; perfectly cooked, it melts.",
        },
    },

    /* ── 5. Salade Radicchio ──────────────────────────────────────────────── */
    'salade-radicchio-fenouil-oranges': {
        title: {
            fr: 'Salade de Radicchio, Fenouil & Oranges Sanguines',
            en: 'Radicchio, Fennel & Blood Orange Salad',
        },
        category: { fr: 'Salade', en: 'Salad' },
        time: '15 min',
        servings: 4,
        image: '/images/recipe_radicchio.jpg',
        intro: {
            fr: "Cette salade hivernale est un chef-d'œuvre d'équilibre. L'amertume du radicchio, la douceur anisée du fenouil, l'acidité vive des oranges sanguines — le tout lié par la profondeur fruitée de notre Coratina. Visuellement spectaculaire, elle impressionne autant les yeux que le palais.",
            en: "This winter salad is a masterpiece of balance. The bitterness of radicchio, the anise sweetness of fennel, the bright acidity of blood oranges — all united by the deep fruitiness of our Coratina. Visually spectacular, it impresses the eye as much as the palate.",
        },
        ingredients: {
            fr: [
                { name: 'Radicchio di Treviso ou de Chioggia', amount: '1 tête' },
                { name: 'Fenouil', amount: '1 bulbe' },
                { name: 'Oranges sanguines', amount: '3' },
                { name: 'Oignon rouge', amount: '½' },
                { name: 'Noix ou noisettes grillées', amount: '40 g' },
                { name: 'Parmesan en copeaux (optionnel)', amount: '30 g' },
                { name: "Huile d'olive Coratina La Cantine", amount: '4 c. à soupe' },
                { name: 'Vinaigre balsamique blanc', amount: '1 c. à soupe' },
                { name: 'Miel', amount: '½ c. à café' },
                { name: 'Sel et poivre', amount: 'Au goût' },
            ],
            en: [
                { name: 'Radicchio di Treviso or di Chioggia', amount: '1 head' },
                { name: 'Fennel bulb', amount: '1' },
                { name: 'Blood oranges', amount: '3' },
                { name: 'Red onion', amount: '½' },
                { name: 'Toasted walnuts or hazelnuts', amount: '40 g' },
                { name: 'Parmesan shavings (optional)', amount: '30 g' },
                { name: 'Coratina La Cantine olive oil', amount: '4 tbsp' },
                { name: 'White balsamic vinegar', amount: '1 tbsp' },
                { name: 'Honey', amount: '½ tsp' },
                { name: 'Salt and pepper', amount: 'To taste' },
            ],
        },
        steps: {
            fr: [
                "Préparer les oranges en suprêmes : peler à vif en retirant toute la peau blanche, puis lever les segments entre les membranes. Recueillir soigneusement le jus qui s'écoule — il servira pour la vinaigrette.",
                "Émincer finement le fenouil à la mandoline ou au couteau, en retirant les fils si nécessaire. Conserver quelques frondes pour décorer. Couper l'oignon rouge en lamelles très fines.",
                "Préparer la vinaigrette : fouetter l'huile Coratina avec le vinaigre balsamique blanc, le jus d'orange récupéré, le miel, le sel et le poivre.",
                "Déchirer grossièrement le radicchio et le disposer dans un grand saladier. Ajouter le fenouil émincé, les lamelles d'oignon rouge et les suprêmes d'orange.",
                "Verser la vinaigrette et mélanger délicatement. Parsemer de noix grillées, de copeaux de parmesan et des frondes de fenouil. Servir aussitôt.",
            ],
            en: [
                "Segment the oranges: cut away all the peel and white pith, then slice between the membranes to release the segments. Carefully collect any juice that drips — it goes into the dressing.",
                "Finely slice the fennel on a mandoline or with a knife, removing any tough strings. Reserve a few fronds for garnish. Thinly slice the red onion.",
                "Prepare the dressing: whisk the Coratina oil with white balsamic vinegar, the collected orange juice, honey, salt and pepper.",
                "Tear the radicchio into large pieces and place in a wide salad bowl. Add the sliced fennel, red onion and orange segments.",
                "Pour over the dressing and toss gently. Scatter the toasted nuts, Parmesan shavings and fennel fronds on top. Serve immediately.",
            ],
        },
        tip: {
            fr: "Le radicchio peut être légèrement amer — c'est sa signature. Pour adoucir, le faire tremper 10 minutes dans de l'eau froide, puis sécher. Mais si vous aimez l'amertume, utilisez-le directement — c'est lui qui donne du caractère.",
            en: "Radicchio can be quite bitter — that's its signature. To soften it, soak the torn leaves in cold water for 10 minutes, then dry. But if you enjoy bitterness, use it straight — it's what gives this salad its character.",
        },
    },

    /* ── 6. Tartare de Thon ───────────────────────────────────────────────── */
    'tartare-thon-huile-olive-citron': {
        title: {
            fr: "Tartare de Thon à l'Huile d'Olive & Citron",
            en: 'Tuna Tartare with Olive Oil & Lemon',
        },
        category: { fr: 'Poisson', en: 'Fish' },
        time: '15 min',
        servings: 2,
        image: '/images/recipe_tuna_tartare.jpg',
        intro: {
            fr: "La fraîcheur du thon, la vivacité du citron, la profondeur de l'huile Coratina — ce tartare est une célébration de la Méditerranée dans sa forme la plus pure. Pas de cuisson, pas de technique complexe : juste des ingrédients irréprochables et l'assurance d'une huile d'olive exceptionnelle.",
            en: "The freshness of tuna, the brightness of lemon, the depth of Coratina oil — this tartare is a celebration of the Mediterranean in its purest form. No cooking, no complex technique: just impeccable ingredients and the assurance of an exceptional olive oil.",
        },
        ingredients: {
            fr: [
                { name: 'Thon rouge frais (qualité sashimi)', amount: '250 g' },
                { name: "Huile d'olive Coratina La Cantine", amount: '3 c. à soupe' },
                { name: 'Citron jaune (zeste et jus)', amount: '1' },
                { name: 'Câpres au sel, rincées', amount: '1 c. à soupe' },
                { name: 'Ciboulette fraîche', amount: '2 c. à soupe' },
                { name: 'Échalote', amount: '1 petite' },
                { name: 'Sauce soja (optionnel)', amount: '1 c. à café' },
                { name: 'Fleur de sel', amount: 'Au goût' },
                { name: 'Poivre du moulin', amount: 'Au goût' },
                { name: 'Pousses de micro-herbes ou cresson', amount: 'Pour décorer' },
            ],
            en: [
                { name: 'Fresh bluefin tuna (sashimi grade)', amount: '250 g' },
                { name: 'Coratina La Cantine olive oil', amount: '3 tbsp' },
                { name: 'Lemon (zest and juice)', amount: '1' },
                { name: 'Salt-packed capers, rinsed', amount: '1 tbsp' },
                { name: 'Fresh chives', amount: '2 tbsp' },
                { name: 'Shallot', amount: '1 small' },
                { name: 'Soy sauce (optional)', amount: '1 tsp' },
                { name: 'Fleur de sel', amount: 'To taste' },
                { name: 'Fresh ground pepper', amount: 'To taste' },
                { name: 'Micro herbs or watercress', amount: 'To garnish' },
            ],
        },
        steps: {
            fr: [
                "Réfrigérer le thon 15 minutes avant de le couper — il sera plus facile à trancher. À l'aide d'un couteau très aiguisé, couper le thon en petits dés réguliers d'environ 8 mm. Ne jamais hacher au robot — la texture doit rester précise.",
                "Ciseler finement l'échalote et la ciboulette. Hacher grossièrement les câpres. Zester le citron.",
                "Dans un bol réfrigéré, mélanger délicatement le thon avec l'huile Coratina, le jus de citron, l'échalote, les câpres et la ciboulette. Assaisonner de fleur de sel et de poivre. Goûter et ajuster l'acidité.",
                "Réfrigérer 5 minutes maximum avant de servir — le tartare ne doit pas être préparé à l'avance.",
                "Dresser à l'aide d'un emporte-pièce rond ou librement dans des bols froids. Finir avec le zeste de citron, quelques gouttes d'huile Coratina crue, une pincée de fleur de sel et les micro-herbes. Servir immédiatement.",
            ],
            en: [
                "Refrigerate the tuna for 15 minutes before cutting — it will be easier to dice cleanly. Using a very sharp knife, cut the tuna into small, even cubes of about 8 mm. Never use a food processor — the texture must remain precise.",
                "Finely mince the shallot and chives. Roughly chop the capers. Zest the lemon.",
                "In a chilled bowl, gently fold the tuna with Coratina oil, lemon juice, shallot, capers and chives. Season with fleur de sel and pepper. Taste and adjust acidity.",
                "Refrigerate for a maximum of 5 minutes before serving — tartare should never be prepared far in advance.",
                "Plate using a round ring mold or freely in chilled bowls. Finish with lemon zest, a few drops of raw Coratina oil, a pinch of fleur de sel and micro herbs. Serve immediately.",
            ],
        },
        tip: {
            fr: "La qualité du thon est absolument déterminante ici — achetez-le chez un poissonnier de confiance, fraîchement déchargé. L'huile Coratina amplifie les arômes marins : elle ne doit pas les masquer, mais les révéler.",
            en: "The quality of the tuna is absolutely critical here — buy it from a trusted fishmonger, freshly landed. The Coratina oil amplifies the oceanic aromas: it should not mask them, but reveal them.",
        },
    },
};

/* ── Component ────────────────────────────────────────────────────────────── */

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
                        <h1>{lang === 'fr' ? 'Recette introuvable' : 'Recipe not found'}</h1>
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

    const title      = recipe.title[lang];
    const category   = recipe.category[lang];
    const intro      = recipe.intro[lang];
    const ingredients = recipe.ingredients[lang];
    const steps      = recipe.steps[lang];
    const tip        = recipe.tip[lang];

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
                                <h3>{lang === 'fr' ? 'Ingrédients' : 'Ingredients'}</h3>
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
                                <h3>{lang === 'fr' ? 'Préparation' : 'Instructions'}</h3>
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

                            {/* Chef's tip */}
                            <AnimatedSection>
                                <div style={{
                                    marginTop: 'var(--space-8)',
                                    padding: 'var(--space-6)',
                                    backgroundColor: 'var(--color-bg-subtle)',
                                    borderLeft: '3px solid var(--color-olive)',
                                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                                }}>
                                    <p style={{ fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-olive)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>
                                        {lang === 'fr' ? '💡 Le conseil Cantine' : '💡 The Cantine tip'}
                                    </p>
                                    <p style={{ fontStyle: 'italic', color: 'var(--color-text)', lineHeight: 1.7 }}>{tip}</p>
                                </div>
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
                                                ? "Huile d'Olive 100% Coratina"
                                                : '100% Coratina Olive Oil'}
                                        </p>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray)' }}>
                                            {lang === 'fr'
                                                ? 'Puglia, Italie · 500 ml'
                                                : 'Puglia, Italy · 500 ml'}
                                        </p>
                                        <Link
                                            to="/shop"
                                            className="btn btn-filled"
                                            style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2) var(--space-5)', fontSize: 'var(--text-xs)' }}
                                        >
                                            {lang === 'fr' ? 'Commander' : 'Order now'}
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Other recipes */}
                            <AnimatedSection delay={3} className="recipe-sidebar-card">
                                <h4>{lang === 'fr' ? "D'autres Recettes" : 'More Recipes'}</h4>
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
