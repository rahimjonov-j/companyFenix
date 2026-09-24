import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  { id: 1, x: '35%', y: '40%', title: 'Intellektual displey', desc: 'Suv sifatini doimiy nazorat qiling.' },
  { id: 2, x: '65%', y: '50%', title: 'Keng hajm', desc: 'Toza suv zaxirasi doim tayyor.' },
  { id: 3, x: '73%', y: '65%', title: 'Zanglamas po\'lat', desc: 'Yuqori sifatli va xavfsiz kran.' },
  { id: 4, x: '45%', y: '85%', title: 'Kuchli bosim', desc: 'Har bir tomchida yuqori quvvat.' },
];

export const ProductExperience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { scale: 1.1, y: 100 },
        { 
          scale: 1, 
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-fenix-white py-24 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 z-20 text-center relative mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-fenix-dark mb-4">
          Fenix bilan tanishing.
        </h2>
        <p className="text-lg text-fenix-deep-blue/70 max-w-2xl mx-auto">
          Uyingizda ko'zga tashlanmaydigan qilib yaratilgan. E'tiborsiz qoldirish imkonsiz.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Product Environment Background */}
        <div ref={imageRef} className="absolute inset-0 bg-[url('/filter-hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Hotspots */}
          {HOTSPOTS.map((spot) => (
            <div 
              key={spot.id}
              className="absolute z-30"
              style={{ left: spot.x, top: spot.y }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <div className="relative w-8 h-8 -ml-4 -mt-4 cursor-pointer">
                <div className="absolute inset-0 bg-fenix-cyan rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg border border-gray-200 transition-transform hover:scale-125"></div>
              </div>

              <AnimatePresence>
                {activeHotspot === spot.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-10 w-48 z-40 pointer-events-none"
                  >
                    <div className="glass-panel !bg-white/80 !border-white/50 p-4 rounded-xl shadow-xl">
                      <h4 className="text-fenix-dark font-medium text-sm mb-1">{spot.title}</h4>
                      <p className="text-fenix-deep-blue/70 text-xs leading-relaxed">{spot.desc}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};
