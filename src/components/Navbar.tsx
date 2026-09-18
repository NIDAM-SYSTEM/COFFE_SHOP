import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { CoffeeLogo } from './CoffeeLogo';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', href: '#home', isRoute: false },
  { label: 'SHOP', href: '/shop', isRoute: true },
  { label: 'STARTER KITS', href: '/starter-kits', isRoute: true },
  { label: 'MICRO-LOT', href: '/shop/salvador-san-alberto', isRoute: true },
  { label: 'WHOLESALE / B2B', href: '/wholesale', isRoute: true },
  { label: 'SUIVI', href: '/order-tracking', isRoute: true },
  { label: 'CONTACT', href: '/contact', isRoute: true },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onCartClick,
  onSearchClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronize active navigation indicator with route or hash dynamically
  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (currentPath === '/') {
      if (currentHash) {
        const matched = NAV_ITEMS.find((item) => item.href === currentHash);
        setActiveNav(matched?.label || 'HOME');
      } else {
        setActiveNav('HOME');
      }
      return;
    }

    // Match exact routes first, then fall back to partial matches (e.g., /shop/item -> SHOP)
    const exactMatch = NAV_ITEMS.find(item => item.isRoute && item.href === currentPath);
    if (exactMatch) {
      setActiveNav(exactMatch.label);
    } else if (currentPath.startsWith('/shop')) {
      setActiveNav('SHOP');
    } else {
      setActiveNav('');
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string; isRoute: boolean }
  ) => {
    setActiveNav(item.label);
    setMobileMenuOpen(false);

    if (item.isRoute) return; // Let React Router handle it natively

    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${item.href}`);
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', item.href);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[76px] sm:h-[80px] bg-[#525252]/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link
          to="/"
          onClick={() => {
            setActiveNav('HOME');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] rounded-lg"
          aria-label="Coffee Shop Home"
        >
          <CoffeeLogo className="h-14 sm:h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.label;
            const linkId = `nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            
            const LinkComponent = item.isRoute ? Link : 'a';
            const linkProps = item.isRoute 
              ? { to: item.href } 
              : { href: location.pathname === '/' ? item.href : `/${item.href}` };

            return (
              <LinkComponent
                key={item.label}
                {...linkProps}
                onClick={(e: any) => handleNavClick(e, item)}
                className={`relative py-2 text-xs lg:text-sm font-medium tracking-wider lg:tracking-widest uppercase transition-colors duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] rounded-sm ${
                  isActive
                    ? 'text-[#EFAE54] font-semibold'
                    : 'text-white/80 hover:text-[#EFAE54]'
                }`}
                id={linkId}
              >
                {item.label}
                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EFAE54] rounded-full shadow-[0_0_8px_rgba(239,174,84,0.6)]" />
                )}
              </LinkComponent>
            );
          })}
        </nav>

        {/* Right: Minimal utility icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            type="button"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/90 hover:text-[#EFAE54] flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54]"
            aria-label="Open Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
          </button>

          {/* Shopping Bag Icon with Golden Badge */}
          <button
            onClick={onCartClick}
            type="button"
            className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/90 hover:text-[#EFAE54] flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54]"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EFAE54] text-[#121421] text-[10px] font-extrabold flex items-center justify-center leading-none shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#525252]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100 border-t border-white/5 shadow-2xl' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const mobileLinkId = `mobile-nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            const isActive = activeNav === item.label;
            
            const LinkComponent = item.isRoute ? Link : 'a';
            const linkProps = item.isRoute 
              ? { to: item.href } 
              : { href: location.pathname === '/' ? item.href : `/${item.href}` };

            return (
              <LinkComponent
                key={item.label}
                {...linkProps}
                onClick={(e: any) => handleNavClick(e, item)}
                className={`block px-4 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] ${
                  isActive
                    ? 'bg-[#EFAE54]/10 text-[#EFAE54]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
                id={mobileLinkId}
              >
                {item.label}
              </LinkComponent>
            );
          })}
        </div>
      </div>
    </header>
  );
};