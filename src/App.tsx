import { lazy, Suspense, useEffect } from 'react';
import { SmoothScroll } from './components/Layout/SmoothScroll';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './sections/Hero/Hero';

// Lazy load below-fold sections — saves initial bundle size
const WaterProblem    = lazy(() => import('./sections/WaterProblem/WaterProblem').then(m => ({ default: m.WaterProblem })));
const Technology      = lazy(() => import('./sections/Technology/Technology').then(m => ({ default: m.Technology })));
const ProductExp      = lazy(() => import('./sections/ProductExperience/ProductExperience').then(m => ({ default: m.ProductExperience })));
const Products        = lazy(() => import('./sections/Products/Products').then(m => ({ default: m.Products })));
const BeforeAfter     = lazy(() => import('./sections/BeforeAfter/BeforeAfter').then(m => ({ default: m.BeforeAfter })));
const Lifestyle       = lazy(() => import('./sections/Lifestyle/Lifestyle').then(m => ({ default: m.Lifestyle })));
const WhyFenix        = lazy(() => import('./sections/WhyFenix/WhyFenix').then(m => ({ default: m.WhyFenix })));
const Testimonials    = lazy(() => import('./sections/Testimonials/Testimonials').then(m => ({ default: m.Testimonials })));
const FinalCTA        = lazy(() => import('./sections/FinalCTA/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer          = lazy(() => import('./sections/Footer/Footer').then(m => ({ default: m.Footer })));
const CustomCursor    = lazy(() => import('./components/UI/CustomCursor').then(m => ({ default: m.CustomCursor })));

// Register GSAP plugins globally
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Minimal spinner shown while lazy sections load
const SectionFallback = () => <div className="h-screen bg-fenix-dark" />;

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on window resize with debounce
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <Navigation />
      
      <main className="relative bg-fenix-dark text-fenix-white">
        {/* Hero is NOT lazy — it's the first thing users see */}
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <WaterProblem />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Technology />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProductExp />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Products />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <BeforeAfter />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Lifestyle />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <WhyFenix />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
