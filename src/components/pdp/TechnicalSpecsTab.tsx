import React from 'react';
import {
  Mountain,
  Award,
  Calendar,
  Flame,
  Droplets,
  Layers,
  Globe,
  Sun,
  ShieldCheck,
  Building,
  Leaf,
  FileCheck,
} from 'lucide-react';
import type { CoffeeProduct } from '../../types';

export interface TechnicalSpecsTabProps {
  product: CoffeeProduct;
  className?: string;
}

export const TechnicalSpecsTab: React.FC<TechnicalSpecsTabProps> = ({
  product,
  className = '',
}) => {
  const specs = product.agronomySpecs;

  const specTiles = [
    {
      label: 'Altitude de Culture',
      value: product.altitude,
      icon: Mountain,
      accent: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
      desc: 'Haute altitude favorisant une densité accrue et une complexité aromatique supérieure.',
    },
    {
      label: 'Variété Botanique',
      value: product.varietal || specs?.varietal || 'Arabica Bourbon / Heirloom',
      icon: Leaf,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      desc: 'Lignée génétique noble sélectionnée pour sa pureté gustative et sa sucrosité en tasse.',
    },
    {
      label: 'Procédé & Fermentation',
      value: `${product.processingMethod || product.process} ${specs?.fermentationTime ? `(${specs.fermentationTime})` : ''}`,
      icon: Droplets,
      accent: 'text-sky-400',
      bg: 'bg-sky-400/10',
      border: 'border-sky-400/20',
      desc: specs?.fermentationTime || 'Contrôle méticuleux de la macération pour préserver la netteté du terroir.',
    },
    {
      label: 'Numéro de Lot & Traçabilité',
      value: product.lotCode,
      icon: Layers,
      accent: 'text-[#EFAE54]',
      bg: 'bg-[#EFAE54]/10',
      border: 'border-[#EFAE54]/20',
      desc: 'Micro-lot traçable jusqu\'à la station de lavage d\'origine.',
    },
    {
      label: 'Ferme / Coopérative',
      value: product.farm || specs?.farm || 'Producteurs Indépendants Partenaires',
      icon: Building,
      accent: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/20',
      desc: specs?.region || `${product.origin} • Commerce direct équitable`,
    },
    {
      label: 'Année & Saison de Récolte',
      value: product.harvestYear || specs?.harvestYear || '2024 Récolte Principale',
      icon: Calendar,
      accent: 'text-teal-400',
      bg: 'bg-teal-400/10',
      border: 'border-teal-400/20',
      desc: 'Cerises cueillies à maturité optimale (picking sélectif manuel 100%).',
    },
    {
      label: 'Score Qualité SCA',
      value: product.scaScore ? `${product.scaScore} / 100` : 'Score SCA > 86',
      icon: Award,
      accent: 'text-amber-300',
      bg: 'bg-amber-300/10',
      border: 'border-amber-300/20',
      desc: 'Protocole de dégustation officiel Specialty Coffee Association (SCA).',
    },
    {
      label: 'Méthode de Séchage',
      value: specs?.dryingMethod || 'Lits africains surélevés sous aération naturelle',
      icon: Sun,
      accent: 'text-orange-400',
      bg: 'bg-orange-400/10',
      border: 'border-orange-400/20',
      desc: 'Teneur en humidité cible de 10.5% - 11.2% assurant une fraîcheur pérenne.',
    },
  ];

  return (
    <div className={`flex flex-col gap-6 ${className}`} aria-label="Données agronomiques">
      {/* ── Header Introduction with Nidal Persona Callout ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#161826]/80 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center text-[#EFAE54] shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Fiche Technique Terroir & Traçabilité Complète
            </h3>
            <p className="text-xs text-[#A0A5B5]">
              Données certifiées pour torréfacteurs, baristas et amateurs exigeants.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <FileCheck size={13} />
            <span>Lot Certifié Conforme</span>
          </span>
        </div>
      </div>

      {/* ── High-Density Data Grid (2 to 4 cols) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {specTiles.map((tile) => {
          const IconComponent = tile.icon;
          return (
            <div
              key={tile.label}
              className="p-4 rounded-2xl bg-[#121421]/90 border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between shadow-lg group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg ${tile.bg} ${tile.border} border flex items-center justify-center ${tile.accent}`}
                  >
                    <IconComponent size={16} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0A5B5] line-clamp-1">
                    {tile.label}
                  </span>
                </div>

                <p className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#EFAE54] transition-colors leading-snug">
                  {tile.value}
                </p>
              </div>

              <p className="text-[11px] text-[#A0A5B5] mt-3 pt-3 border-t border-white/5 leading-relaxed font-sans">
                {tile.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Transparency Reassurance Banner ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#161826] to-[#121421] border border-amber-500/20 text-xs text-[#A0A5B5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-[#EFAE54] shrink-0" />
          <span>
            Origine 100% vérifiée : import direct en sacs GrainPro sous vide pour bloquer l'oxydation.
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[#EFAE54] font-semibold text-[11px] shrink-0">
          <Flame size={13} />
          <span>Profil Torréfaction: {product.roastProfile}</span>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecsTab;
