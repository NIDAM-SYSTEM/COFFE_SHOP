import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
  MessageCircle,
  Search,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';

export interface DeliveryZone {
  id: string;
  zoneNumber: number;
  name: string;
  slaTime: string;
  slaBadge: string;
  accentColor: string;
  borderHover: string;
  cities: string[];
  courierPartner: string;
  freeShippingThreshold: number;
  standardFee: number;
  dispatchCutoff: string;
  features: string[];
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-1',
    zoneNumber: 1,
    name: 'Grand Casablanca & Axe Côtier',
    slaTime: '24 Heures Chrono',
    slaBadge: 'Livraison 24h Express',
    accentColor: '#10B981', // emerald
    borderHover: 'hover:border-emerald-500/50',
    cities: ['Casablanca', 'Rabat', 'Mohammedia', 'Kénitra', 'Salé', 'Bouskoura', 'Dar Bouazza', 'Témara'],
    courierPartner: 'Flotte Dédiée Coffee House & Coursiers Express',
    freeShippingThreshold: 200,
    standardFee: 25,
    dispatchCutoff: 'Commandez avant 14h pour livraison le lendemain matin',
    features: [
      'Remise en main propre sur créneau matinal ou après-midi',
      'Contact direct avec le livreur par appel/WhatsApp',
      'Paiement Cash on Delivery (COD) avec appoint ou monnaie',
      'Protection thermique de la valve fraîcheur pendant le trajet',
    ],
  },
  {
    id: 'zone-2',
    zoneNumber: 2,
    name: 'Grandes Métropoles Régionales',
    slaTime: '48 Heures',
    slaBadge: 'Expédition 48h Garantie',
    accentColor: '#EFAE54', // gold
    borderHover: 'hover:border-[#EFAE54]/50',
    cities: ['Marrakech', 'Tanger', 'Fès', 'Meknès', 'Agadir', 'Tétouan', 'El Jadida', 'Essaouira'],
    courierPartner: 'Réseau Express Partenaire (SDTM / Chrono Diali)',
    freeShippingThreshold: 300,
    standardFee: 35,
    dispatchCutoff: 'Expédié le jour même de la session de torréfaction',
    features: [
      'Livraison à domicile ou au bureau du Lundi au Samedi',
      'Notification WhatsApp automatique dès scan de prise en charge',
      'Carton rigide sécurisé avec calage anti-choc et anti-écrasement',
      'Possibilité de reprogrammer la livraison en 1 clic',
    ],
  },
  {
    id: 'zone-3',
    zoneNumber: 3,
    name: 'Oriental, Sud & Villes Intérieures',
    slaTime: '48 – 72 Heures',
    slaBadge: 'Couverture 48h–72h',
    accentColor: '#38BDF8', // sky
    borderHover: 'hover:border-sky-400/50',
    cities: [
      'Laâyoune',
      'Oujda',
      'Nador',
      'Dakhla',
      'Béni Mellal',
      'Ouarzazate',
      'Al Hoceïma',
      'Berkane',
      'Guelmim',
      'Taza',
      'Tiznit',
      'Toutes les autres villes du Maroc',
    ],
    courierPartner: 'Amana Messagerie Sécurisée & Coursiers Régionaux',
    freeShippingThreshold: 350,
    standardFee: 45,
    dispatchCutoff: 'Acheminement prioritaire sous colis scellé DGI',
    features: [
      'Couverture intégrale des 12 régions du Royaume du Maroc',
      'Suivi en temps réel via numéro de tracking Amana & WhatsApp',
      'Droit d’inspection du sachet avant acquittement des espèces',
      'Option de retrait express en agence Amana la plus proche',
    ],
  },
];

interface LogisticsStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

const LOGISTICS_STEPS: LogisticsStep[] = [
  {
    stepNumber: '01',
    title: 'Torréfaction & Ensachage sous Valve',
    subtitle: 'Atelier de Casablanca',
    description:
      'Grains immédiatement ensachés à chaud dans nos sachets triple couche étanches avec valve unidirectionnelle pour débuter le dégazage optimal.',
    icon: Package,
  },
  {
    stepNumber: '02',
    title: 'Remise Coursier & Scan Dispatch',
    subtitle: 'Chaque Mardi & Vendredi 16h',
    description:
      'Les colis sont remis à nos coursiers partenaires et intégrés au réseau d’acheminement prioritaire avec étiquetage mentionnant la date de torréfaction.',
    icon: Truck,
  },
  {
    stepNumber: '03',
    title: 'Lien de Suivi Direct sur WhatsApp',
    subtitle: 'Notification Temps Réel',
    description:
      'Dès la prise en charge, vous recevez un message WhatsApp avec le numéro de tracking et les coordonnées directes de votre livreur.',
    icon: MessageCircle,
  },
  {
    stepNumber: '04',
    title: 'Remise & Inspection avant Paiement',
    subtitle: 'Paiement à la Livraison (COD)',
    description:
      'Vérifiez la fraîcheur et la valve de votre paquet avant de régler en espèces. Satisfaction garantie sans frais de retour.',
    icon: ShieldCheck,
  },
];

