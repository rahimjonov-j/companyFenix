import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation timeline
    const tl = gsap.timeline();

    tl.set([headlineRef.current, sublineRef.current, ctaRef.current], {
      y: 30,
      opacity: 0,
    })
    .set(productRef.current, { y: 100, opacity: 0 })
    .set(particlesRef.current, { opacity: 0 });

    tl.to(containerRef.current, { duration: 0.5, opacity: 1 })
      .to(particlesRef.current, { duration: 1, opacity: 1 }, "-=0.2")
      .to(productRef.current, { duration: 1.5, y: 0, opacity: 1, ease: "power3.out" }, "-=0.8")
      .to(headlineRef.current, { duration: 1, y: 0, opacity: 1, ease: "power2.out" }, "-=1")
      .to(sublineRef.current, { duration: 0.8, y: 0, opacity: 1, ease: "power2.out" }, "-=0.8")
      .to(ctaRef.current, { duration: 0.8, y: 0, opacity: 1, ease: "power2.out" }, "-=0.6");

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Desktop only
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(productRef.current, {
        x: xPos * 20,
        y: yPos * 20,
        rotationY: xPos * 5,
        rotationX: -yPos * 5,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(particlesRef.current, {
        x: xPos * -30,
        y: yPos * -30,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fenix-dark opacity-0"
    >
      {/* Background Water Environment */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fenix-deep-blue/40 via-fenix-dark to-fenix-dark" />
        {/* Placeholder for particles */}
        <div ref={particlesRef} className="absolute inset-0 opacity-0 mix-blend-screen">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        </div>
      </div>

      <div className="container relative z-10 px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-24">
        
        {/* Text Content */}
        <div className="flex flex-col justify-center max-w-2xl">
          <h1 
            ref={headlineRef}
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.1]"
          >
            Sof suv.<br />
            <span className="text-fenix-cyan">Sof hayot.</span>
          </h1>
          
          <div ref={sublineRef} className="mb-10">
            <p className="text-lg md:text-xl text-fenix-ice/80 max-w-md font-light leading-relaxed">
              Har bir tomchi uchun zamonaviy tozalash texnologiyasi. Hamma narsa bitta qurilmada.
            </p>
          </div>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+998773487100"
              data-cursor="CLICK"
              className="px-8 py-4 bg-white text-fenix-dark font-medium rounded-full hover:bg-fenix-ice transition-colors flex items-center justify-center"
            >
              Fenix'ni kashf etish <span className="ml-2">→</span>
            </a>
            <a 
              href="tel:+998778404200"
              data-cursor="CLICK"
              className="px-8 py-4 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center justify-center"
            >
              Maslahat olish
            </a>
          </div>
        </div>

        {/* Product Visual */}
        <div className="relative h-[400px] md:h-[50vh] lg:h-[80vh] flex items-center justify-center perspective-[1000px] mt-10 lg:mt-0">
          <div 
            ref={productRef} 
            className="relative h-full max-h-[80%] aspect-[3/4] md:aspect-square transform-style-3d mx-auto"
          >
            <img 
              src="/filter-hero.webp" 
              alt="Fenix Water Purifier" 
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover mix-blend-screen drop-shadow-[0_20px_40px_rgba(101,216,245,0.2)]"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
                willChange: 'transform',
              }}
            />
            
            {/* Soft Reflection */}
            <div className="absolute -bottom-10 left-4 right-4 h-10 bg-fenix-cyan/20 blur-2xl rounded-full"></div>
          </div>
        </div>

      </div>
    </section>
  );
};
