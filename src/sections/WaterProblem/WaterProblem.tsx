import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LABELS = [
  { text: 'Xlor qoldiqlari',   side: 'left',  top: '22%' },
  { text: 'Og\'ir metallar',   side: 'right', top: '32%' },
  { text: 'Mikroorganizmlar',  side: 'left',  top: '52%' },
  { text: 'Cho\'kindilar',     side: 'right', top: '62%' },
];

export const WaterProblem = () => {
  const containerRef = useRef<HTMLElement>(null);
  const dropletRef   = useRef<HTMLDivElement>(null);
  const text1Ref     = useRef<HTMLHeadingElement>(null);
  const text2Ref     = useRef<HTMLHeadingElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const labelsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        }
      });

      gsap.set(text2Ref.current, { opacity: 0, y: 50 });
      gsap.set(particlesContainerRef.current, { opacity: 0, scale: 0.5 });
      if (labelsRef.current) {
        gsap.set(Array.from(labelsRef.current.children), { opacity: 0, x: -10 });
      }

      tl.to(text1Ref.current,  { opacity: 0, y: -50, duration: 1 })
        .to(dropletRef.current, { scale: 3, duration: 2 }, '<')
        .to(text2Ref.current,   { opacity: 1, y: 0,  duration: 1 }, '-=1')
        .to(dropletRef.current, { rotation: 45, duration: 2 }, '-=0.5')
        .to(particlesContainerRef.current, { opacity: 1, scale: 1, duration: 1 }, '-=1.5')
        .to(labelsRef.current ? Array.from(labelsRef.current.children) : [], { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 }, '-=1')
        .to(dropletRef.current, { scale: 10, opacity: 0, duration: 1.5 })
        .to(text2Ref.current,   { opacity: 0, y: -50, duration: 1 }, '<')
        .to(labelsRef.current ? Array.from(labelsRef.current.children) : [], { opacity: 0, duration: 0.5 }, '<');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-fenix-dark"
    >
      {/* Text overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6">
        <h2
          ref={text1Ref}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-center max-w-4xl text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          Siz har doim ham suvingizda nima borligini ko'ra olmaysiz.
        </h2>
        <h2
          ref={text2Ref}
          className="absolute text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-center text-fenix-cyan drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          Ammo tanangiz buni biladi.
        </h2>
      </div>

      {/* Droplet */}
      <div
        ref={dropletRef}
        className="relative w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center z-10
          rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]
          border border-white/10
          shadow-[inset_10px_20px_30px_rgba(255,255,255,0.15),_10px_20px_30px_rgba(0,0,0,0.5)]
          backdrop-blur-sm
          animate-[morph_8s_ease-in-out_infinite]
          before:absolute before:inset-2 before:rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]
          before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none"
      >
        {/* Particles */}
        <div ref={particlesContainerRef} className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-1/4  left-1/4  w-3 h-3 bg-green-300/50  rounded-full blur-[1px]" />
          <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-400/60 rounded-sm rotate-45 blur-[1px]" />
          <div className="absolute top-1/2  left-1/3  w-2 h-6 bg-purple-400/50 rounded-full blur-[1px] rotate-[30deg]" />
          <div className="absolute bottom-1/4 left-1/2  w-2 h-2 bg-yellow-600/70 rounded-full blur-[0.5px]" />
        </div>
      </div>

      {/* Labels — Apple-style annotation lines */}
      <div
        ref={labelsRef}
        className="absolute inset-0 pointer-events-none z-20"
      >
        {LABELS.map((label, i) => (
          <div
            key={i}
            className={`absolute flex items-center gap-0 ${label.side === 'right' ? 'flex-row-reverse right-[6%] md:right-[10%]' : 'left-[6%] md:left-[10%]'}`}
            style={{ top: label.top }}
          >
            {/* Label pill */}
            <div className="text-[11px] md:text-sm font-medium text-white/90 bg-fenix-deep-blue/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-fenix-cyan/30 whitespace-nowrap shadow-lg">
              {label.text}
            </div>
            {/* Connecting line */}
            <div className={`h-px w-8 md:w-16 bg-gradient-to-r ${label.side === 'right' ? 'from-transparent to-fenix-cyan/50' : 'from-fenix-cyan/50 to-transparent'}`} />
            {/* Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-fenix-cyan/70 flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};
