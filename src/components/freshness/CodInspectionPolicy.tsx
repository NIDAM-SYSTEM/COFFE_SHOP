import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Banknote,
  CalendarCheck,
  RotateCcw,
  Sparkles,
  AlertCircle,
  PackageCheck,
  Truck,
  Eye,
  BadgePercent,
  Check,
} from 'lucide-react';

export interface CodInspectionPolicyProps {
  className?: string;
}

interface GuaranteeStep {
  step: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  details: string[];
}

const GUARANTEE_STEPS: GuaranteeStep[] = [
  {
    step: 'Étape 01',
    title: 'Le livreur arrive à votre porte',
    description:
      'Notre coursier dédié ou le livreur partenaire vous remet votre colis rigide scellé, avec le bordereau mentionnant vos informations et le détail de vos sachets.',
    badge: 'Remise en Main Propre',
    icon: Truck,
    details: [
      'Créneau horaire prévenu par appel ou SMS',
      'Colis intact, fermé et protégé contre les chocs',
      'Pas besoin de régler avant d’avoir inspecté',
    ],
  },
  {
    step: 'Étape 02',
    title: 'Vous inspectez la valve & la date de torréfaction',
    description:
      'Prenez 30 secondes pour examiner le sachet : contrôlez la valve de dégazage unidirectionnelle et lisez la date de cuisson inscrite à la main au dos du paquet.',
    badge: 'Contrôle Fraîcheur Libre',
    icon: Eye,
    details: [
      'Vérification de la valve de dégazage active (arômes intacts)',
      'Date de torréfaction visible & certifiée < 7 jours',
      'Sachet hermétique triple couche non percé',
    ],
  },
  {
    step: 'Étape 03',
    title: 'Vous payez en Cash en toute confiance',
    description:
      'Ce n’est qu’une fois parfaitement rassuré(e) sur la fraîcheur et la conformité de vos cafés que vous réglez le montant exact en espèces auprès du livreur.',
    badge: '100% Cash on Delivery (COD)',
    icon: Banknote,
    details: [
      'Paiement sécurisé en Dirhams (MAD) sans prépaiement carte',
      'Reçu / bordereau de livraison remis sur place',
      'Droit de refus immédiat si le produit ne vous convient pas',
    ],
  },
];

export const CodInspectionPolicy: React.FC<CodInspectionPolicyProps> = ({
  className = '',
}) => {
  return (
    <section
      className={`rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm space-y-10 ${className}`}
      id="cod-inspection-policy-section"
      aria-label="Protocole d'Inspection et Garantie Fraîcheur avant Paiement"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EFAE54]/10 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* ── 1. Top Section Header ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Confiance Totale • Paiement à la Livraison</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
          Garantie Fraîcheur & Inspection avant Paiement
        </h3>

        <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
          Au Maroc, acheter du café en ligne ne doit comporter aucun risque de recevoir un paquet éventé ou torréfié il y a 6 mois. Nous avons instauré la politique d’inspection la plus stricte du marché.
        </p>
      </div>

      {/* ── 2. 3-Step Visual Protocol Grid ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUARANTEE_STEPS.map((stepItem, index) => {
          const Icon = stepItem.icon;
          return (
            <div
              key={stepItem.step}
              className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:bg-white/[0.04] shadow-xl relative group"
              id={`inspection-step-${index + 1}`}
            >
              <div>
                {/* Step Index & Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-xs font-mono font-black text-[#EFAE54] uppercase tracking-wider bg-[#EFAE54]/10 border border-[#EFAE54]/20 px-2.5 py-1 rounded-md">
                    {stepItem.step}
                  </span>
                  <span className="text-[11px] font-bold text-white/60 tracking-wider">
                    {stepItem.badge}
                  </span>
                </div>

                {/* Step Icon & Title */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EFAE54]/20 to-[#DE9839]/10 border border-[#EFAE54]/30 flex items-center justify-center text-[#EFAE54] shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {stepItem.title}
                  </h4>
                </div>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
                  {stepItem.description}
                </p>

                {/* Bullet Proof Points */}
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-white/80">
                  {stepItem.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. High-Trust 100% Guarantee Banner (> 14 Days Replacement) ── */}
      <div className="relative z-10 rounded-2xl overflow-hidden border border-[#EFAE54]/40 bg-gradient-to-r from-amber-950/40 via-[#191C2E] to-amber-950/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EFAE54] to-[#DE9839] text-[#121421] flex items-center justify-center shrink-0 shadow-lg shadow-[#EFAE54]/25">
              <CalendarCheck className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#EFAE54]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Garantie Fraîcheur Absolue • Règle des 14 Jours</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                Torréfié il y a plus de 14 jours ? 100% Remboursé ou Remplacé
              </h4>
              <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
                Si la date de torréfaction inscrite sur votre sachet lors de la réception indique une cuisson supérieure à <strong>14 jours</strong>, nous vous remboursons intégralement votre commande et nous vous réexpédions gratuitement un paquet de la fournée suivante.
              </p>
            </div>
          </div>

          {/* Guarantee Value Pills */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto text-xs font-semibold">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white">
              <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Droit de refus sans frais au livreur</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#EFAE54] shrink-0" />
              <span>Valve d'aération active vérifiable</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Sachet Anatomy: Where to inspect ── */}
      <div className="relative z-10 rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFAE54] shrink-0">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              Comment vérifier votre sachet en 3 secondes ?
            </div>
            <div className="text-xs text-white/60 mt-0.5">
              1. Pressez doucement le sachet pour sentir les arômes s'échapper de la valve centrale • 2. Vérifiez le tampon dateur manuscrit au bas du verso.
            </div>
          </div>
        </div>

        <div className="shrink-0 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Fraîcheur d'Artisan Garantie</span>
        </div>
      </div>
    </section>
  );
};
