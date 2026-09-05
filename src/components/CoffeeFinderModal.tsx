import { useState, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import type {
  BrewMethod,
  TastePreference,
  GrindChoice,
  GrindOption,
  CoffeeProduct,
} from '../types';

interface CoffeeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CoffeeProduct, grind: GrindOption) => void;
}

type Step = 1 | 2 | 3 | 'result';

interface Answers {
  brewMethod?: BrewMethod;
  tastePreference?: TastePreference;
  grindChoice?: GrindChoice;
}

const BREW_METHODS: BrewMethod[] = [
  'Italian Moka Pot',
  'French Press',
  'Pour-Over / Filter',
  'Espresso Machine',
  "I don't have gear yet",
];

const TASTE_PREFS: TastePreference[] = [
  'Rich Dark Chocolate & Caramel (Low Acidity)',
  'Bright, Fruity & Floral',
  'Smooth Morning Balance',
];

const GRIND_CHOICES: GrindChoice[] = [
  'Pre-grind for my machine (Recommended)',
  'Whole Bean (I have a grinder)',
];

function matchProduct(answers: Answers): { product: CoffeeProduct; grind: GrindOption; reason: string } {
  const { brewMethod, tastePreference, grindChoice } = answers;

  let grind: GrindOption = 'Moka Pot (Fine)';
  if (grindChoice === 'Whole Bean (I have a grinder)') {
    grind = 'Whole Bean';
  } else if (brewMethod === 'French Press') {
    grind = 'French Press (Coarse)';
  } else if (brewMethod === 'Pour-Over / Filter') {
    grind = 'V60 / Filter';
  } else if (brewMethod === 'Espresso Machine') {
    grind = 'Moka Pot (Fine)';
  } else {
    grind = 'Moka Pot (Fine)';
  }

  if (tastePreference === 'Bright, Fruity & Floral' || brewMethod === 'Pour-Over / Filter') {
    const product = PRODUCTS.find((p) => p.id === 'ethiopia-sidamo-guji')!;
    return {
      product,
      grind: grindChoice === 'Whole Bean (I have a grinder)' ? 'Whole Bean' : 'V60 / Filter',
      reason:
        'L\'Ethiopia Sidamo Guji est idéal : un café lavé lumineux aux notes de bergamote et de pêche blanche, éclatant en filtre V60.',
    };
  }
  if (
    brewMethod === 'Espresso Machine' ||
    tastePreference === 'Rich Dark Chocolate & Caramel (Low Acidity)'
  ) {
    if (brewMethod === 'Espresso Machine' || brewMethod === 'Italian Moka Pot') {
      const product = PRODUCTS.find((p) => p.id === 'atlas-crema-espresso')!;
      return {
        product,
        grind: grindChoice === 'Whole Bean (I have a grinder)' ? 'Whole Bean' : 'Moka Pot (Fine)',
        reason:
          'L\'Atlas Crema Espresso est notre blend signature conçu pour les espresso et Moka pots : crème onctueuse, notes d\'amande et chocolat noir.',
      };
    }
  }

  const product = PRODUCTS.find((p) => p.id === 'salvador-san-alberto')!;
  return {
    product,
    grind,
    reason:
      'Le Salvador San Alberto est notre best-seller absolu : équilibré, doux et polyvalent avec ses notes de prune et chocolat noir, sublime pour tous les palais.',
  };
}

