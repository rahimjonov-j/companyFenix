import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aziz R.',
    location: 'Toshkent',
    review: 'Fenix o\'rnatilgandan so\'ng, oilamiz suvning qanday bo\'lishi kerakligini tushundi. Choy va qahvaning ta\'mi butunlay o\'zgardi.',
    rating: 5,
    x: '10%',
    y: '20%',
    depth: 1.2
  },
  {
    id: 2,
    name: 'Malika T.',
    location: 'Samarqand',
    review: 'Dizayni shunchaki ajoyib. Oshxonada ko\'rinmaydi, lekin har doim mukammal toza suv bilan ta\'minlaydi.',
    rating: 5,
    x: '55%',
    y: '10%',
    depth: 0.8
  },
  {
    id: 3,
    name: 'Rustam I.',
    location: 'Buxoro',
    review: 'Bolalar uchun xavfsiz va toza suv. Eng yaxshi sarmoya. O\'rnatish va xizmat ko\'rsatish juda oson.',
    rating: 5,
    x: '25%',
    y: '60%',
    depth: 1.5
  },
  {
    id: 4,
    name: 'Nilufar M.',
    location: 'Toshkent',
    review: 'Endi uyda plastik idishlar yo\'q. Tabiatga ham foyda, o\'zimizga ham. Fenix - bu kelajak.',
    rating: 5,
    x: '65%',
    y: '50%',
    depth: 1
  }
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section id="reviews" ref={containerRef} className="relative min-h-[120vh] bg-fenix-white text-fenix-dark overflow-hidden py-24">
      
      <div className="container relative z-10 mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-4xl mx-auto text-balance">
          Ichadigan narsasiga e'tibor beradigan insonlar tomonidan ishonilgan.
        </h2>
      </div>

      {/* Desktop Parallax View */}
      <div className="relative w-full h-[800px] max-w-7xl mx-auto hidden md:block">
        {TESTIMONIALS.map((t, i) => {
          const yPos = useTransform(
            scrollYProgress, 
            [0, 1], 
            [0, -200 * t.depth]
          );

          return (
            <motion.div
              key={t.id}
              style={{ left: t.x, top: t.y, y: yPos }}
              className="absolute w-[350px]"
            >
              <div className="glass-panel !bg-white/70 p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] border-white border relative">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="#65D8F5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-fenix-dark/80 text-base mb-6 leading-relaxed">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fenix-ice to-fenix-soft-blue flex items-center justify-center font-medium text-fenix-deep-blue border border-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-fenix-dark">{t.name}</h4>
                    <p className="text-xs text-fenix-deep-blue/60">{t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Stacked View */}
      <div className="flex flex-col gap-6 px-6 max-w-md mx-auto md:hidden relative z-10">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="glass-panel !bg-white/70 p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-white border relative">
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, idx) => (
                <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="#65D8F5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <p className="text-fenix-dark/80 text-sm mb-6 leading-relaxed">
              "{t.review}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fenix-ice to-fenix-soft-blue flex items-center justify-center font-medium text-fenix-deep-blue border border-white">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium text-sm text-fenix-dark">{t.name}</h4>
                <p className="text-xs text-fenix-deep-blue/60">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
