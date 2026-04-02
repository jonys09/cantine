import type { MetaFunction } from 'react-router';
import React, { useState } from 'react';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export const meta: MetaFunction = () => [
    { title: 'Contact — La Cantine' },
    {
        name: 'description',
        content:
            "Contactez La Cantine — questions sur nos produits, commandes, livraisons ou partenariats.",
    },
];

/* ── FAQ Data ─────────────────────────────────────────────────────────────── */

type FAQItem = {
    category: { fr: string; en: string };
    question: { fr: string; en: string };
    answer: { fr: string; en: string };
};

const FAQ_ITEMS: FAQItem[] = [
    {
        category: { fr: 'Produits', en: 'Products' },
        question: {
            fr: "Quelle est la différence entre une huile DOP et une huile ordinaire?",
            en: "What is the difference between a DOP oil and a regular oil?",
        },
        answer: {
            fr: "La certification DOP (Dénomination d'Origine Protégée) garantit que l'huile est produite, transformée et conditionnée dans une zone géographique précise selon des méthodes rigoureusement contrôlées. Notre Coratina est une variété emblématique des Pouilles, récoltée à la main en octobre et pressée à froid dans les 24 heures. Le résultat est une huile d'une intensité aromatique et d'une concentration en polyphénols incomparables.",
            en: "The DOP (Protected Designation of Origin) certification guarantees that the oil is produced, processed and packaged in a specific geographic area according to rigorously controlled methods. Our Coratina is an emblematic Puglian variety, hand-harvested in October and cold-pressed within 24 hours. The result is an oil of unmatched aromatic intensity and polyphenol concentration.",
        },
    },
    {
        category: { fr: 'Produits', en: 'Products' },
        question: {
            fr: "Qu'est-ce que la variété Coratina?",
            en: "What is the Coratina variety?",
        },
        answer: {
            fr: "La Coratina est une variété d'olive emblématique de la région des Pouilles, dans le sud de l'Italie. Elle est naturellement riche en polyphénols, ce qui lui confère une excellente capacité antioxydante et une longue durée de conservation. Son profil gustatif se distingue par des notes végétales prononcées, une légère amertume équilibrée et une finale légèrement poivrée caractéristique.",
            en: "Coratina is an emblematic olive variety from the Puglia region in southern Italy. It is naturally rich in polyphenols, giving it excellent antioxidant capacity and a long shelf life. Its flavor profile is distinguished by pronounced vegetal notes, a balanced slight bitterness and a characteristic slightly peppery finish.",
        },
    },
    {
        category: { fr: 'Conservation', en: 'Storage' },
        question: {
            fr: "Comment bien conserver l'huile d'olive?",
            en: "How should I store olive oil?",
        },
        answer: {
            fr: "Conservez l'huile à l'abri de la lumière, de la chaleur et de l'humidité. Un placard sombre à température ambiante, idéalement entre 18 et 20°C, est l'endroit idéal. La bouteille fermée se conserve jusqu'à 18 mois. Une fois ouverte, consommez-la dans les 3 à 4 mois pour profiter de ses arômes optimaux. Évitez le réfrigérateur, qui peut faire cristalliser l'huile sans l'abîmer.",
            en: "Store oil away from light, heat and humidity. A dark cupboard at room temperature, ideally between 18 and 20°C, is ideal. The closed bottle keeps for up to 18 months. Once opened, use it within 3 to 4 months to enjoy optimal aromas. Avoid the refrigerator, which can crystallize the oil without damaging it.",
        },
    },
    {
        category: { fr: 'Conservation', en: 'Storage' },
        question: {
            fr: "Comment savoir si l'huile est encore fraîche?",
            en: "How do I know if the oil is still fresh?",
        },
        answer: {
            fr: "Une bonne huile d'olive fraîche dégage un arôme herbacé, fruité, parfois poivré. En bouche, elle présente une légère amertume et une sensation de vivacité. Si elle sent le rance, le carton mouillé ou l'huile végétale neutre, elle est oxydée. La couleur n'est pas un indicateur fiable de fraîcheur — une huile peut être verte ou dorée selon la variété et le degré de maturité des olives.",
            en: "A good fresh olive oil has a herbaceous, fruity, sometimes peppery aroma. On the palate, it presents a slight bitterness and a lively sensation. If it smells rancid, like wet cardboard, or like neutral vegetable oil, it has oxidized. Color is not a reliable indicator of freshness — an oil can be green or golden depending on the variety and ripeness of the olives.",
        },
    },
    {
        category: { fr: 'Commande', en: 'Order' },
        question: {
            fr: "Quels moyens de paiement acceptez-vous?",
            en: "What payment methods do you accept?",
        },
        answer: {
            fr: "Nous acceptons les principales cartes de crédit et de débit : Visa, Mastercard et American Express. Nous acceptons également PayPal et Apple Pay pour un paiement rapide et sécurisé. Toutes les transactions sont chiffrées et sécurisées par notre plateforme de paiement certifiée.",
            en: "We accept all major credit and debit cards: Visa, Mastercard and American Express. We also accept PayPal and Apple Pay for fast and secure payments. All transactions are encrypted and secured by our certified payment platform.",
        },
    },
    {
        category: { fr: 'Livraison', en: 'Delivery' },
        question: {
            fr: "Quelles sont les zones de livraison?",
            en: "What are the delivery zones?",
        },
        answer: {
            fr: "La livraison est gratuite dans la région de Longueuil, Brossard, Saint-Lambert et LaSalle. La livraison est également disponible partout au Québec pour un tarif calculé au moment du paiement selon votre adresse. Nous livrons actuellement au Canada uniquement.",
            en: "Free delivery is available in the Longueuil, Brossard, Saint-Lambert and LaSalle areas. Delivery is also available throughout Quebec at a rate calculated at checkout based on your address. We currently deliver within Canada only.",
        },
    },
    {
        category: { fr: 'Livraison', en: 'Delivery' },
        question: {
            fr: "Dans quel délai vais-je recevoir ma commande?",
            en: "When will I receive my order?",
        },
        answer: {
            fr: "Pour les livraisons locales (Longueuil et environs), comptez 24 à 48 heures. Pour les livraisons dans le reste du Québec, le délai est de 3 à 5 jours ouvrables. Un numéro de suivi de colis vous sera transmis par courriel dès l'expédition de votre commande.",
            en: "For local deliveries (Longueuil and surroundings), allow 24 to 48 hours. For deliveries to the rest of Quebec, the lead time is 3 to 5 business days. A parcel tracking number will be sent to you by email as soon as your order is shipped.",
        },
    },
    {
        category: { fr: 'Commande', en: 'Order' },
        question: {
            fr: "Puis-je modifier ou annuler ma commande?",
            en: "Can I modify or cancel my order?",
        },
        answer: {
            fr: "Oui, il est possible de modifier ou d'annuler votre commande dans les 2 heures suivant sa confirmation. Passé ce délai, la commande est généralement en cours de préparation. Dans ce cas, contactez-nous directement par courriel ou téléphone et nous ferons notre possible pour vous aider.",
            en: "Yes, it is possible to modify or cancel your order within 2 hours of confirmation. After that, the order is generally in preparation. In this case, contact us directly by email or phone and we will do our best to help you.",
        },
    },
];

