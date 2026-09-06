import { useState, useCallback } from 'react';
import { ShoppingBag, Check, Mountain, Droplets } from 'lucide-react';
import type { CoffeeProduct, GrindOption } from '../types';

const GRINDS: GrindOption[] = ['Whole Bean', 'Espresso', 'Moka Pot (Fine)', 'V60 / Filter', 'French Press (Coarse)'];

const GRIND_LABELS: Record<GrindOption, string> = {
  'Whole Bean': 'Grains',
  'Espresso': 'Espresso',
  'Moka Pot (Fine)': 'Moka',
  'V60 / Filter': 'V60',
  'French Press (Coarse)': 'Piston',
};

const ROAST_COLORS: Record<string, string> = {
  'Light': 'bg-amber-100 text-amber-800',
  'Medium-Light': 'bg-orange-100 text-orange-800',
  'Medium': 'bg-orange-200 text-orange-900',
  'Medium-Dark': 'bg-stone-300 text-stone-900',
};

interface ProductCardProps {
  product: CoffeeProduct;
  onAddToCart: (product: CoffeeProduct, grind: GrindOption) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Moka Pot (Fine)');
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAdd = useCallback(() => {
    onAddToCart(product, selectedGrind);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1600);
  }, [product, selectedGrind, onAddToCart]);

  return (
    <article
      className="card-base p-4 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      aria-label={`Produit: ${product.name}`}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <span className="tag-fresh flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] pulse-ring" aria-hidden="true" />
          TORRÉFIÉ {product.roastDay}
        </span>
        <span className="tag-origin">{product.origin}</span>
      </div>

      {/* Product visual */}
      <div
        className="h-48 rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${product.color}18, ${product.color}30)` }}
        aria-label={`Sachet de ${product.name}`}
      >
        {/* Bag visual */}
        <div
          className="w-24 h-36 rounded-xl flex flex-col items-center justify-between p-3 shadow-lg relative overflow-hidden"
          style={{ background: `linear-gradient(145deg, ${product.color}dd, ${product.color})` }}
        >
          <div className="w-full h-3 bg-black/20 rounded-t-sm -mt-3" aria-hidden="true" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <span className="font-serif font-bold text-white text-sm">N</span>
            </div>
            <p className="font-serif font-bold text-white text-[10px] leading-tight text-center">
              {product.name.split(' ').slice(0, 2).join('\n')}
            </p>
          </div>
          <p className="font-mono text-[8px] text-white/70">{product.weightGrams}g</p>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 right-2.5 bg-[#1C1613] text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
            {product.badge}
          </div>
        )}
      </div>

      {/* Typography stack */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif font-semibold text-[#1C1613] text-base leading-tight">
              {product.name}
            </h3>
            <p className="font-sans text-xs text-[#9B8E85] mt-0.5">{product.subName}</p>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${ROAST_COLORS[product.roastLevel]}`}>
            {product.roastLevel}
          </span>
        </div>

        {/* Tasting notes */}
        <div className="flex flex-wrap gap-1.5">
          {product.tastingNotes.map((note) => (
            <span key={note} className="tag-note">{note}</span>
          ))}
        </div>

        {/* Plain-language helper */}
        <p className="font-sans text-xs text-[#3D2E26] leading-relaxed bg-[#FAF7F2] rounded-lg px-3 py-2">
          {product.plainProfile}
        </p>

        {/* Spec pills */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <Mountain size={11} strokeWidth={2} className="text-[#B85D2C]" />
            <span className="font-mono text-[10px] text-[#9B8E85]">{product.altitude}</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets size={11} strokeWidth={2} className="text-[#B85D2C]" />
            <span className="font-mono text-[10px] text-[#9B8E85]">{product.process}</span>
          </div>
        </div>
      </div>

      {/* ── Grind Selector ── */}
      <div>
        <p className="font-mono text-[10px] text-[#9B8E85] uppercase tracking-wider mb-2">
          Mouture
        </p>
        <div
          className="grid grid-cols-4 gap-1 bg-[#F0EAE1] p-1 rounded-lg"
          role="radiogroup"
          aria-label="Choisir la mouture"
        >
          {GRINDS.map((grind) => (
            <button
              key={grind}
              type="button"
              role="radio"
              aria-checked={selectedGrind === grind}
              onClick={() => setSelectedGrind(grind)}
              className={`py-1.5 px-1 rounded-md text-[11px] font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#B85D2C] focus:ring-inset text-center leading-tight ${
                selectedGrind === grind
                  ? 'bg-white text-[#1C1613] shadow-sm font-semibold'
                  : 'text-[#9B8E85] hover:text-[#3D2E26]'
              }`}
              title={grind}
            >
              {GRIND_LABELS[grind]}
            </button>
          ))}
        </div>
        <p className="font-sans text-[11px] text-[#9B8E85] mt-1.5 text-center">
          {selectedGrind}
        </p>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-1 mt-auto border-t border-[#E5DED5]">
        <div>
          <p className="font-serif font-bold text-xl text-[#1C1613]">
            {product.price}{' '}
            <span className="font-mono text-xs font-normal text-[#9B8E85]">MAD</span>
          </p>
          <p className="font-mono text-[10px] text-[#9B8E85]">{product.weightGrams}g</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={addedFlash}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B85D2C] focus:ring-offset-1 ${
            addedFlash
              ? 'bg-[#2D6A4F] text-white cursor-default scale-95'
              : 'bg-[#B85D2C] hover:bg-[#9A4B20] text-white active:scale-95'
          }`}
          aria-label={`Ajouter ${product.name} au panier`}
        >
          {addedFlash ? (
            <>
              <Check size={14} strokeWidth={2.5} />
              Ajouté
            </>
          ) : (
            <>
              <ShoppingBag size={14} strokeWidth={1.75} />
              + Panier
            </>
          )}
        </button>
      </div>
    </article>
  );
}
