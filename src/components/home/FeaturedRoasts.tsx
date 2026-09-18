import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/catalog';
import { ProductCardInline } from '../shop/ProductCardInline';
import type { CoffeeProduct, GrindOption } from '../../types';

interface FeaturedRoastsProps {
  onAddToCartSpecialty?: (product: CoffeeProduct, grind: GrindOption) => void;
}

export const FeaturedRoasts: React.FC<FeaturedRoastsProps> = ({ onAddToCartSpecialty }) => {
  // Flagship coffees to spotlight on the homepage
  const featuredList = PRODUCTS.slice(0, 3);

  return (
    <section 
      id="featured-roasts" 
      className="w-full bg-[#121421] py-16 sm:py-24 border-t border-white/5"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#EFAE54]/10 text-[#EFAE54] border border-[#EFAE54]/20 mb-4">
              <Sparkles size={14} aria-hidden="true" />
              Micro-Lots Fraîchement Torréfiés
            </span>
            <h2 
              id="featured-heading" 
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              Nos Cafés de Spécialité
            </h2>
            <p className="text-sm sm:text-base text-[#A0A5B5] mt-4 leading-relaxed">
              Explorez nos origines d'exception sélectionnées par Nidal. Des profils aromatiques uniques, torréfiés sur mesure pour sublimer chaque grain.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#EFAE54] text-sm font-semibold transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EFAE54]"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 text-[#EFAE54]" />
          </Link>
        </div>

        {/* 3 Featured Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((product) => (
            <ProductCardInline
              key={product.id}
              product={product}
              onAddToCart={onAddToCartSpecialty}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};