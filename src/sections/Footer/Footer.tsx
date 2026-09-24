export const Footer = () => {
  return (
    <footer id="contact" className="bg-fenix-dark border-t border-white/5 pt-20 pb-10 px-6 md:px-12 text-white/80">
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-4">FENIX</h3>
            <p className="text-sm text-white/50 max-w-xs">
              Sof suv tizimlari. Kelajak uchun mo'ljallangan ilg'or texnologiyalar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Kompaniya</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#products" className="hover:text-fenix-cyan transition-colors">Mahsulotlar</a></li>
              <li><a href="#technology" className="hover:text-fenix-cyan transition-colors">Texnologiya</a></li>
              <li><a href="#why-fenix" className="hover:text-fenix-cyan transition-colors">Nima uchun Fenix</a></li>
              <li><a href="#reviews" className="hover:text-fenix-cyan transition-colors">Sharhlar</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Aloqa</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="tel:+998773487100" className="hover:text-fenix-cyan transition-colors">+998 77 348 71 00</a></li>
              <li><a href="tel:+998778404200" className="hover:text-fenix-cyan transition-colors">+998 77 840 42 00</a></li>
              <li className="text-white/50">Farg'ona sh.,<br/>Farg'ona tumani</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-wider uppercase">Ijtimoiy Tarmoqlar</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-fenix-cyan transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-fenix-cyan transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-fenix-cyan transition-colors">Facebook</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2026 Company Fenix. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
