import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '99.9', suffix: '%', label: 'Tozalash samaradorligi' },
  { value: '4', suffix: '+', label: 'Tozalash bosqichlari' },
  { value: '24', suffix: '/7', label: 'Toza suv' },
  { value: '10', suffix: '+', label: 'Yillik texnologiya rivoji' },
];

export const WhyFenix = () => {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const statElements = gsap.utils.toArray('.stat-value') as HTMLElement[];
      
      statElements.forEach((el, index) => {
        const endValue = parseFloat(STATS[index].value);
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: endValue,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            once: true,
          },
          onUpdate: () => {
            if (STATS[index].value.includes('.')) {
              el.innerText = obj.val.toFixed(1);
            } else {
              el.innerText = Math.round(obj.val).toString();
            }
          }
        });
      });

      // Fade up stats container
      gsap.fromTo(statsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            once: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-fenix" ref={containerRef} className="relative py-32 bg-fenix-dark text-white overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fenix-deep-blue/20 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-6 md:px-12 z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-20 max-w-4xl text-balance leading-tight">
          Suv - bu siz hech qachon <span className="text-fenix-cyan">tashvishlanmasligingiz</span> kerak bo'lgan narsa.
        </h2>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-7xl font-medium tracking-tighter mb-4 text-white flex items-baseline">
                <span className="stat-value">0</span>
                <span className="text-3xl md:text-5xl text-fenix-cyan ml-1">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-fenix-ice/70 max-w-[150px] leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};
