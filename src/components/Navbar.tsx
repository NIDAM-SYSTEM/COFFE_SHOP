import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { CoffeeLogo } from './CoffeeLogo';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onCartClick,
  onSearchClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '#home', isRoute: false },
    { label: 'SHOP', href: '/shop', isRoute: true },
    { label: 'STARTER KITS', href: '/starter-kits', isRoute: true },
    { label: 'MICRO-LOT', href: '/shop/salvador-san-alberto', isRoute: true },
    { label: 'WHOLESALE / B2B', href: '/wholesale', isRoute: true },
    { label: 'SUIVI', href: '/order-tracking', isRoute: true },
    { label: 'CONTACT', href: '/contact', isRoute: true },
  ];

  // Synchronize active navigation indicator with route or hash
  useEffect(() => {
    if (location.pathname === '/roastery-freshness') {
      setActiveNav('');
    } else if (location.pathname === '/wholesale') {
      setActiveNav('WHOLESALE / B2B');
    } else if (location.pathname === '/starter-kits') {
      setActiveNav('STARTER KITS');
    } else if (location.pathname === '/shop/salvador-san-alberto') {
      setActiveNav('MICRO-LOT');
    } else if (location.pathname.startsWith('/shop')) {
      setActiveNav('SHOP');
    } else if (location.pathname === '/order-tracking') {
      setActiveNav('SUIVI');
    } else if (location.pathname === '/contact') {
      setActiveNav('CONTACT');
    } else if (location.hash) {
      const matched = navItems.find((item) => item.href === location.hash);
      if (matched) setActiveNav(matched.label);
    } else if (location.pathname === '/') {
      setActiveNav('HOME');
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string; isRoute: boolean }
  ) => {
    setActiveNav(item.label);
    setMobileMenuOpen(false);

    if (item.isRoute) {
      // Direct client-side route transition
      return;
    }

    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${item.href}`);
      setTimeout(() => {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    <header className="sticky top-0 z-50 w-full h-[76px] sm:h-[80px] bg-[#555555] transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo from Screenshot */}
        <Link
          to="/"
          onClick={() => {
            setActiveNav('HOME');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group focus:outline-none"
          aria-label="Coffee Shop Home"
        >
          <CoffeeLogo className="h-16 w-auto" />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            const linkId = `nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-1 text-xs lg:text-sm font-medium tracking-wider lg:tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[#EFAE54] font-semibold'
                    : 'text-white hover:text-[#EFAE54]'
                }`}
                id={linkId}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EFAE54] rounded-full" />
                )}
              </Link>
            ) : (
              <a
                key={item.label}
                href={location.pathname === '/' ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-1 text-xs lg:text-sm font-medium tracking-wider lg:tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[#EFAE54] font-semibold'
                    : 'text-white hover:text-[#EFAE54]'
                }`}
                id={linkId}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EFAE54] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Minimal utility icons */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            type="button"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label="Search"
            id="search-toggle-btn"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>

          {/* Shopping Bag Icon with Golden Badge */}
          <button
            onClick={onCartClick}
            type="button"
            className="relative p-1.5 text-white/90 hover:text-white transition-transform hover:scale-105 focus:outline-none"
            aria-label={`Shopping cart with ${cartCount} items`}
            id="cart-toggle-btn"
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#EFAE54] text-[#121421] text-[10px] font-extrabold flex items-center justify-center leading-none shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center focus:outline-none"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#555555] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          {navItems.map((item) => {
            const mobileLinkId = `mobile-nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            return item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium tracking-widest uppercase transition-colors ${
                  activeNav === item.label
                    ? 'bg-white/10 text-[#EFAE54]'
                    : 'text-white hover:text-[#EFAE54]'
                }`}
                id={mobileLinkId}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={location.pathname === '/' ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium tracking-widest uppercase transition-colors ${
                  activeNav === item.label
                    ? 'bg-white/10 text-[#EFAE54]'
                    : 'text-white hover:text-[#EFAE54]'
                }`}
                id={mobileLinkId}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
