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
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
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
          
          {/* After (Right / Background) - Clear Water */}
          <div className="absolute inset-0 bg-cyan-900 bg-[url('https://images.unsplash.com/photo-1547926180-87a3f4e24eb3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
             <div className="absolute inset-0 bg-fenix-cyan/20 mix-blend-overlay"></div>
             <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
               TOZALANGAN SUV
             </div>
          </div>

          {/* Before (Left / Foreground) - Cloudy Water */}
          <div 
            className="absolute inset-0 bg-yellow-900/80 bg-[url('https://images.unsplash.com/photo-1547926180-87a3f4e24eb3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center filter sepia-[0.3] brightness-75 contrast-75"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
             {/* Fake particles overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40 mix-blend-overlay"></div>
             <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/10">
               ODDIY SUV
             </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Handle Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            
            {/* Glass distortion effect around handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-64 md:h-96 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-md"></div>
          </div>

        </div>
      </div>

    </section>
  );
};
