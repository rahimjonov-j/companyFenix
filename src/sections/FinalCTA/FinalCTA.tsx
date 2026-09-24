import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setRipplePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-fenix-dark">
      
      {/* Background — deep ocean gradient, no external image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, #0a3d5c 0%, #04182a 50%, #03131D 100%)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-fenix-dark via-fenix-deep-blue/30 to-fenix-dark"></div>
      </div>

      <div className="container relative z-10 px-6 mx-auto text-center flex flex-col items-center">
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white mb-8 leading-tight">
          Sog'likni <span className="text-fenix-cyan">Boylik</span> deb bilganlar <br className="hidden md:block" />
          uchun ishlaymiz!!!
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Primary CTA with Liquid Ripple */}
          <a
            href="tel:+998773487100"
            ref={buttonRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden px-8 py-4 bg-white text-fenix-dark font-medium rounded-full transition-transform active:scale-95 group inline-flex"
          >
            <span className="relative z-10 flex items-center">
              Fenix bilan bog'lanish <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
            
            {/* Liquid Ripple Element */}
            <motion.div
              initial={false}
              animate={{
                scale: isHovering ? 20 : 0,
                opacity: isHovering ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                left: ripplePos.x,
                top: ripplePos.y,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="absolute w-4 h-4 bg-fenix-ice rounded-full z-0 pointer-events-none"
            />
          </a>

          {/* Secondary CTA */}
          <a href="tel:+998778404200" className="px-8 py-4 bg-transparent text-white font-medium rounded-full border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm inline-flex">
            Maslahat olish
          </a>
        </div>

      </div>

    </section>
  );
};
