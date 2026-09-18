import React, { useState, useMemo } from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { POPULAR_MENU_ITEMS } from '../data/coffeeHouseData';
import { MenuCategory, MenuItem } from '../types/coffeeHouse';

interface PopularMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: MenuCategory[] = ['Coffee', 'Tea', 'Cookies', 'Coffee Machines'];

export const PopularMenu: React.FC<PopularMenuProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<MenuCategory>('Coffee');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const displayedItems = useMemo(() => {
    return POPULAR_MENU_ITEMS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section 
      id="menu" 
      className="w-full bg-[#FFFFFF] text-[#121421] py-16 sm:py-24"
      aria-labelledby="menu-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <span className="text-[#EFAE54] text-xs uppercase font-bold tracking-widest">
              Finest Selection
            </span>
            <h2 id="menu-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#121421] mt-2">
              Popular Menu
            </h2>
          </div>

          {/* Horizontal Filter Tabs */}
          <div 
            className="flex items-center flex-wrap gap-2 sm:gap-3"
            role="tablist"
            aria-label="Menu Categories"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(cat)}
                  type="button"
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] ${
                    isActive
                      ? 'bg-[#EFAE54] text-[#121421] shadow-md scale-105'
                      : 'bg-gray-100 text-[#7A7D8A] hover:bg-gray-200 hover:text-[#121421]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right-aligned link (Desktop) */}
          <a
            href="#full-menu"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-bold text-[#121421] hover:text-[#EFAE54] transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54] rounded-md p-1"
          >
            <span>View All Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Responsive Product Cards Grid */}
        {/* The key on this div forces a re-render for smooth CSS entry animations when tabs change */}
        <div 
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
          aria-live="polite"
        >
          {displayedItems.map((item) => {
            const isAdded = !!addedItemIds[item.id];
            
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-default"
              >
                {/* Visual Area */}
                <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-2xl mb-5 bg-[#FAFAFA]">
                  {/* Pastel Accent Circle */}
                  <div
                    className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full transition-transform duration-500 ease-out group-hover:scale-110 opacity-85"
                    style={{ backgroundColor: item.pastelColor }}
                    aria-hidden="true"
                  />

                  {/* Centered Product Image */}
                  <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-display text-lg font-bold text-[#121421] group-hover:text-[#DE9839] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#7A7D8A] mt-1.5 line-clamp-2 leading-relaxed flex-grow">
                    {item.sub}
                  </p>

                  {/* Price & Action Row */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <span className="font-display text-xl font-extrabold text-[#121421]">
                      ${item.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`h-10 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        isAdded
                          ? 'bg-emerald-500 text-white scale-105 shadow-emerald-500/30 shadow-lg focus-visible:ring-emerald-500'
                          : 'bg-[#121421] text-white hover:bg-[#EFAE54] hover:text-[#121421] shadow-sm hover:shadow-md focus-visible:ring-[#121421]'
                      }`}
                      aria-label={isAdded ? `Added ${item.name} to cart` : `Add ${item.name} to cart`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" strokeWidth={3} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                          <span>Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-10 text-center lg:hidden">
          <a
            href="#full-menu"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-50 text-sm font-bold text-[#121421] hover:bg-gray-100 hover:text-[#EFAE54] transition-all"
          >
            <span>View All Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
      </div>
    </section>
  );
};