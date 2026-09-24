import { motion } from 'framer-motion';

export const Products = () => {
  return (
    <section id="products" className="relative min-h-screen bg-fenix-dark text-white py-24 flex items-center overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fenix-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            Mukammallik standarti.
          </h2>
          <p className="text-lg text-fenix-ice/60 max-w-2xl mx-auto">
            Fenix - bu shunchaki suv filtri emas, bu sizning sog'lig'ingiz va qulayligingiz uchun premium yechim.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto glass-panel rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          {/* Image Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square overflow-hidden perspective-[1000px]">
              <img 
                src="/filter-hero.jpg" 
                alt="Fenix" 
                className="w-full h-full object-cover mix-blend-screen drop-shadow-[0_20px_40px_rgba(101,216,245,0.2)]"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 75%)'
                }}
              />
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-2">FENIX</h3>
            <p className="text-xl text-fenix-cyan mb-8">All-in-One Premium Qurilma</p>
            
            <p className="text-fenix-ice/80 leading-relaxed mb-8">
              Uy va ofis uchun mo'ljallangan ilg'or texnologik qurilma. Barcha kerakli filtrlar va suv zaxirasi bitta zamonaviy korpus ichida joylashgan. Oshxonangiz ko'rkini ochadi va har doim 99.9% toza suv bilan ta'minlaydi.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Smart displey va indikatorlar',
                'Zanglamaydigan po\'latdan premium kran',
                'Oson almashtiriladigan filtrlar',
                'Teskari osmos texnologiyasi'
              ].map((spec, i) => (
                <li key={i} className="flex items-center text-fenix-ice font-medium">
                  <div className="w-2 h-2 rounded-full bg-fenix-cyan mr-4 shadow-[0_0_10px_theme(colors.fenix-cyan)]"></div>
                  {spec}
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-fenix-ice/60 mb-1">Maxsus narx</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">8 700 000 <span className="text-lg font-medium text-fenix-cyan">UZS</span></p>
              </div>
              <a 
                href="tel:+998773487100"
                data-cursor="CLICK"
                className="w-full sm:w-auto px-8 py-4 bg-white text-fenix-dark rounded-full font-medium hover:bg-fenix-ice transition-colors flex items-center justify-center whitespace-nowrap"
              >
                Buyurtma berish <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
