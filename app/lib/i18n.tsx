import { useState, useEffect, useCallback } from 'react';

export type Lang = 'fr' | 'en';

const translations = {
    fr: {
        // Nav
        nav_shop: 'Boutique',
        nav_story: 'Notre Histoire',
        nav_recipes: 'Recettes',
        nav_stores: 'Nous Trouver',
        nav_cart: 'Panier',

        // Hero
        hero_eyebrow: 'Huile d\'Olive Premium — Pouilles, Italie',
        hero_headline: 'L\'Or Liquide du Sud de l\'Italie',
        hero_sub: 'Coratina DOP · Pressée à froid · Polyphénols exceptionnels',
        hero_cta: 'Découvrir',
        hero_scroll: 'Défiler',

        // Products
        products_heading: 'Nos Produits',
        products_eyebrow: 'Sélection Artisanale',
        product_single_name: 'Huile d\'Olive Coratina',
        product_single_size: '500 ml',
        product_single_desc: 'Notre huile signature. Coratina DOP des Pouilles, pressée à froid. Notes d\'herbe fraîche, tomate et artichaut avec une légère amertume équilibrée.',
        product_bundle_name: 'Coffret 3 Bouteilles',
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
        story_heading: 'Né d\'une passion pour l\'authenticité',
        story_p1: 'La Cantine est née en 2023 d\'un désir simple : apporter au Québec l\'excellence de l\'huile d\'olive italienne artisanale. Chaque bouteille raconte l\'histoire des oliveraies centenaires des Pouilles.',
        story_p2: 'Notre Coratina, variété emblématique de la région, est récoltée à la main et pressée à froid dans le moulin Panorama Pieralisi. Le résultat : une huile d\'une pureté et d\'une intensité incomparables, certifiée DOP.',
        story_cta: 'Lire notre histoire',
        story_stat1_num: '2023',
        story_stat1_label: 'Fondation',
        story_stat2_num: '500+',
        story_stat2_label: 'Clients satisfaits',
        story_stat3_num: '<2%',
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
        stores_eyebrow: 'Disponible Localement',
        stores_heading: 'Nous Trouver',
        stores_sub: 'Disponible à Longueuil et dans les environs. Livraison gratuite dans la région.',
        stores_delivery_title: 'Livraison Gratuite',
        stores_delivery_desc: 'Livraison à domicile offerte dans la région de Longueuil et ses environs.',
        stores_online_title: 'Commande en Ligne',
        stores_online_desc: 'Commandez directement sur notre boutique et recevez votre huile en 48h.',
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
        footer_tagline: 'L\'excellence de l\'artisanat des Pouilles, livrée au Québec.',
        footer_shop: 'Boutique',
        footer_company: 'La Compagnie',
        footer_follow: 'Nous Suivre',
        footer_legal: 'Tous droits réservés.',

        // About
        about_title: 'Notre Histoire',
        about_subtitle: 'De Puglia au Québec — une passion transmise en bouteille.',

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
        hero_headline: 'Liquid Gold from Southern Italy',
        hero_sub: 'Coratina DOP · Cold-Pressed · Exceptional Polyphenols',
        hero_cta: 'Discover',
        hero_scroll: 'Scroll',

        // Products
        products_heading: 'Our Products',
        products_eyebrow: 'Artisanal Selection',
        product_single_name: 'Coratina Olive Oil',
        product_single_size: '500 ml',
        product_single_desc: 'Our signature oil. DOP Coratina from Puglia, cold-pressed. Notes of fresh grass, tomato and artichoke with a balanced slight bitterness.',
        product_bundle_name: 'Bundle of 3 Bottles',
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
        story_heading: 'Born from a passion for authenticity',
        story_p1: 'La Cantine was born in 2023 from a simple desire: to bring the excellence of artisanal Italian olive oil to Québec. Each bottle tells the story of the century-old olive groves of Puglia.',
        story_p2: 'Our Coratina, the iconic variety of the region, is hand-harvested and cold-pressed at the Panorama Pieralisi mill. The result: an oil of unparalleled purity and intensity, DOP certified.',
        story_cta: 'Read our story',
        story_stat1_num: '2023',
        story_stat1_label: 'Founded',
        story_stat2_num: '500+',
        story_stat2_label: 'Happy customers',
        story_stat3_num: '<2%',
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
        stores_eyebrow: 'Available Locally',
        stores_heading: 'Find Us',
        stores_sub: 'Available in Longueuil and surrounding areas. Free delivery in the region.',
        stores_delivery_title: 'Free Delivery',
        stores_delivery_desc: 'Free home delivery in the Longueuil area and surroundings.',
        stores_online_title: 'Order Online',
        stores_online_desc: 'Order directly from our store and receive your oil within 48 hours.',
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
        footer_tagline: 'The excellence of Puglian craftsmanship, delivered to Québec.',
        footer_shop: 'Shop',
        footer_company: 'Company',
        footer_follow: 'Follow Us',
        footer_legal: 'All rights reserved.',

        // About
        about_title: 'Our Story',
        about_subtitle: 'From Puglia to Québec — a passion bottled.',

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
