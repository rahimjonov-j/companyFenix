import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LABELS = [
  { text: 'Kompakt o\'lcham', x: '20%', y: '30%' },
  { text: 'Sokin ishlash', x: '70%', y: '25%' },
  { text: 'Oson xizmat ko\'rsatish', x: '15%', y: '60%' },
  { text: 'Premium materiallar', x: '75%', y: '70%' },
];

export const Lifestyle = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(bgRef.current,
        { scale: 1, y: '-10%' },
        {
          scale: 1.1,
          y: '10%',
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
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-fenix-dark flex items-center justify-center">
      
      {/* Background Parallax Image */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-fenix-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-fenix-dark via-transparent to-fenix-dark"></div>
      </div>

      <div className="relative z-10 text-center px-6 mt-[-20%]">
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
            <div className="glass-panel px-4 py-2 rounded-full text-white/90 text-sm md:text-base font-medium shadow-xl">
              {label.text}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
