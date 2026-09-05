import { useState, useCallback } from 'react';
import { ShoppingBag, Search, Menu, X, MapPin } from 'lucide-react';

interface NavigationProps {
  cartCount: number;
  onCartOpen: () => void;
  onFinderOpen: () => void;
  onSearchOpen?: () => void;
}

export function Navigation({ cartCount, onCartOpen, onFinderOpen, onSearchOpen }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Menu', href: '#menu' },
    { label: 'Starter Kits', href: '#bundles' },
    { label: 'Facility & Wholesale', href: '#wholesale' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1A1C23]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="container-outer h-[76px] flex items-center justify-between gap-6">

        {/* Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 select-none group"
          aria-label="NIDAM Roastery — Retour à l'accueil"
        >
          <div className="w-8 h-8 rounded-full bg-[#E89038]/15 border border-[#E89038]/40 flex items-center justify-center text-[#E89038] font-serif font-bold text-base transition-transform group-hover:scale-105">
            N
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-xl tracking-tight text-white flex items-baseline">
              NIDAM<span className="text-[#E89038] text-xl leading-none">.</span>
            </span>
            <span className="text-[10px] font-sans font-medium text-[#A1A1AA] tracking-[0.25em] uppercase mt-0.5">
              ROASTERY
            </span>
          </div>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#A1A1AA] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onFinderOpen}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#E89038] bg-[#E89038]/10 hover:bg-[#E89038]/20 border border-[#E89038]/30 transition-all duration-200 ml-1"
          >
            Taste Assistant ⚡
          </button>
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Morocco 48h SLA Badge */}
          <div
            className="hidden lg:flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-3.5 py-1.5"
            aria-label="Livraison 48h au Maroc, Paiement à la livraison"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] pulse-ring-green inline-block" aria-hidden="true" />
            <span className="font-mono text-[11px] text-[#A1A1AA]">Casablanca ➔ Maroc 48h</span>
            <MapPin size={11} strokeWidth={2} className="text-[#E89038]" />
          </div>

          {/* Search Icon Trigger */}
          <a
            href="#menu"
            onClick={onSearchOpen}
            className="p-2.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E89038]"
            aria-label="Rechercher un café ou filtrer le menu"
          >
            <Search size={19} strokeWidth={1.75} />
          </a>

          {/* Shopping Bag Icon with Amber Notification Dot */}
          <button
            type="button"
            onClick={onCartOpen}
            className="relative p-2.5 rounded-full text-white bg-white/[0.06] hover:bg-[#E89038] hover:text-[#121316] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E89038]"
            aria-label={`Panier — ${cartCount} article${cartCount !== 1 ? 's' : ''}`}
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#E89038] text-[#121316] text-[10px] font-bold font-mono pop-in shadow-amber-glow"
                aria-hidden="true"
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E89038]"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/10 bg-[#1A1C23] px-4 py-5 animate-fade-in"
          aria-label="Menu mobile"
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-4 rounded-xl text-white hover:bg-white/[0.08] font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onFinderOpen();
              }}
              className="mt-2 py-3 px-4 rounded-xl text-[#121316] bg-[#E89038] font-semibold text-sm transition-colors text-center"
            >
              Taste Assistant (30s)
            </button>
            <div className="pt-4 mt-2 border-t border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] pulse-ring-green" aria-hidden="true" />
              <span className="font-mono text-xs text-[#A1A1AA]">Livraison 48h express au Maroc · COD</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
