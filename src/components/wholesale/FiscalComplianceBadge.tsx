import React from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Building,
  CreditCard,
  BadgePercent,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export interface FiscalComplianceBadgeProps {
  className?: string;
}

export const FiscalComplianceBadge: React.FC<FiscalComplianceBadgeProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`rounded-3xl border border-[#EFAE54]/30 bg-gradient-to-r from-[#1E2238] via-[#161826] to-[#1E2238] p-6 sm:p-8 lg:p-10 shadow-xl ${className}`}
      aria-label="Conformité Fiscale et Mentions Légales B2B Maroc"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center text-[#EFAE54] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#EFAE54]">
              <Lock className="w-3 h-3" />
              <span>Conformité Commerciale & Légale Maroc</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Facturation B2B Officielle & TVA Récupérable
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold self-start md:self-auto">
          <CheckCircle2 className="w-4 h-4" />
          <span>Entreprise Enregistrée au Maroc</span>
        </div>
      </div>

      {/* Grid of 4 Legal Identifiers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10">
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EFAE54] block font-bold">
            ICE
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
            002984712000045
          </span>
          <span className="text-[11px] text-white/50 block mt-0.5 font-light">
            Identifiant Commun Entreprise
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EFAE54] block font-bold">
            IF
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
            52894103
          </span>
          <span className="text-[11px] text-white/50 block mt-0.5 font-light">
            Identifiant Fiscal (DGI)
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EFAE54] block font-bold">
            RC
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
            489210
          </span>
          <span className="text-[11px] text-white/50 block mt-0.5 font-light">
            Registre du Commerce Casa
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#EFAE54] block font-bold">
            Patente (TP)
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
            37810425
          </span>
          <span className="text-[11px] text-white/50 block mt-0.5 font-light">
            Taxe Professionnelle
          </span>
        </div>
      </div>

      {/* 3 Accounting & Purchasing Guarantees */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 text-[#EFAE54] flex items-center justify-center shrink-0 mt-0.5">
            <BadgePercent className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-display">
              TVA 20% Totalement Déductible
            </h4>
            <p className="text-[11px] sm:text-xs text-white/60 mt-1 leading-relaxed">
              Toutes nos factures professionnelles comportent le détail Hors Taxe et TVA 20% pour vos bilans et déclarations comptables.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 text-[#EFAE54] flex items-center justify-center shrink-0 mt-0.5">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-display">
              Bons de Livraison & Traçabilité
            </h4>
            <p className="text-[11px] sm:text-xs text-white/60 mt-1 leading-relaxed">
              Chaque expédition comprend son Bon de Livraison émargé avec date exacte de torréfaction et numéros de lots d'importation certifiés.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 text-[#EFAE54] flex items-center justify-center shrink-0 mt-0.5">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-display">
              Modes de Paiement Entreprise
            </h4>
            <p className="text-[11px] sm:text-xs text-white/60 mt-1 leading-relaxed">
              Règlement par virement bancaire sur compte d'entreprise, chèque barré, ou facilités de paiement à 30 jours après audit du compte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
