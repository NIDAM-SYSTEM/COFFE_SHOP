import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, Droplets, Mountain, Award, Coffee } from 'lucide-react';
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
    <section id="featured-roasts" className="w-full bg-[#121421] py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#EFAE54]/15 text-[#EFAE54] border border-[#EFAE54]/30 mb-3">
              <Sparkles size={13} />
              Micro-Lots Fraîchement Torréfiés
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Nos Cafés de Spécialité à l'Affiche
            </h2>
            <p className="text-sm sm:text-base text-[#A0A5B5] max-w-xl mt-3 leading-relaxed">
              Explorez nos origines d'exception sélectionnées par Nidal. Cliquez sur chaque café pour découvrir sa fiche complète, ses données agronomiques et sa recette d'extraction maison.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white hover:text-[#EFAE54] text-sm font-semibold transition-all self-start md:self-auto group"
          >
            <span>Explorer tout le catalogue ({PRODUCTS.length} micro-lots)</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 text-[#EFAE54]" />
          </Link>
        </div>

        {/* Quick PDP Direct Jump Links Bar */}
        <div className="py-4 px-5 my-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#EFAE54] font-semibold">Accès direct aux Fiches Produits (PDP) :</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {featuredList.map((p) => (
              <Link
                key={p.id}
                to={`/shop/${p.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#161826] hover:bg-[#EFAE54] text-white hover:text-[#121421] border border-white/15 hover:border-[#EFAE54] transition-all shadow-sm"
              >
                <span>{p.name}</span>
                <span className="text-[10px] opacity-70">({p.price} MAD)</span>
                <ArrowRight size={11} />
              </Link>
            ))}
          </div>
        </div>

        {/* 3 Featured Product Cards Grid with direct PDP click & Cart wiring */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredList.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCardInline
                product={product}
                onAddToCart={onAddToCartSpecialty}
              />
              <Link
                to={`/shop/${product.slug}`}
                className="mt-3 text-center py-2 px-4 rounded-xl text-xs font-mono text-[#EFAE54] hover:text-white bg-[#EFAE54]/10 hover:bg-[#EFAE54]/20 border border-[#EFAE54]/20 transition-all flex items-center justify-center gap-1.5 group"
              >
                <span>Voir la Fiche Détaillée & Données Agronomiques</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