/* ── Sticky Note Palette & Config ─────────────────────────────────────────── */

const NOTE_PALETTE = [
    { bg: '#FFF5B8', shade: '#EDD940', pin: '#E53935' },
    { bg: '#FFD9E0', shade: '#FFB3BC', pin: '#7B1FA2' },
    { bg: '#D7EFD7', shade: '#A8D8A8', pin: '#2E7D32' },
    { bg: '#D3E8F8', shade: '#A2CAE8', pin: '#1565C0' },
    { bg: '#FCE5CD', shade: '#F5C69A', pin: '#E65100' },
    { bg: '#ECD7F5', shade: '#D7AEF0', pin: '#6A1B9A' },
    { bg: '#D5F0E5', shade: '#A0D8BB', pin: '#00695C' },
    { bg: '#FDF0CF', shade: '#F5D98A', pin: '#C07800' },
];
const NOTE_ROTATIONS = [-3.5, 2.8, -1.8, 3.2, -2.2, 1.5, -3.8, 2.2];
const NOTE_Y_OFFSETS  = [0, 18, -12, 26, -8, 16, -20, 10];
const DISCARD_ROTS    = [-18, -5, 8, 22];

/* ── Sticky Note Component ────────────────────────────────────────────────── */

type StickyNoteProps = {
    category: string;
    question: string;
    answer: string;
    index: number;
    isThrown: boolean;
    isThrowing: boolean;
    onThrow: (i: number) => void;
    lang: 'fr' | 'en';
};

