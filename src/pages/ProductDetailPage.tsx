import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Coffee,
  RotateCcw,
  Building2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '../data/catalog';
import type { CoffeeProduct, GrindOption } from '../types';
import { ProductHeroSection } from '../components/pdp/ProductHeroSection';
import { DualPersonaTabs } from '../components/pdp/DualPersonaTabs';
import { ProductCardInline } from '../components/shop/ProductCardInline';

export interface ProductDetailPageProps {
  onAddToCartSpecialty?: (product: CoffeeProduct, grind: GrindOption, quantity?: number) => void;
  onOpenCart?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCartSpecialty,
  onOpenCart,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = slug ? getProductBySlug(slug) : undefined;

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle 404 Fallback if coffee is not found
  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#161826] border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#EFAE54] mx-auto mb-4">
            <Coffee size={32} />
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-2">
            Café Introuvable ou Lot Épuisé
          </h1>
          <p className="text-sm text-[#A0A5B5] mb-6 leading-relaxed">
            Le micro-lot demandé n'est plus en stock ou l'adresse URL est incorrecte. Découvrez notre sélection fraîchement torréfiée.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95"
          >
            <RotateCcw size={15} />
            <span>Explorer la Boutique</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related Coffees: 3 other products from the catalog
  const relatedCoffees = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421] pb-20">
      {/* ── Breadcrumb & Top Navigation Bar ── */}
      <div className="border-b border-white/5 bg-[#141624]/60 backdrop-blur-md sticky top-[76px] sm:top-[80px] z-30 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#A0A5B5]">
              <li>
                <Link to="/" className="hover:text-[#EFAE54] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/shop" className="hover:text-[#EFAE54] transition-colors">
                  Boutique
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#EFAE54] font-semibold truncate max-w-[160px] sm:max-w-xs" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-[#A0A5B5] hover:text-[#EFAE54] font-medium transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Tous les cafés</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-col gap-10 sm:gap-14">
        {/* ── 1. Asymmetric Product Hero Section (Gallery + Purchase Engine + WhatsApp COD) ── */}
        <ProductHeroSection
          product={product}
          onAddToCart={(p, size, grind, quantity) => {
            if (onAddToCartSpecialty) {
              onAddToCartSpecialty(p, grind, quantity);
            }
            if (onOpenCart) {
              onOpenCart();
            }
          }}
        />

        {/* ── 2. Dual-Persona Tabs: Nidal (Agronomy) vs Mouna (Home Recipes) ── */}
        <DualPersonaTabs product={product} />

        {/* ── 3. Related Coffees Showcase ── */}
        <section className="flex flex-col gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#EFAE54] uppercase tracking-wider">
                Découvrez d'Autres Origines
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Cafés Similaires Recommandés
              </h3>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#EFAE54] hover:underline self-start sm:self-auto"
            >
              <span>Voir tout le catalogue ({PRODUCTS.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {relatedCoffees.map((relProduct) => (
              <ProductCardInline
                key={relProduct.id}
                product={relProduct}
                onAddToCart={(p, grind) => {
                  if (onAddToCartSpecialty) {
                    onAddToCartSpecialty(p, grind);
                  }
                  if (onOpenCart) {
                    onOpenCart();
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* ── 4. Wholesale / Cafe Partner Banner ── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E2235] via-[#161826] to-[#141624] border border-[#EFAE54]/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFAE54]/15 text-[#EFAE54] text-[11px] font-mono font-medium mb-2">
              <Building2 size={12} />
              Approvisionnement Coffee Shop & Bureaux
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
              Vous commandez pour un établissement ou plus de 5kg par mois ?
            </h4>
            <p className="text-xs sm:text-sm text-[#A0A5B5] mt-2 leading-relaxed">
              Consultez nos grilles tarifaires de gros et bénéficiez de l'assistance de Nidal pour la calibration de votre matériel.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-xs sm:text-sm shadow-lg transition-all shrink-0 active:scale-95"
          >
            <span>Contacter notre équipe Pro</span>
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
