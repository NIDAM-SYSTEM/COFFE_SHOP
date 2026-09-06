import React, { useState } from 'react';
import {
  Coffee,
  Thermometer,
  Clock,
  Sparkles,
  CheckCircle2,
  Utensils,
  Droplets,
  HelpCircle,
  Flame,
} from 'lucide-react';
import type { CoffeeProduct, BrewRecipeGuide } from '../../types';

export interface HomeRecipeTabProps {
  product: CoffeeProduct;
  className?: string;
}

// Fallback recipes for alternative brewing methods if the product's primary guide is a specific method
const ALTERNATIVE_RECIPES: Record<string, BrewRecipeGuide> = {
  'Cafetière Italienne (Moka Pot)': {
    recommendedMethod: 'Cafetière Italienne (Moka Pot)',
    ratioSpoons: '2 cuillères à soupe bombées (~16g)',
    ratioGrams: '16g pour 180ml d\'eau',
    waterAmount: '180 ml (juste sous la soupape)',
    waterTemp: 'Eau chaude préchauffée ~ 90°C',
    brewTime: '3 à 4 min à feu doux',
    grindRecommended: 'Mouture Moka moyenne-fine (texture sel de table)',
    steps: [
      {
        stepNumber: 1,
        title: 'Eau chaude dans la chaudière',
        instruction: 'Remplissez la base d\'eau chaude jusqu\'au dessous de la valve. Préchauffer l\'eau évite de brûler le café.',
      },
      {
        stepNumber: 2,
        title: 'Dosage généreux sans tasser',
        instruction: 'Déposez 2 cuillères à soupe bombées dans l\'entonnoir. Égalisez doucement au doigt sans tasser avec une cuillère.',
      },
      {
        stepNumber: 3,
        title: 'Feu doux & coupure rapide',
        instruction: 'Chauffez à feu moyen-doux couvercle ouvert. Dès que l\'extraction devient blonde et crémeuse, retirez du feu et servez.',
      },
    ],
  },
  'Filtre Pour-Over (V60)': {
    recommendedMethod: 'Filtre Pour-Over (V60)',
    ratioSpoons: '2 cuillères à soupe rases (~15g)',
    ratioGrams: '15g pour 250ml d\'eau (Ratio 1:16.6)',
    waterAmount: '250 ml (1 grand mug)',
    waterTemp: '92°C - 94°C (attendre 45s après ébullition)',
    brewTime: '2 min 45 s',
    grindRecommended: 'Mouture moyenne (texture gros sable)',
    steps: [
      {
        stepNumber: 1,
        title: 'Rinçage & Pré-infusion (Bloom)',
        instruction: 'Rincez le filtre papier à l\'eau chaude pour ôter le goût de papier. Versez 50ml d\'eau et laissez fleurir 40 secondes.',
      },
      {
        stepNumber: 2,
        title: 'Verse lente et circulaire',
        instruction: 'Versez les 200ml restants en effectuant de doux cercles du centre vers l\'extérieur sans toucher les bords du filtre.',
      },
      {
        stepNumber: 3,
        title: 'Égouttement & Aération',
        instruction: 'Laissez s\'écouler la filtration. Remuez délicatement votre carafe ou mug pour marier harmonieusement les arômes.',
      },
    ],
  },
  'Cafetière à Piston (French Press)': {
    recommendedMethod: 'Cafetière à Piston (French Press)',
    ratioSpoons: '2 cuillères à soupe très bombées (~18g)',
    ratioGrams: '18g pour 300ml d\'eau',
    waterAmount: '300 ml d\'eau',
    waterTemp: '94°C (1 minute après ébullition)',
    brewTime: '4 minutes chrono',
    grindRecommended: 'Mouture grossière (texture sel marin)',
    steps: [
      {
        stepNumber: 1,
        title: 'Mouture & Immersion immédiate',
        instruction: 'Mettez le café au fond du bocal en verre et versez toute l\'eau chaude en veillant à imbiber tous les grains.',
      },
      {
        stepNumber: 2,
        title: 'Attente 4 minutes',
        instruction: 'Posez le couvercle avec le piston remonté en surface. Laissez infuser 4 minutes sans remuer.',
      },
      {
        stepNumber: 3,
        title: 'Pressage fluide',
        instruction: 'Pressez lentement et régulièrement jusqu\'en bas sans forcer. Versez immédiatement dans les tasses.',
      },
    ],
  },
};

