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



            <Footer />
        </>
    );
}
