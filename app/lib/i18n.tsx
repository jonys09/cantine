import { useState, useEffect, useCallback } from 'react';

export type Lang = 'fr' | 'en';

const translations = {
    fr: {
        // Nav
        nav_shop: 'Boutique',
        nav_story: 'Notre Histoire',
        nav_recipes: 'Recettes',
        nav_stores: 'Points de vente',
        nav_cart: 'Panier',

        // Hero
        hero_eyebrow: 'Huile d\'Olive Premium — Pouilles, Italie',
        hero_headline: 'Or liquide d\'Italie',
        hero_sub: 'Coratina DOP · Pressée à froid · Polyphénols exceptionnels',
        hero_cta: 'Découvrir',
        hero_scroll: 'Défiler',

        // Products
        products_heading: 'Notre sélection',
        products_eyebrow: '',
        product_single_name: 'Huile d\'Olive Coratina',
        product_single_size: '500 ml',
        product_single_desc: 'Notre huile signature 100% Coratina des Pouilles.',
        product_bundle_name: 'Trio de 3 bouteilles',
        product_bundle_size: '3 × 500 ml',
        product_bundle_desc: 'Le choix idéal pour les amateurs ou pour offrir. Économisez tout en partageant l\'excellence de nos Pouilles.',
        product_bundle_badge: 'Meilleure Valeur',
        product_pourer_name: 'Bec Verseur',
        product_pourer_size: 'Universel',
        product_pourer_desc: 'Versez avec précision et élégance. Bec verseur en acier inoxydable compatible avec toutes nos bouteilles.',
        product_cta: 'Ajouter au panier',
        product_view: 'Voir le produit',

        // Story
        story_eyebrow: 'Notre Histoire',
        story_heading: 'La Cantine apporte au Québec depuis 2023 une huile d\'olive italienne d\'exception, sans compromis.',
        story_p1: 'Notre Coratina est issue des Pouilles, récoltée à la main et pressée à froid pour capturer toute l\'intensité du fruit.',
        story_p2: 'Pure, équilibrée, essentielle.',
        story_cta: 'Lire notre histoire',
        story_stat1_num: '2023',
        story_stat1_label: 'Fondation',
        story_stat2_num: '500+',
        story_stat2_label: 'Clients satisfaits',
        story_stat3_num: '<0,2 %',
        story_stat3_label: 'Acidité',
        story_stat4_num: '100+ ans',
        story_stat4_label: 'Oliviers centenaires',

        // Recipes
        recipes_eyebrow: 'De la Cuisine',
        recipes_heading: 'Recettes & Inspirations',
        recipes_cta: 'Toutes les recettes',
        recipe1_title: 'Bruschetta à l\'Huile d\'Olive Coratina',
        recipe1_excerpt: 'La simplicité au service de la saveur. Pain grillé, tomates fraîches, basilic et un généreux filet de notre Coratina. Un classique italien sublimé.',
        recipe1_time: '10 min',
        recipe1_category: 'Entrée',
        recipe2_title: 'Salade Méditerranéenne & Vinaigrette Coratina',
        recipe2_excerpt: 'Légumes croquants, olives de Kalamata, feta fondante et une vinaigrette à l\'huile d\'olive intense. Le soleil des Pouilles dans votre assiette.',
        recipe2_time: '15 min',
        recipe2_category: 'Salade',
        recipe3_title: 'Pasta Aglio e Olio Authentique',
        recipe3_excerpt: 'Quatre ingrédients. Un résultat sublime. L\'ail doré à l\'huile Coratina crée une sauce dorée qui enrobe chaque spaghetti d\'un voile de pure perfection.',
        recipe3_time: '20 min',
        recipe3_category: 'Pâtes',

        // Stores
        stores_eyebrow: 'Livraison partout au Canada',
        stores_heading: 'Nous Trouver',
        stores_sub: 'Nous livrons à travers le Canada. Livraison offerte dès 125 $ (QC & ON) ou 150 $ (autres provinces).',
        stores_delivery_title: 'Livraison au Canada',
        stores_delivery_desc: 'Commandes préparées sous 48h ouvrables. Délais : 1 à 7 jours ouvrables.',
        stores_online_title: 'Commande en Ligne',
        stores_online_desc: 'Commandez directement sur notre boutique en ligne et recevez votre huile.',
        stores_cta: 'Commander maintenant',

        // Reviews
        reviews_eyebrow: 'Ce Que Disent Nos Clients',
        reviews_heading: 'Ils L\'Ont Goûtée, Ils L\'Ont Adoptée',

        // Newsletter
        newsletter_heading: 'Restez Informé',
        newsletter_sub: 'Recettes exclusives, nouvelles récoltes et offres réservées à nos abonnés.',
        newsletter_placeholder: 'Votre adresse courriel',
        newsletter_cta: 'S\'abonner',
        newsletter_success: 'Merci ! Vous êtes maintenant abonné.',

        // Footer
        footer_tagline: 'L\'excellence de l\'artisanat des Pouilles, livrée au Canada.',
        footer_shop: 'Boutique',
        footer_company: 'La Compagnie',
        footer_follow: 'Nous Suivre',
        footer_legal: 'Tous droits réservés.',
        footer_livraison: 'Livraison',

        // Hero tagline
        hero_tagline: 'Une histoire de famille, de terre et de temps.',

        // About
        about_title: 'De Puglia au Québec',
        about_subtitle: 'Une passion transmise en bouteille.',
        nav_livraison: 'Livraison',

        // Cart
        cart_title: 'Votre Panier',
        cart_empty: 'Votre panier est vide.',
        cart_continue: 'Continuer les achats',
        cart_subtotal: 'Sous-total',
        cart_note: 'Taxes et livraison calculées au paiement.',
        cart_checkout: 'Commander',
        cart_remove: 'Retirer',

        // Product page
        add_to_cart: 'Ajouter au panier',
        out_of_stock: 'Rupture de stock',
        price: 'Prix',
        origin: 'Origine',
        variety: 'Variété',
        certification: 'Certification',
        acidity: 'Acidité',
        polyphenols: 'Polyphénols',
        tasting_notes: 'Notes de Dégustation',
        production: 'Production',
    },
    en: {
        // Nav
        nav_shop: 'Shop',
        nav_story: 'Our Story',
        nav_recipes: 'Recipes',
        nav_stores: 'Find Us',
        nav_cart: 'Cart',

        // Hero
        hero_eyebrow: 'Premium Olive Oil — Puglia, Italy',
        hero_headline: 'Italy\'s Liquid Gold',
        hero_sub: 'Coratina DOP · Cold-Pressed · Exceptional Polyphenols',
        hero_cta: 'Discover',
        hero_scroll: 'Scroll',

        // Products
        products_heading: 'Our Selection',
        products_eyebrow: '',
        product_single_name: 'Coratina Olive Oil',
        product_single_size: '500 ml',
        product_single_desc: 'Our signature oil 100% Coratina from Puglia.',
        product_bundle_name: 'Trio of 3 Bottles',
        product_bundle_size: '3 × 500 ml',
        product_bundle_desc: 'The perfect choice for aficionados or as a gift. Save while sharing the excellence of our Puglia olive oil.',
        product_bundle_badge: 'Best Value',
        product_pourer_name: 'Olive Oil Pourer',
        product_pourer_size: 'Universal',
        product_pourer_desc: 'Pour with precision and elegance. Stainless steel pourer compatible with all our bottles.',
        product_cta: 'Add to cart',
        product_view: 'View product',

        // Story
        story_eyebrow: 'Our Story',
        story_heading: 'La Cantine has been bringing exceptional Italian olive oil to Quebec since 2023, without compromise.',
        story_p1: 'Our Coratina comes from Puglia, hand-harvested and cold-pressed to capture the full intensity of the fruit.',
        story_p2: 'Pure, balanced, essential.',
        story_cta: 'Read our story',
        story_stat1_num: '2023',
        story_stat1_label: 'Founded',
        story_stat2_num: '500+',
        story_stat2_label: 'Happy customers',
        story_stat3_num: '<0.2%',
        story_stat3_label: 'Acidity',
        story_stat4_num: '100+ yrs',
        story_stat4_label: 'Century-old trees',

        // Recipes
        recipes_eyebrow: 'From the Kitchen',
        recipes_heading: 'Recipes & Inspiration',
        recipes_cta: 'All recipes',
        recipe1_title: 'Bruschetta with Coratina Olive Oil',
        recipe1_excerpt: 'Simplicity in service of flavor. Toasted bread, fresh tomatoes, basil and a generous drizzle of our Coratina. An Italian classic elevated.',
        recipe1_time: '10 min',
        recipe1_category: 'Appetizer',
        recipe2_title: 'Mediterranean Salad & Coratina Dressing',
        recipe2_excerpt: 'Crisp vegetables, Kalamata olives, creamy feta and an intense olive oil vinaigrette. The Puglian sun in your bowl.',
        recipe2_time: '15 min',
        recipe2_category: 'Salad',
        recipe3_title: 'Authentic Pasta Aglio e Olio',
        recipe3_excerpt: 'Four ingredients. One sublime result. Garlic golden in Coratina oil creates a sauce that coats each spaghetto in a veil of pure perfection.',
        recipe3_time: '20 min',
        recipe3_category: 'Pasta',

        // Stores
        stores_eyebrow: 'Delivered Across Canada',
        stores_heading: 'Find Us',
        stores_sub: 'We ship across Canada. Free shipping from $125 (QC & ON) or $150 (other provinces).',
        stores_delivery_title: 'Shipping to Canada',
        stores_delivery_desc: 'Orders prepared within 48 business hours. Delivery: 1 to 7 business days.',
        stores_online_title: 'Order Online',
        stores_online_desc: 'Order directly from our online store and receive your oil.',
        stores_cta: 'Order now',

        // Reviews
        reviews_eyebrow: 'What Our Customers Say',
        reviews_heading: 'They Tasted It, They Loved It',

        // Newsletter
        newsletter_heading: 'Stay Informed',
        newsletter_sub: 'Exclusive recipes, new harvests and offers reserved for our subscribers.',
        newsletter_placeholder: 'Your email address',
        newsletter_cta: 'Subscribe',
        newsletter_success: 'Thank you! You are now subscribed.',

        // Footer
        footer_tagline: 'The excellence of Puglian craftsmanship, delivered across Canada.',
        footer_shop: 'Shop',
        footer_company: 'Company',
        footer_follow: 'Follow Us',
        footer_legal: 'All rights reserved.',
        footer_livraison: 'Shipping',

        // Hero tagline
        hero_tagline: 'A story of family, land, and time.',

        // About
        about_title: 'From Puglia to Canada',
        about_subtitle: 'A passion bottled.',
        nav_livraison: 'Shipping',

        // Cart
        cart_title: 'Your Cart',
        cart_empty: 'Your cart is currently empty.',
        cart_continue: 'Continue shopping',
        cart_subtotal: 'Subtotal',
        cart_note: 'Taxes and shipping calculated at checkout.',
        cart_checkout: 'Checkout',
        cart_remove: 'Remove',

        // Product page
        add_to_cart: 'Add to cart',
        out_of_stock: 'Out of stock',
        price: 'Price',
        origin: 'Origin',
        variety: 'Variety',
        certification: 'Certification',
        acidity: 'Acidity',
        polyphenols: 'Polyphenols',
        tasting_notes: 'Tasting Notes',
        production: 'Production',
    },
} as const;

