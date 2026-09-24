import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LABELS = [
  { text: 'Kompakt o\'lcham', x: '8%', y: '28%' },
  { text: 'Sokin ishlash', x: '62%', y: '22%' },
  { text: 'Oson xizmat ko\'rsatish', x: '6%', y: '62%' },
  { text: 'Premium materiallar', x: '65%', y: '68%' },
];

export const Lifestyle = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(bgRef.current,
        { y: '-8%' },
        {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Stagger floating labels
      if (labelsRef.current) {
        gsap.fromTo(labelsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              once: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-fenix-dark flex items-center justify-center">
      
      {/* Background — deep blue gradient (no external image needed) */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, #0a3d5c 0%, #03131D 50%, #01080f 100%)',
        }}
      >
        {/* Grid overlay for texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(101,216,245,0.15) 60px, rgba(101,216,245,0.15) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(101,216,245,0.15) 60px, rgba(101,216,245,0.15) 61px)',
          }}
        />
        {/* Product image if available */}
        <img
          src="/filter-hero.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fenix-dark via-transparent to-fenix-dark" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-4xl mx-auto drop-shadow-2xl">
          Uyingizga mos keladigan texnologiya.
        </h2>
      </div>

      {/* Floating Labels */}
      <div ref={labelsRef} className="absolute inset-0 z-20 pointer-events-none">
        {LABELS.map((label, i) => (
          <div 
            key={i} 
            className="absolute"
            style={{ left: label.x, top: label.y }}
          >
            <div className="glass-panel px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white/90 text-xs md:text-sm font-medium shadow-xl whitespace-nowrap">
              {label.text}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