export interface MoroccoDeliveryMapProps {
  className?: string;
}

export const MoroccoDeliveryMap: React.FC<MoroccoDeliveryMapProps> = ({
  className = '',
}) => {
  const [searchCity, setSearchCity] = useState('');

  // Interactive quick city lookup
  const matchedZone = searchCity.trim().length > 1
    ? DELIVERY_ZONES.find((z) =>
        z.cities.some((c) =>
          c.toLowerCase().includes(searchCity.trim().toLowerCase())
        )
      )
    : null;

  const whatsappTrackingUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    'Salam NIDAM Coffee, je souhaite suivre une expédition en cours ou me renseigner sur le délai de livraison pour ma ville.'
  )}`;

  return (
    <section
      className={`rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm space-y-12 ${className}`}
      id="morocco-delivery-map-section"
      aria-label="Engagements de Livraison et Délais au Maroc"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EFAE54]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* ── 1. Section Header ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>SLA Logistique & Acheminement National</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Engagements de Livraison au Maroc (24h / 48h / 72h)
          </h3>
          <p className="text-white/65 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
            Grâce à nos partenariats logistiques express et à notre atelier central à Casablanca, nous desservons les 12 régions du Royaume avec une traçabilité rigoureuse et une protection absolue de la valve de dégazage.
          </p>
        </div>

        {/* Quick City Lookup Widget */}
        <div className="shrink-0 w-full lg:w-80">
          <label
            htmlFor="city-search-input"
            className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2"
          >
            Vérifier ma Ville :
          </label>
          <div className="relative">
            <input
              id="city-search-input"
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Ex: Casablanca, Tanger, Oujda..."
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] transition-all"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          </div>

          {matchedZone && (
            <div className="mt-2 text-xs p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between animate-fadeIn">
              <span className="font-semibold">{matchedZone.name}</span>
              <span className="font-bold text-white font-mono">{matchedZone.slaTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. Responsive 3-Column SLA Cards Grid ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DELIVERY_ZONES.map((zone) => {
          return (
            <div
              key={zone.id}
              className={`rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${zone.borderHover} hover:scale-[1.01] hover:bg-white/[0.04] shadow-xl relative group`}
              id={`delivery-zone-card-${zone.id}`}
            >
              <div>
                {/* Zone Top Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm"
                    style={{
                      backgroundColor: `${zone.accentColor}15`,
                      borderColor: `${zone.accentColor}40`,
                      color: zone.accentColor,
                    }}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{zone.slaBadge}</span>
                  </span>

                  <span className="text-xs font-mono font-bold text-white/50">
                    Zone 0{zone.zoneNumber}
                  </span>
                </div>

                {/* Zone Name & Delivery Time */}
                <h4 className="text-xl font-extrabold text-white font-display mb-1">
                  {zone.name}
                </h4>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {zone.slaTime}
                  </span>
                  <span className="text-xs text-white/60">à votre porte</span>
                </div>

                {/* Cities Coverage Chips */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EFAE54]" />
                    <span>Villes Couvertes :</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.cities.map((city) => (
                      <span
                        key={city}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 font-medium"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Partner Logistics & Cutoff Note */}
                <div className="space-y-2 mb-6 text-xs text-white/70 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                  <div className="flex items-start gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#EFAE54] shrink-0 mt-0.5" />
                    <span><strong>Transport :</strong> {zone.courierPartner}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{zone.dispatchCutoff}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-2 mb-6 text-xs text-white/75">
                  {zone.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Free Shipping Threshold */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/60">Livraison Offerte dès :</span>
                <span className="font-extrabold text-[#EFAE54] font-mono text-sm">
                  {zone.freeShippingThreshold} MAD
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Courier Handoff & Dispatch Timeline Pipeline ── */}
      <div className="relative z-10 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EFAE54]">
            Traçabilité de Bout en Bout
          </span>
          <h4 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-1">
            Les 4 Étapes de votre Commande jusqu’à votre Tasse
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOGISTICS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xl font-black text-[#EFAE54]/40">
                      {step.stepNumber}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFAE54]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h5 className="text-sm font-bold text-white font-display">
                    {step.title}
                  </h5>
                  <div className="text-[11px] font-medium text-[#EFAE54] mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. WhatsApp Real-Time Tracking Hotline Callout ── */}
      <div className="relative z-10 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#161826] to-emerald-950/30 border border-emerald-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" />
            <span>Suivi Logistique WhatsApp Dédié</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            Une question sur votre colis ou un changement d’adresse de livraison ?
          </h4>
          <p className="text-xs sm:text-sm text-white/65 max-w-xl">
            Notre équipe logistique est joignable 6j/7 sur WhatsApp pour coordonner avec le coursier ou reprogrammer votre passage.
          </p>
        </div>

        <a
          href={whatsappTrackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#121421] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          id="morocco-delivery-whatsapp-tracking-cta"
        >
          <MessageCircle className="w-4 h-4 text-[#121421]" />
          <span>Suivre une Expédition sur WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