export type TranslationKey = keyof typeof translations.fr;

export function getT(lang: Lang) {
    return (key: TranslationKey): string => translations[lang][key];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shopify Product Localization Fallback
   Since the Storefront API is not returning the published French/English
   translations correctly (due to Shopify Admin Language settings), we
   intercept and translate known products here.
───────────────────────────────────────────────────────────────────────────── */

const PRODUCT_TRANSLATIONS: Record<string, { title: Record<Lang, string>, description: Record<Lang, string> }> = {
    'huile-dolive-coratina': {
        title: {
            fr: "Huile d'Olive Coratina",
            en: "Coratina Olive Oil"
        },
        description: {
            fr: "L'essence des Pouilles, en bouteille. Format 500 mL.<br/><br/>Une Coratina extra vierge, riche, équilibrée et profondément expressive. Une huile pensée pour sublimer chaque geste — du plus simple au plus précis.<br/><br/><strong>Profil</strong><br/>Texture soyeuse, bel équilibre et finale délicatement relevée, signature de sa richesse en polyphénols.<br/><br/><strong>Récolte</strong><br/>Novembre – Décembre 2025",
            en: "The essence of Puglia, bottled. 500 mL format.<br/><br/>A Coratina extra virgin olive oil — rich, balanced, and deeply expressive. An oil crafted to elevate every gesture, from the simplest to the most precise.<br/><br/><strong>Profile</strong><br/>Silky texture, beautifully balanced, with a delicately lifted finish — a signature of its high polyphenol content.<br/><br/><strong>Harvest</strong><br/>November – December 2025"
        }
    },
    'coffret-3-bouteilles': {
        title: {
            fr: "Trio de 3 bouteilles",
            en: "Trio of 3 Bottles"
        },
        description: {
            fr: "Le choix idéal pour les amateurs ou pour offrir. Économisez tout en partageant l'excellence de notre région des Pouilles. Huile d'Olive Extra Vierge – Coratina. Provenant des terres baignées de soleil du sud de l'Italie, cette huile d'olive extra vierge Coratina incarne toute l'intensité et l'élégance de son terroir natal. Son profil aromatique riche et raffiné sublime chaque plat... En bouche, elle révèle une texture soyeuse, un équilibre remarquable et une finale délicatement relevée, témoignant de sa haute concentration en polyphénols.",
            en: "The ideal choice for enthusiasts or as a gift. Save money while sharing the excellence of our Puglia region. Extra Virgin Olive Oil – Coratina Sourced from the sun-drenched lands of southern Italy, this Coratina extra virgin olive oil embodies the full intensity and elegance of its native terroir. Its rich and refined aromatic profile enhances every dish, from the simplest salad to the most sophisticated cuisine. On the palate, it reveals a silky texture, a remarkable balance, and a delicately lifted finish, reflecting its high concentration of polyphenols."
        }
    }
};

export function localizeProduct<T extends { handle?: string, title?: string, description?: string, descriptionHtml?: string }>(product: T, lang: Lang): T {
    if (!product || !product.handle) return product;
    const trans = PRODUCT_TRANSLATIONS[product.handle];
    if (trans) {
        return {
            ...product,
            title: trans.title[lang] || product.title,
            description: trans.description[lang] || product.description,
            descriptionHtml: trans.description[lang] ? `<p>${trans.description[lang]}</p>` : product.descriptionHtml
        };
    }
    return product;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Global subscriber pattern — bypasses React context entirely for reliability.
   Every component calling useI18n() subscribes directly; when changeLang fires,
   ALL subscribers re-render simultaneously.
───────────────────────────────────────────────────────────────────────────── */

let _lang: Lang = 'fr';
const _subs = new Set<React.Dispatch<React.SetStateAction<Lang>>>();

function _broadcast(lang: Lang) {
    _lang = lang;
    _subs.forEach(fn => fn(lang));
}

/** Drop-in replacement — now a simple passthrough, no context needed */
export function I18nProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export function useI18n() {
    // Always initialise as 'fr' so SSR and client first-render match
    const [lang, setLang] = useState<Lang>('fr');

    useEffect(() => {
        // Read localStorage once on mount (client only)
        const stored = localStorage.getItem('cantine-lang') as Lang | null;
        if (stored === 'fr' || stored === 'en') {
            _lang = stored;
            setLang(stored);
        }
        // Subscribe to future changeLang calls
        _subs.add(setLang);
        return () => { _subs.delete(setLang); };
    }, []);

    const changeLang = useCallback((newLang: Lang) => {
        localStorage.setItem('cantine-lang', newLang);
        // Also persist in cookie so server loaders can read it for Shopify language-aware fetching
        document.cookie = `cantine-lang=${newLang};path=/;max-age=31536000;SameSite=Lax`;
        _broadcast(newLang);
    }, []);

    const toggle = useCallback(() => {
        changeLang(_lang === 'fr' ? 'en' : 'fr');
    }, [changeLang]);

    return { lang, t: getT(lang), toggle, changeLang };
}
