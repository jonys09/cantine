import { useEffect, useRef } from 'react';
import { useI18n } from '~/lib/i18n';
import { AnimatedSection } from '~/lib/animations';

export function PinterestBoard() {
    const { lang } = useI18n();
    const boardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!boardRef.current) return;

        // Clear existing content to prevent duplicate boards on re-render or navigation
        boardRef.current.innerHTML = `
            <a
                data-pin-do="embedBoard"
                data-pin-board-width="900"
                data-pin-scale-height="400"
                data-pin-scale-width="115"
                href="https://ca.pinterest.com/christopher0042/olive-oil/"
            >
                Pinterest Board
            </a>
        `;

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
                <AnimatedSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-8)' } as any}>
                    <p className="eyebrow eyebrow--olive" style={{ justifyContent: 'center' }}>
                        {lang === 'fr' ? 'Vision' : 'Vision'}
                    </p>
                    <h2 className="heading-2" style={{ textAlign: 'center' }}>
                        {lang === 'fr' ? 'L\'Esthétique' : 'The Aesthetic'}
                    </h2>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div style={{ display: 'flex', justifyContent: 'center' } as any} ref={boardRef} />
                </AnimatedSection>
            </div>
        </section>
    );
}
