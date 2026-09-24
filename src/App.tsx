import { useEffect } from 'react';
import { SmoothScroll } from './components/Layout/SmoothScroll';
import { CustomCursor } from './components/UI/CustomCursor';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './sections/Hero/Hero';
import { WaterProblem } from './sections/WaterProblem/WaterProblem';
import { Technology } from './sections/Technology/Technology';
import { ProductExperience } from './sections/ProductExperience/ProductExperience';
import { Products } from './sections/Products/Products';
import { BeforeAfter } from './sections/BeforeAfter/BeforeAfter';
import { Lifestyle } from './sections/Lifestyle/Lifestyle';
import { WhyFenix } from './sections/WhyFenix/WhyFenix';
import { Testimonials } from './sections/Testimonials/Testimonials';
import { FinalCTA } from './sections/FinalCTA/FinalCTA';
import { Footer } from './sections/Footer/Footer';

// Register GSAP plugins globally if needed
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Setup global smooth scrolling refresh for ScrollTrigger
  useEffect(() => {
    // ScrollTrigger.refresh() when needed
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main className="relative bg-fenix-dark text-fenix-white">
        <Hero />
        <WaterProblem />
        <Technology />
        <ProductExperience />
        <Products />
        <BeforeAfter />
        <Lifestyle />
        <WhyFenix />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

export default App;
