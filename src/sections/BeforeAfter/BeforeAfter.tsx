import { useState, useRef, useEffect, useCallback } from 'react';

export const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleUp, { passive: true });
      window.addEventListener('touchend', handleUp, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="relative py-24 bg-fenix-dark overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 mb-12 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
          Farqni ko'ring.
        </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12">
        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          
          {/* After — Toza suv (CSS gradient, no external image) */}
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at 60% 50%, #0ea5e9 0%, #0369a1 40%, #082f49 100%)' }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)' }}
            />
            <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
              TOZALANGAN SUV
            </div>
            {/* Clear water shimmer */}
            <div className="w-32 h-32 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(101,216,245,0.8) 0%, transparent 70%)' }} />
          </div>

          {/* Before — Iflos suv (CSS gradient) */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              background: 'radial-gradient(ellipse at 40% 50%, #a16207 0%, #78350f 40%, #1c0a00 100%)',
            }}
          >
            {/* Murky particles effect — pure CSS, no external url */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${4 + (i % 4) * 3}px`,
                  height: `${4 + (i % 4) * 3}px`,
                  left: `${(i * 17 + 5) % 90}%`,
                  top: `${(i * 23 + 10) % 80}%`,
                  background: `rgba(${161 + i * 3}, ${107 + i * 2}, ${0}, 0.6)`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
            <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
              ODDIY SUV
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center gap-1">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M2 2L8 8L2 14" />
              </svg>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ transform: 'scaleX(-1)' }}>
                <path d="M2 2L8 8L2 14" />
              </svg>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
