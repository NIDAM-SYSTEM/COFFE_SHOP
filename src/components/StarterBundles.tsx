import { useCallback, useState } from 'react';
import { Check, Package, Sparkles, ArrowRight } from 'lucide-react';
import { STARTER_BUNDLES, PRODUCTS } from '../data/catalog';
import type { CoffeeProduct, GrindOption } from '../types';

interface StarterBundlesProps {
  onAddToCart: (product: CoffeeProduct, grind: GrindOption) => void;
}

export function StarterBundles({ onAddToCart }: StarterBundlesProps) {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = useCallback(
    (bundleId: string, coffeeId: string, grind: GrindOption) => {
      const product = PRODUCTS.find((p) => p.id === coffeeId);
      if (!product) return;
      onAddToCart(product, grind);
      setAddedIds((prev) => new Set(prev).add(bundleId));
      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(bundleId);
          return next;
        });
      }, 2000);
    },
    [onAddToCart]
  );

  return (
    <section
      id="bundles"
      aria-labelledby="bundles-heading"
      className="relative bg-[#1A1C23] text-white py-16 sm:py-24"
    >
      <div className="container-outer relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E89038]/10 border border-[#E89038]/30 mb-3">
            <Sparkles size={14} className="text-[#E89038]" />
            <span className="font-mono text-xs text-[#E89038] uppercase tracking-wider font-semibold">
              Pour Débuter Sans Erreur
            </span>
          </div>
          <h2
            id="bundles-heading"
            className="display-font text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3"
          >
            <span className="font-serif">KIts</span> Starter Clé-en-Main
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Tout le nécessaire pour préparer votre première tasse de spécialité chez vous : machine, café fraîchement torréfié au bon calibre, et guide de recette infaillible.
          </p>
        </div>

        {/* Visual Spotlight + 2 Bundle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Featured Visual Banner with Moka Pot (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden relative shadow-dark-card border border-white/10 group min-h-[340px] flex flex-col justify-end p-6">
            <img
              src="/images/moka_pot_craft.jpg"
              alt="Moka Pot préparant un café riche avec crema"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent" />

            <div className="relative z-10">
              <span className="font-mono text-[10px] text-[#E89038] uppercase tracking-wider font-bold bg-black/60 px-2 py-0.5 rounded">
                Rituel Matin
              </span>
              <h3 className="display-font font-bold text-xl text-white mt-1.5 mb-1">
                La Moka Parfaite
              </h3>
              <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                Fini l'amertume et le goût de brûlé. Notre mouture Moka NIDAM préserve toute la rondeur chocolatée.
              </p>
            </div>
          </div>

          {/* Right: 2 Starter Bundle Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {STARTER_BUNDLES.map((bundle) => {
              const isAdded = addedIds.has(bundle.id);
              return (
                <article
                  key={bundle.id}
                  className="card-dark bg-[#2A2D34]/80 hover:bg-[#2A2D34] p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
                  aria-label={`Bundle: ${bundle.name}`}
                >
                  {/* Subtle top accent band */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E89038] to-amber-200"
                    aria-hidden="true"
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="w-11 h-11 rounded-xl bg-[#E89038]/15 border border-[#E89038]/30 flex items-center justify-center mb-3 text-[#E89038]">
                          <Package size={20} strokeWidth={2} />
                        </div>
                        <h3 className="display-font font-bold text-xl text-white group-hover:text-[#E89038] transition-colors">
                          {bundle.name}
                        </h3>
                        <p className="font-sans text-xs text-[#A1A1AA] mt-0.5">{bundle.subtitle}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-mono text-xs text-zinc-500 line-through">
                          {bundle.originalPrice} MAD
                        </p>
                        <p className="display-font font-bold text-2xl text-white">
                          {bundle.price}{' '}
                          <span className="font-mono text-xs font-normal text-[#E89038]">MAD</span>
                        </p>
                        <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#2D6A4F]/20 font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5">
                          -{bundle.originalPrice - bundle.price} MAD
                        </span>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="font-sans text-xs text-zinc-300 italic mb-5 pl-3 border-l-2 border-[#E89038]">
                      "{bundle.tagline}"
                    </p>

                    {/* Contents checklist */}
                    <div className="space-y-2.5 mb-6">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        Inclus dans ce pack :
                      </p>
                      {bundle.contents.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                          <span className="w-4 h-4 rounded-full bg-[#E89038]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#E89038]">
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Grind specification */}
                    <div className="flex items-center gap-2 mb-6 text-xs">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">Mouture :</span>
                      <span className="font-mono text-[11px] text-[#E89038] bg-[#E89038]/10 border border-[#E89038]/25 px-2.5 py-0.5 rounded-full font-medium">
                        {bundle.grind}
                      </span>
                    </div>
                  </div>

                  {/* Primary Amber CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleAdd(bundle.id, bundle.coffeeId, bundle.grind)}
                    disabled={isAdded}
                    className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E89038] ${
                      isAdded
                        ? 'bg-[#2D6A4F] text-white cursor-default'
                        : 'btn-pill-amber'
                    }`}
                    aria-label={`Commander le ${bundle.name} avec paiement à la livraison`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} strokeWidth={2.5} />
                        Kit ajouté au panier !
                      </>
                    ) : (
                      <>
                        <span>Commander ce kit</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
