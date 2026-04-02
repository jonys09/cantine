import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) { setIsVisible(true); return; }
        if (typeof IntersectionObserver === 'undefined') { setIsVisible(true); return; }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.05, rootMargin: '0px 0px -20px 0px', ...options },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <div
            ref={ref}
            className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} ${delay ? `delay-${delay}` : ''} ${className}`}
        >
            {children}
        </div>
    );
}

export function StaggerContainer({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <div
            ref={ref}
            className={`stagger-children ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
