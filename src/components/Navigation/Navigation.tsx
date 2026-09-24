import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const NAV_LINKS = [
  { name: 'Mahsulotlar', href: '#products' },
  { name: 'Texnologiya', href: '#technology' },
  { name: 'Nima uchun Fenix', href: '#why-fenix' },
  { name: 'Sharhlar', href: '#reviews' },
  { name: 'Aloqa', href: '#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isScrolled ? 'pt-4 md:pt-6 px-4 md:px-8' : 'pt-6 md:pt-8 px-6 md:px-12'
        )}
      >
        <div 
          className={cn(
            'mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            isScrolled 
              ? 'max-w-4xl glass-panel rounded-full px-6 py-3' 
              : 'max-w-7xl px-0 py-2'
          )}
        >
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tight text-white z-50 flex items-center gap-3">
            <img src="/fenix-logo.jpg" alt="Fenix Logo" className="w-10 h-10 rounded-full object-cover border border-white/10" />
            FENIX
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                data-cursor="GO"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-fenix-dark/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-medium text-white tracking-tight"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
