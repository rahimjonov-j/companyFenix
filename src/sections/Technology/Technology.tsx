import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { num: '01', title: 'Cho\'kindi filtri (20 mkr)', desc: 'Yirik zarrachalar, zang va qumni ushlab qoladi.', img: '/stage-1.webp' },
  { num: '02', title: 'Cho\'kindi filtri (5 mkr)', desc: 'Kichikroq zarrachalarni ushlab qoladi.', img: '/stage-2.webp' },
  { num: '03', title: 'Neo Sense (Uglerod)', desc: 'Xlor va organik birikmalarni tozalaydi.', img: '/stage-3.webp' },
  { num: '04', title: 'RO Membrana', desc: 'Teskari osmos orqali 99.9% ifloslanishlarni yo\'qotadi.', img: '/stage-4.webp' },
  { num: '05', title: 'Inno Sense', desc: 'Suvning ta\'mini yaxshilaydi va hidini ketkazadi.', img: '/stage-5.webp' },
  { num: '06', title: 'Mineral Sense', desc: 'Suvni kerakli foydali minerallar bilan boyitadi.', img: '/stage-6.webp' },
];

export const Technology = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const waterFlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stageElements = gsap.utils.toArray('.tech-stage') as HTMLElement[];
      const panels = gsap.utils.toArray('.tech-panel') as HTMLElement[];

      // Set all panels hidden initially
      gsap.set(panels, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%',
          pin: true,
          scrub: 1,
        }
      });

      // Flow water across the screen
      tl.to(waterFlowRef.current, { width: '100%', duration: 6, ease: 'none' }, 0);

      // Each stage gets 1 unit of timeline
      // Stage 0: 0–1, Stage 1: 1–2, Stage 2: 2–3, Stage 3: 3–4
      stageElements.forEach((stage, i) => {
        const start = i;
        const end = i + 1;

        // Activate stage node
        tl.to(stage, { filter: 'brightness(2)', scale: 1.15, duration: 0.3 }, start)
          // Show this panel
          .to(panels[i], { opacity: 1, y: 0, duration: 0.3 }, start)
          // Deactivate stage node
          .to(stage, { filter: 'brightness(1)', scale: 1, duration: 0.3 }, end - 0.3)
          // Hide this panel (except last)
          .to(panels[i], { opacity: 0, y: -15, duration: 0.3 }, end - 0.3);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" ref={containerRef} className="relative h-screen bg-fenix-dark flex flex-col justify-center overflow-hidden">
      
      <div className="absolute top-16 md:top-24 left-0 right-0 px-6 md:px-12 z-20 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-2 md:mb-4">
          His qilish mumkin bo'lgan texnologiya.
        </h2>
        <p className="text-sm md:text-lg text-fenix-ice/60 max-w-2xl mx-auto">
          Har bir tomchi ehtiyotkorlik bilan ishlab chiqilgan tozalash jarayonidan o'tadi.
        </p>
      </div>

      {/* Filter stages row */}
      <div className="relative w-full max-w-7xl mx-auto px-6 z-10 flex items-center justify-between" style={{ marginTop: '0', height: '220px' }}>
        
        {/* Background Pipe / Track */}
        <div className="absolute left-6 right-6 h-2 top-1/2 -translate-y-1/2 bg-white/5 rounded-full overflow-hidden">
          <div ref={waterFlowRef} className="h-full w-0 bg-gradient-to-r from-fenix-dark via-fenix-deep-blue to-fenix-cyan rounded-full shadow-[0_0_15px_theme(colors.fenix-cyan)] relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_theme(colors.fenix-cyan)]"></div>
          </div>
        </div>

        {/* Stages */}
        <div ref={stagesRef} className="relative w-full flex justify-between items-center z-10">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Filter Node */}
              <div className="tech-stage w-12 h-32 md:w-20 md:h-56 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-300 relative overflow-hidden bg-black/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                <img 
                  src={stage.img}
                  alt={stage.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-90 scale-110"
                />
                <span className="absolute z-10 text-white/50 font-bold text-lg md:text-3xl mix-blend-overlay drop-shadow-md">{stage.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single centered info panel area - panels crossfade here */}
      <div className="relative w-full flex justify-center mt-6 md:mt-10 px-6 z-20" style={{ minHeight: '100px' }}>
        {STAGES.map((stage, idx) => (
          <div
            key={idx}
            className="tech-panel absolute w-[280px] md:w-[420px]"
          >
            <div className="p-4 md:p-6 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
              }}
            >
              <span className="text-fenix-cyan text-xs md:text-sm font-medium tracking-widest uppercase mb-2 block">{stage.num}</span>
              <h4 className="text-white font-semibold mb-2 text-base md:text-xl">{stage.title}</h4>
              <p className="text-fenix-ice/70 text-xs md:text-sm leading-relaxed">{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
