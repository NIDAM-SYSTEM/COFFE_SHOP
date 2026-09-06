import React from 'react';
import {
  Check,
  Sparkles,
  Building,
  Coffee,
  Store,
  Award,
  ArrowRight,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';

export interface VolumeTier {
  id: string;
  name: string;
  volumeRange: string;
  targetAudience: string;
  startingPricePerKg: number;
  highlightBadge?: string;
  isPopular?: boolean;
  color: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  whatsAppPrompt: string;
}

export const VOLUME_TIERS: VolumeTier[] = [
  {
    id: 'tier-10-25',
    name: 'Discovery & Bureaux',
    volumeRange: '10 – 25 kg / mois',
    targetAudience: 'Coffee corners d’entreprises (15-40 pers.) & petits salons indépendants',
    startingPricePerKg: 195,
    highlightBadge: 'Accessible dès 10 kg',
    color: '#3B82F6',
    icon: Store,
    description:
      'La formule idéale pour débuter le café de spécialité sans contrainte de volume excessif, avec approvisionnement régulier.',
    features: [
      '2 origines de spécialité au choix (renouvelables chaque mois)',
      'Grains fraîchement torréfiés de la semaine (dégazage optimal)',
      'Livraison 48h incluse à Casablanca, Rabat et partout au Maroc',
      'Fiches recettes barista & repères de réglage moulin fournis',
      'Facturation B2B officielle avec TVA récupérable (20%)',
    ],
    whatsAppPrompt:
      'Salam NIDAM Coffee, nous sommes intéressés par le palier B2B Tier 1 (10-25kg/mois) pour notre établissement.',
  },
  {
    id: 'tier-25-50',
    name: 'Specialty Café & Resto',
    volumeRange: '25 – 50 kg / mois',
    targetAudience: 'Coffee shops de spécialité, brasseries actives & restaurants de standing',
    startingPricePerKg: 165,
    highlightBadge: 'Recommandé Cafés • Meilleur Rapport Valeur',
    isPopular: true,
    color: '#EFAE54',
    icon: Coffee,
    description:
      'Notre formule cœur de métier : cafés d’exception, assistance au réglage machine sur site et formation continue de vos équipes.',
    features: [
      '3 terroirs permanents au choix + 1 micro-lot invité exclusif',
      'Calibrage machine sur site (audit pression, température & meules)',
      'Formation barista de vos équipes (2 sessions annuelles incluses)',
      'Livraisons bi-hebdomadaires programmées pour fraîcheur absolue',
      'Cartes descriptives des terroirs offertes pour vos tables',
      'Interlocuteur commercial & Maître Torréfacteur dédié',
    ],
    whatsAppPrompt:
      'Salam NIDAM Coffee, nous exploitons un café/restaurant et souhaitons le palier B2B Tier 2 (25-50kg/mois) avec calibrage machine.',
  },
  {
    id: 'tier-50-plus',
    name: 'Enterprise & Multi-Sites',
    volumeRange: '50 kg et + / mois',
    targetAudience: 'Groupes hôteliers, chaînes de restauration & sièges de multinationales',
    startingPricePerKg: 135,
    highlightBadge: 'Tarif Grand Compte',
    color: '#10B981',
    icon: Building,
    description:
      'Un partenariat stratégique complet : création de votre propre profil de torréfaction exclusif et conditions contractuelles sur-mesure.',
    features: [
      'Création d’un Signature Roast Blend exclusif à votre enseigne',
      'Option ensachage personnalisé (White Label / Co-branding à vos couleurs)',
      'Audit technique trimestriel et maintenance préventive du matériel',
      'Livraison express J+1 prioritaire avec stock de sécurité garanti',
      'Conditions de paiement différé à 30 jours (après validation de compte)',
      'Formations certifiantes continues pour chefs de salle et baristas',
    ],
    whatsAppPrompt:
      'Salam NIDAM Coffee, je représente un groupe/grande entreprise et souhaite une proposition Grand Compte (50kg+/mois).',
  },
];

export interface VolumeTiersGridProps {
  onSelectTier?: (tier: VolumeTier) => void;
  className?: string;
}

export const VolumeTiersGrid: React.FC<VolumeTiersGridProps> = ({
  onSelectTier,
  className = '',
}) => {
  const handleSelectTier = (e: React.MouseEvent, tier: VolumeTier) => {
    if (onSelectTier) {
      onSelectTier(tier);
    }
    const formElement = document.getElementById('sample-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/25 text-[#EFAE54] text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Grille Tarifaire Dégressive</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          3 Paliers de Volume Adaptés à Votre Activité
        </h2>
        <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
          Bénéficiez de remises de gros direct torréfacteur avec une flexibilité totale sur le choix de vos terroirs et des livraisons calées sur votre consommation réelle.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {VOLUME_TIERS.map((tier) => {
          const Icon = tier.icon;
          const isPopular = tier.isPopular;
          const whatsappUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
            tier.whatsAppPrompt
          )}`;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                isPopular
                  ? 'bg-[#1A1D30] border-2 border-[#EFAE54] shadow-2xl shadow-[#EFAE54]/10 lg:-translate-y-2'
                  : 'bg-[#161826] border border-white/10 hover:border-white/20 shadow-xl'
              }`}
            >
              {/* Popular / Recommended Tag Banner */}
              {tier.highlightBadge && (
                <div
                  className={`w-full py-1.5 px-4 text-center text-[11px] font-mono font-extrabold uppercase tracking-wider ${
                    isPopular
                      ? 'bg-[#EFAE54] text-[#121421]'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  {tier.highlightBadge}
                </div>
              )}

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Header Row: Icon + Title + Volume */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#EFAE54]">
                      {tier.volumeRange}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">
                      {tier.name}
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${tier.color}15`,
                      borderColor: `${tier.color}35`,
                      color: tier.color,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Target Audience */}
                <p className="text-xs text-white/60 mb-6 leading-relaxed font-light min-h-[36px]">
                  {tier.targetAudience}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">
                    Tarif Indicatif de Gros
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs text-white/60 font-medium">dès</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                      {tier.startingPricePerKg}
                    </span>
                    <span className="text-sm font-bold text-[#EFAE54] font-mono">MAD</span>
                    <span className="text-xs text-white/40 font-mono">/ kg HT</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                    Économisez jusqu’à -55% par rapport au tarif détail
                  </span>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-3 font-semibold">
                    Inclus dans ce palier :
                  </span>
                  <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#EFAE54]/20 text-[#EFAE54] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => handleSelectTier(e, tier)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
                      isPopular
                        ? 'bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] shadow-[#EFAE54]/25 hover:shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>Demander ce Palier de Volume</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/[0.03] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Discuter de ce volume sur WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reassurance Sub-bar */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EFAE54]/15 text-[#EFAE54] flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm font-display">
              Besoin d’un panachage de plusieurs origines ou d’un profil spécifique ?
            </h4>
            <p className="text-white/60 text-xs mt-0.5">
              Nous adaptons vos commandes chaque semaine selon les goûts de votre clientèle et vos machines.
            </p>
          </div>
        </div>
        <a
          href="#sample-form"
          className="text-xs font-bold font-mono text-[#EFAE54] hover:text-[#f3b965] transition-colors underline shrink-0"
        >
          Demander une étude personnalisée →
        </a>
      </div>
    </section>
  );
};