function StickyNote({ category, question, answer, index, isThrown, isThrowing, onThrow, lang }: StickyNoteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const p = NOTE_PALETTE[index % NOTE_PALETTE.length];
    const rotation = NOTE_ROTATIONS[index % NOTE_ROTATIONS.length];
    const yOffset  = NOTE_Y_OFFSETS[index % NOTE_Y_OFFSETS.length];

    const cls = ['sticky-note', isOpen && 'sticky-note--open', isThrowing && 'sticky-note--throwing', isThrown && 'sticky-note--thrown']
        .filter(Boolean).join(' ');

    return (
        <div
            className={cls}
            style={{ '--note-bg': p.bg, '--note-shade': p.shade, '--note-pin': p.pin, '--note-rotation': `${rotation}deg`, '--note-y': `${yOffset}px` } as React.CSSProperties}
            onClick={() => !isThrowing && setIsOpen(o => !o)}
            role="button"
            tabIndex={isThrown ? -1 : 0}
            aria-expanded={isOpen}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(o => !o); } }}
        >
            {/* Pushpin */}
            <div className="sticky-note-pin" aria-hidden="true" />

            {/* Category label */}
            <span className="sticky-note-category">{category}</span>

            {/* Question */}
            <h3 className="sticky-note-question">{question}</h3>

            {/* Expandable answer */}
            <div className={`sticky-note-answer${isOpen ? ' is-open' : ''}`}>
                <p>{answer}</p>
            </div>

            {/* Open/close icon */}
            <span className="sticky-note-toggle-icon" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    {isOpen
                        ? <path d="M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        : <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    }
                </svg>
            </span>

            {/* Throw button — revealed on hover */}
            <button
                className="sticky-note-throw"
                onClick={e => { e.stopPropagation(); onThrow(index); }}
                aria-label={lang === 'fr' ? 'Jeter cette note' : 'Dismiss this note'}
                type="button"
            >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
}

/* ── Contact Form ─────────────────────────────────────────────────────────── */

