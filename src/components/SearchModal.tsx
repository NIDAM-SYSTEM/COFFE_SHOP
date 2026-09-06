import React, { useState } from 'react';
import { Search, X, ArrowRight, Coffee } from 'lucide-react';
import { POPULAR_MENU_ITEMS } from '../data/coffeeHouseData';
import { MenuItem } from '../types/coffeeHouse';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = query.trim() === ''
    ? POPULAR_MENU_ITEMS.slice(0, 4)
    : POPULAR_MENU_ITEMS.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#121421] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 animate-scale-in">
        {/* Search input header */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-[#EFAE54] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coffee, bakery, beans, private rooms..."
            className="w-full bg-transparent text-white placeholder:text-white/40 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white text-xs px-2 py-1 rounded-full bg-white/5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <div className="text-xs uppercase font-bold text-[#EFAE54] tracking-wider px-2 mb-2">
            {query.trim() === '' ? 'Recommended for Morning' : `Results (${filteredItems.length})`}
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-white/50 text-sm">
              No coffee or dishes matched &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#EFAE54]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#EFAE54] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/50 line-clamp-1">{item.sub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-[#EFAE54]">
                    ${item.price.toFixed(2)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