export function CoffeeFinderModal({ isOpen, onClose, onAddToCart }: CoffeeFinderModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [addedFlash, setAddedFlash] = useState(false);

  const reset = useCallback(() => {
    setStep(1);
    setAnswers({});
    setAddedFlash(false);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(reset, 400);
  }, [onClose, reset]);

  const handleBrewMethod = useCallback((method: BrewMethod) => {
    setAnswers((a) => ({ ...a, brewMethod: method }));
    setStep(2);
  }, []);

  const handleTaste = useCallback((taste: TastePreference) => {
    setAnswers((a) => ({ ...a, tastePreference: taste }));
    setStep(3);
  }, []);

  const handleGrind = useCallback((grindChoice: GrindChoice) => {
    setAnswers((a) => ({ ...a, grindChoice }));
    setStep('result');
  }, []);

  const result = step === 'result' ? matchProduct(answers) : null;

  const handleAddResult = useCallback(() => {
    if (!result) return;
    onAddToCart(result.product, result.grind);
    setAddedFlash(true);
    setTimeout(() => {
      setAddedFlash(false);
      handleClose();
    }, 1500);
  }, [result, onAddToCart, handleClose]);

  if (!isOpen) return null;

  const stepProgress = step === 'result' ? 100 : ((step as number) / 3) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finder-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm drawer-overlay"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative bg-[#1A1C23] text-white border border-white/15 rounded-3xl shadow-2xl w-full max-w-lg animate-scale-in overflow-hidden">

        {/* Golden Amber Progress bar */}
        <div className="h-1.5 bg-[#2A2D34]">
          <div
            className="h-full bg-[#E89038] transition-all duration-500 ease-out shadow-amber-glow"
            style={{ width: `${stepProgress}%` }}
            role="progressbar"
            aria-valuenow={stepProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E89038]/15 flex items-center justify-center text-[#E89038]">
              <Sparkles size={16} strokeWidth={2} />
            </div>
            <h2 id="finder-title" className="display-font font-bold text-white text-lg">
              {step === 'result' ? 'Votre Café Recommandé' : 'Taste Assistant NIDAM (30s)'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E89038]"
            aria-label="Fermer l'assistant"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">

          {/* ── Step 1: Brew Method ── */}
          {step === 1 && (
            <div className="animate-fade-in">
              <p className="font-mono text-xs uppercase tracking-wider text-[#E89038] mb-1">
                Étape 1 sur 3
              </p>
              <h3 className="display-font font-bold text-xl text-white mb-4">
                Comment préparez-vous votre café à la maison ?
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {BREW_METHODS.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleBrewMethod(method)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left hover:border-[#E89038] hover:bg-[#E89038]/10 transition-all duration-150 group"
                  >
                    <span className="font-sans font-medium text-sm text-zinc-200 group-hover:text-white">
                      {method}
                    </span>
                    <ArrowRight size={15} className="text-zinc-500 group-hover:text-[#E89038] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Taste ── */}
          {step === 2 && (
            <div className="animate-fade-in">
              <p className="font-mono text-xs uppercase tracking-wider text-[#E89038] mb-1">
                Étape 2 sur 3
              </p>
              <h3 className="display-font font-bold text-xl text-white mb-4">
                Quel profil aromatique vous attire le plus ?
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {TASTE_PREFS.map((taste) => (
                  <button
                    key={taste}
                    type="button"
                    onClick={() => handleTaste(taste)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left hover:border-[#E89038] hover:bg-[#E89038]/10 transition-all duration-150 group"
                  >
                    <span className="font-sans font-medium text-sm text-zinc-200 group-hover:text-white">
                      {taste}
                    </span>
                    <ArrowRight size={15} className="text-zinc-500 group-hover:text-[#E89038] transition-colors" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 mt-4 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={13} /> Retour
              </button>
            </div>
          )}

          {/* ── Step 3: Grind ── */}
          {step === 3 && (
            <div className="animate-fade-in">
              <p className="font-mono text-xs uppercase tracking-wider text-[#E89038] mb-1">
                Étape 3 sur 3
              </p>
              <h3 className="display-font font-bold text-xl text-white mb-4">
                Avez-vous votre propre moulin à grains ?
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {GRIND_CHOICES.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => handleGrind(choice)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-left hover:border-[#E89038] hover:bg-[#E89038]/10 transition-all duration-150 group"
                  >
                    <span className="font-sans font-medium text-sm text-zinc-200 group-hover:text-white">
                      {choice}
                    </span>
                    <ArrowRight size={15} className="text-zinc-500 group-hover:text-[#E89038] transition-colors" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 mt-4 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={13} /> Retour
              </button>
            </div>
          )}

          {/* ── Result ── */}
          {step === 'result' && result && (
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-mono font-bold mb-4">
                ✓ Correspondance NIDAM trouvée
              </div>

              {/* Product result card */}
              <div className="flex gap-4 p-4 rounded-2xl border border-white/15 bg-white/[0.04] mb-4 items-center">
                <div
                  className="w-16 h-20 rounded-xl shrink-0 flex items-center justify-center shadow-lg p-1"
                  style={{ background: `linear-gradient(145deg, ${result.product.color}, #121316)` }}
                >
                  <span className="font-serif font-bold text-white text-xl">N</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="display-font font-bold text-white text-lg">{result.product.name}</h4>
                  <p className="font-mono text-xs text-[#E89038]">{result.product.origin} · {result.product.altitude}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.product.tastingNotes.map((n) => (
                      <span key={n} className="text-[10px] bg-white/10 text-zinc-200 px-2 py-0.5 rounded-full font-sans">
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-xs text-zinc-400 mt-2">Mouture recommandée : <strong className="text-white">{result.grind}</strong></p>
                </div>
              </div>

              {/* Explanation */}
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 bg-[#121316] p-3.5 rounded-xl border border-white/10">
                {result.reason}
              </p>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="display-font font-bold text-2xl text-white">
                    {result.product.price}{' '}
                    <span className="font-mono text-xs font-normal text-[#E89038]">MAD</span>
                  </p>
                  <p className="font-mono text-[10px] text-zinc-400">{result.product.weightGrams}g · Livraison 48h</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddResult}
                  disabled={addedFlash}
                  className={`btn-pill-amber ${
                    addedFlash ? 'bg-[#2D6A4F] text-white' : ''
                  }`}
                >
                  {addedFlash ? (
                    <><Check size={16} strokeWidth={2.5} /> Ajouté au panier !</>
                  ) : (
                    <>
                      <span>Ajouter au panier</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={reset}
                className="w-full text-center mt-4 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Recommencer le test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