export const HomeRecipeTab: React.FC<HomeRecipeTabProps> = ({
  product,
  className = '',
}) => {
  const defaultMethod =
    product.recipeGuide?.recommendedMethod || 'Cafetière Italienne (Moka Pot)';

  // Determine which method is actively selected by the user
  const [activeMethod, setActiveMethod] = useState<string>(() => {
    if (defaultMethod.toLowerCase().includes('moka')) {
      return 'Cafetière Italienne (Moka Pot)';
    }
    if (defaultMethod.toLowerCase().includes('v60') || defaultMethod.toLowerCase().includes('filtre')) {
      return 'Filtre Pour-Over (V60)';
    }
    if (defaultMethod.toLowerCase().includes('piston') || defaultMethod.toLowerCase().includes('french')) {
      return 'Cafetière à Piston (French Press)';
    }
    return 'Cafetière Italienne (Moka Pot)';
  });

  // Active recipe data (either custom product recipe or alternative preset)
  const activeRecipe: BrewRecipeGuide =
    activeMethod === defaultMethod
      ? product.recipeGuide
      : ALTERNATIVE_RECIPES[activeMethod] || product.recipeGuide;

  const methodOptions = [
    'Cafetière Italienne (Moka Pot)',
    'Filtre Pour-Over (V60)',
    'Cafetière à Piston (French Press)',
  ];

  return (
    <div className={`flex flex-col gap-6 ${className}`} aria-label="Recette maison">
      {/* ── Method Selector Tabs ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#161826]/80 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center text-[#EFAE54] shrink-0">
            <Coffee size={17} />
          </div>
          <span className="text-xs sm:text-sm font-display font-bold text-white">
            Votre Méthode d'Extraction Préférée :
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {methodOptions.map((method) => {
            const isSelected = activeMethod === method;
            const isRecommended = defaultMethod.toLowerCase().includes(
              method.toLowerCase().split(' ')[0]
            );

            return (
              <button
                key={method}
                type="button"
                onClick={() => setActiveMethod(method)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#EFAE54] text-[#121421] shadow-md shadow-[#EFAE54]/20 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
                }`}
              >
                <span>{method.split('(')[0].trim()}</span>
                {isRecommended && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#121421] text-[#EFAE54]' : 'bg-[#EFAE54]/20 text-[#EFAE54]'
                    }`}
                  >
                    Idéal
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Kitchen Measurements Bar (No Scale Required) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spoon / Scale Ratio */}
        <div className="p-4 rounded-2xl bg-[#121421]/90 border border-white/10 shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <Utensils size={15} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5]">
              Dose en Cuillère
            </span>
          </div>
          <p className="font-display font-bold text-base text-white">
            {activeRecipe.ratioSpoons}
          </p>
          <p className="text-[11px] text-[#A0A5B5] font-mono mt-1 pt-2 border-t border-white/5">
            Ou balance : {activeRecipe.ratioGrams}
          </p>
        </div>

        {/* Water Volume */}
        <div className="p-4 rounded-2xl bg-[#121421]/90 border border-white/10 shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
              <Droplets size={15} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5]">
              Volume d'Eau
            </span>
          </div>
          <p className="font-display font-bold text-base text-white">
            {activeRecipe.waterAmount}
          </p>
          <p className="text-[11px] text-[#A0A5B5] mt-1 pt-2 border-t border-white/5">
            Eau filtrée ou minérale conseillée
          </p>
        </div>

        {/* Water Temperature Tip */}
        <div className="p-4 rounded-2xl bg-[#121421]/90 border border-white/10 shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-rose-400/10 border border-rose-400/20 text-rose-400 flex items-center justify-center">
              <Thermometer size={15} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5]">
              Température d'Eau
            </span>
          </div>
          <p className="font-display font-bold text-sm sm:text-base text-white">
            {activeRecipe.waterTemp}
          </p>
          <p className="text-[11px] text-[#A0A5B5] mt-1 pt-2 border-t border-white/5">
            Pas d'eau bouillante = zéro amertume
          </p>
        </div>

        {/* Brew Time */}
        <div className="p-4 rounded-2xl bg-[#121421]/90 border border-white/10 shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <Clock size={15} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5]">
              Temps d'Infusion
            </span>
          </div>
          <p className="font-display font-bold text-base text-white">
            {activeRecipe.brewTime}
          </p>
          <p className="text-[11px] text-[#A0A5B5] mt-1 pt-2 border-t border-white/5 font-mono">
            {activeRecipe.grindRecommended}
          </p>
        </div>
      </div>

      {/* ── Visual 3-Step Extraction Flow Cards ── */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#EFAE54] flex items-center gap-2">
          <Sparkles size={14} />
          <span>Étapes d'Extraction Pas-à-Pas</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeRecipe.steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-2xl bg-[#121421]/95 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-[#EFAE54]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-extrabold text-2xl text-[#EFAE54]/30 group-hover:text-[#EFAE54] transition-colors">
                  0{step.stepNumber}
                </span>
                <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-[#A0A5B5] font-mono">
                  {idx + 1}/3
                </span>
              </div>

              <div>
                <h5 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#EFAE54] transition-colors">
                  {step.title}
                </h5>
                <p className="text-xs text-[#A0A5B5] leading-relaxed font-sans">
                  {step.instruction}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
                <CheckCircle2 size={13} className="shrink-0" />
                <span>Conseil garanti sans amertume</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mouna Practical Reassurance Callout ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#161826] to-[#121421] border border-emerald-500/20 text-xs text-white/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <HelpCircle size={15} />
          </div>
          <span className="leading-relaxed">
            <strong>Pas de balance précise chez vous ?</strong> 2 cuillères à soupe bombées de cuisine correspondent exactement à la dose idéale pour votre tasse matinale.
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#EFAE54] shrink-0 self-end sm:self-auto">
          Mouture adaptée disponible au choix
        </span>
      </div>
    </div>
  );
};

export default HomeRecipeTab;