function ContactForm() {
    const { lang } = useI18n();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="contact-success">
                <p style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-3)' }}>
                    {lang === 'fr' ? 'Message envoyé !' : 'Message sent!'}
                </p>
                <p>
                    {lang === 'fr'
                        ? 'Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.'
                        : 'Thank you for reaching out. We will get back to you within 24 hours.'}
                </p>
            </div>
        );
    }

    return (
        <form className="contact-form-wrap" onSubmit={handleSubmit} noValidate>
            {/* First + Last name row */}
            <div className="contact-form-row">
                <div className="contact-field">
                    <label className="contact-label" htmlFor="firstName">
                        {lang === 'fr' ? 'Prénom' : 'First name'}
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="contact-input"
                        placeholder={lang === 'fr' ? 'Jean' : 'John'}
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                    />
                </div>
                <div className="contact-field">
                    <label className="contact-label" htmlFor="lastName">
                        {lang === 'fr' ? 'Nom' : 'Last name'}
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="contact-input"
                        placeholder={lang === 'fr' ? 'Dupont' : 'Smith'}
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                    />
                </div>
            </div>

            {/* Email */}
            <div className="contact-field">
                <label className="contact-label" htmlFor="email">
                    {lang === 'fr' ? 'Adresse courriel' : 'Email address'}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="contact-input"
                    placeholder={lang === 'fr' ? 'jean@exemple.ca' : 'john@example.ca'}
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                />
            </div>

            {/* Subject select */}
            <div className="contact-field">
                <label className="contact-label" htmlFor="subject">
                    {lang === 'fr' ? 'Sujet' : 'Subject'}
                </label>
                <select
                    id="subject"
                    name="subject"
                    className="contact-select"
                    value={form.subject}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        {lang === 'fr' ? '— Choisir un sujet —' : '— Choose a subject —'}
                    </option>
                    <option value="general">
                        {lang === 'fr' ? 'Question générale' : 'General question'}
                    </option>
                    <option value="order">
                        {lang === 'fr' ? 'Commande' : 'Order'}
                    </option>
                    <option value="partnership">
                        {lang === 'fr' ? 'Partenariat' : 'Partnership'}
                    </option>
                    <option value="other">
                        {lang === 'fr' ? 'Autre' : 'Other'}
                    </option>
                </select>
            </div>

            {/* Message */}
            <div className="contact-field">
                <label className="contact-label" htmlFor="message">
                    {lang === 'fr' ? 'Message' : 'Message'}
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="contact-textarea"
                    placeholder={
                        lang === 'fr'
                            ? 'Votre message...'
                            : 'Your message...'
                    }
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                />
            </div>

            <button type="submit" className="btn btn-filled" style={{ alignSelf: 'flex-start' }}>
                {lang === 'fr' ? 'Envoyer le message' : 'Send message'}
            </button>
        </form>
    );
}

/* ── Main Contact Page ────────────────────────────────────────────────────── */

