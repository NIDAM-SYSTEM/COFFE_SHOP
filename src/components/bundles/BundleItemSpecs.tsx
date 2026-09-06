import React from 'react';
import { Package, Coffee, BookOpen, CheckCircle2 } from 'lucide-react';
import type { Bundle } from '../../types';

interface BundleItemSpecsProps {
  bundle: Bundle;
  selectedCoffeeName?: string;
  className?: string;
}

export const BundleItemSpecs: React.FC<BundleItemSpecsProps> = ({
  bundle,
  selectedCoffeeName,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A5B5] flex items-center gap-1.5">
        <Package size={13} className="text-[#EFAE54]" />
        <span>Ce que contient le Pack Complet :</span>
      </span>

      <div className="flex flex-col gap-2">
        {/* 1. Hardware / Equipment */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
          <div className="w-6 h-6 rounded-lg bg-[#EFAE54]/15 text-[#EFAE54] flex items-center justify-center shrink-0 mt-0.5">
            <Package size={13} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                Matériel
              </span>
              <span className="text-xs font-semibold text-white truncate">
                {bundle.equipmentIncluded[0] || 'Matériel de précision'}
              </span>
            </div>
            {bundle.equipmentIncluded.length > 1 && (
              <p className="text-[11px] text-[#A0A5B5] mt-0.5 line-clamp-1">
                + {bundle.equipmentIncluded.slice(1).join(' + ')}
              </p>
            )}
          </div>
        </div>

        {/* 2. Pre-calibrated Specialty Coffee */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Coffee size={13} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300">
                Café Frais
              </span>
              <span className="text-xs font-semibold text-white truncate">
                {selectedCoffeeName || bundle.coffeeIncluded}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
              <CheckCircle2 size={11} />
              <span className="truncate">{bundle.grindCalibration}</span>
            </p>
          </div>
        </div>

        {/* 3. Recipe / Calibration Guide */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
          <div className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen size={13} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300">
                Guide Inclus
              </span>
              <span className="text-xs font-semibold text-white">
                Fiche Recette Ratios & Température
              </span>
            </div>
            <p className="text-[11px] text-[#A0A5B5] mt-0.5">
              Ratios cuisine en cuillères / verres d'eau (zéro balance requise)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleItemSpecs;
