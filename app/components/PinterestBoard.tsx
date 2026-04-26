import { useEffect } from 'react';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export function PinterestBoard() {
    const { lang } = useI18n();

    useEffect(() => {
        // Load Pinterest script dynamically
        if (!document.getElementById('pinterest-script')) {
            const script = document.createElement('script');
            script.id = 'pinterest-script';
            script.src = '//assets.pinterest.com/js/pinit.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        } else if ((window as any).PinUtils) {
            // Re-render boards if script is already loaded
            (window as any).PinUtils.build();
        }
    }, []);

    return (
        <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="container">
                <AnimatedSection style={{ textAlign: 'center', marginBottom: 'var(--space-8)' } as any}>
                    <p className="eyebrow eyebrow--olive">
                        {lang === 'fr' ? 'Inspiration' : 'Inspiration'}
                    </p>
                    <h2 className="heading-2">
                        {lang === 'fr' ? 'Notre Tableau d\'Humeur' : 'Our Moodboard'}
                    </h2>
                    <p className="body-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto' } as any}>
                        {lang === 'fr'
                            ? "Plongez dans l'univers visuel qui inspire La Cantine. Un hommage à la beauté rustique et à la dolce vita italienne."
                            : "Dive into the visual universe that inspires La Cantine. A tribute to rustic beauty and the Italian dolce vita."}
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div style={{ display: 'flex', justifyContent: 'center' } as any}>
                        <a
                            data-pin-do="embedBoard"
                            data-pin-board-width="900"
                            data-pin-scale-height="400"
                            data-pin-scale-width="115"
                            href="https://ca.pinterest.com/christopher0042/olive-oil/"
                        >
                            Pinterest Board
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