export default function Contact() {
    const { lang } = useI18n();

    /* ── Sticky note throw state ─────────────────────────────────────── */
    const [thrown, setThrown] = useState<Set<number>>(new Set());
    const [throwing, setThrowing] = useState<Set<number>>(new Set());

    const handleThrow = (index: number) => {
        setThrowing(prev => new Set([...prev, index]));
        setTimeout(() => {
            setThrown(prev => new Set([...prev, index]));
            setThrowing(prev => { const s = new Set(prev); s.delete(index); return s; });
        }, 580);
    };

    const restoreAll = () => setThrown(new Set());

    return (
        <>
            <Header />

            {/* ── Contact Hero ───────────────────────────────────────────────── */}
            <section className="contact-hero">
                <div className="container contact-hero-inner">
                    <AnimatedSection>
                        <p className="eyebrow eyebrow--amber" style={{ color: 'var(--color-amber-light)' }}>
                            {lang === 'fr' ? 'Nous Écrire' : 'Get in Touch'}
                        </p>
                        <h1>
                            {lang === 'fr' ? 'Parlons.' : "Let's Talk."}
                        </h1>
                        <p className="contact-hero-sub">
                            {lang === 'fr'
                                ? "Une question sur nos produits, une commande, ou simplement l'envie d'en savoir plus sur l'huile Coratina — nous sommes là."
                                : "A question about our products, an order, or simply a desire to learn more about Coratina oil — we are here."}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── Contact Body ───────────────────────────────────────────────── */}
            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Left: Contact info cards */}
                        <AnimatedSection>
                            <div className="contact-info">
                                <div>
                                    <h2 className="contact-info-heading">
                                        {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                                    </h2>
                                    <p className="contact-info-sub">
                                        {lang === 'fr'
                                            ? "Notre équipe vous répond dans les 24 heures, du lundi au vendredi."
                                            : "Our team responds within 24 hours, Monday to Friday."}
                                    </p>
                                </div>

                                <div className="contact-info-cards">
                                    {/* Location */}
                                    <div className="contact-info-card">
                                        <div className="contact-info-card-icon" aria-hidden="true">
                                            📍
                                        </div>
                                        <div>
                                            <p className="contact-info-card-label">
                                                {lang === 'fr' ? 'Localisation' : 'Location'}
                                            </p>
                                            <p className="contact-info-card-value">
                                                Longueuil, Québec, Canada
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="contact-info-card">
                                        <div className="contact-info-card-icon" aria-hidden="true">
                                            ✉️
                                        </div>
                                        <div>
                                            <p className="contact-info-card-label">
                                                {lang === 'fr' ? 'Courriel' : 'Email'}
                                            </p>
                                            <p className="contact-info-card-value">
                                                <a
                                                    href="mailto:bonjour@lacantine.ca"
                                                    style={{ color: 'var(--color-olive-mid)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                                                >
                                                    bonjour@lacantine.ca
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Social */}
                                    <div className="contact-info-card">
                                        <div className="contact-info-card-icon" aria-hidden="true">
                                            📱
                                        </div>
                                        <div>
                                            <p className="contact-info-card-label">
                                                {lang === 'fr' ? 'Réseaux Sociaux' : 'Social Media'}
                                            </p>
                                            <p className="contact-info-card-value">
                                                <a
                                                    href="https://instagram.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: 'var(--color-olive-mid)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                                                >
                                                    @lacantine.olive
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="contact-info-card">
                                        <div className="contact-info-card-icon" aria-hidden="true">
                                            🕐
                                        </div>
                                        <div>
                                            <p className="contact-info-card-label">
                                                {lang === 'fr' ? 'Disponibilité' : 'Availability'}
                                            </p>
                                            <p className="contact-info-card-value">
                                                {lang === 'fr'
                                                    ? 'Lun – Ven, 9h – 18h (HE)'
                                                    : 'Mon – Fri, 9am – 6pm (ET)'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Right: Contact form */}
                        <AnimatedSection delay={1}>
                            <h2 className="contact-info-heading" style={{ marginBottom: 'var(--space-6)' }}>
                                {lang === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                            </h2>
                            <ContactForm />
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FAQ Section ────────────────────────────────────────────────── */}
            <section className="section faq-section">
                <div className="container">
                    <AnimatedSection>
                        <div className="faq-header">
                            <p className="eyebrow eyebrow--olive">
                                {lang === 'fr' ? 'Questions Fréquentes' : 'FAQ'}
                            </p>
                            <h2 className="heading-2">
                                {lang === 'fr' ? 'Tout Ce Que Vous Voulez Savoir' : 'Everything You Want to Know'}
                            </h2>
                            <p className="faq-instructions">
                                {lang === 'fr'
                                    ? 'Cliquez sur une note pour lire la réponse · Jetez celles que vous avez déjà lues'
                                    : 'Click a note to read the answer · Dismiss the ones you\'ve already read'}
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="faq-notes-scatter">
                        {FAQ_ITEMS.map((item, i) => (
                            <StickyNote
                                key={i}
                                index={i}
                                category={item.category[lang]}
                                question={item.question[lang]}
                                answer={item.answer[lang]}
                                isThrown={thrown.has(i)}
                                isThrowing={throwing.has(i)}
                                onThrow={handleThrow}
                                lang={lang}
                            />
                        ))}
                    </div>

                    {thrown.size > 0 && (
                        <div className="faq-discard-zone">
                            <div className="faq-discard-papers" aria-hidden="true">
                                {Array.from(thrown).slice(0, 4).map((noteIdx, i) => (
                                    <div
                                        key={noteIdx}
                                        className="faq-discarded-paper"
                                        style={{
                                            '--note-bg': NOTE_PALETTE[noteIdx % NOTE_PALETTE.length].bg,
                                            '--discard-rot': `${DISCARD_ROTS[i % DISCARD_ROTS.length]}deg`,
                                        } as React.CSSProperties}
                                    />
                                ))}
                            </div>
                            <p>
                                {thrown.size}&nbsp;
                                {lang === 'fr'
                                    ? `note${thrown.size > 1 ? 's' : ''} rejetée${thrown.size > 1 ? 's' : ''}`
                                    : `note${thrown.size > 1 ? 's' : ''} dismissed`}
                            </p>
                            <button className="faq-restore-btn" onClick={restoreAll} type="button">
                                {lang === 'fr' ? '↩ Tout restaurer' : '↩ Restore all'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
