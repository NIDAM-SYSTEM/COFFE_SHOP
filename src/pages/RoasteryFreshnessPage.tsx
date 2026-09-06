import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Truck,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Coffee,
  CheckCircle2,
  Clock,
  Package,
} from 'lucide-react';
import { RoastCalendarCard } from '../components/freshness/RoastCalendarCard';
import { MoroccoDeliveryMap } from '../components/freshness/MoroccoDeliveryMap';
import { CodInspectionPolicy } from '../components/freshness/CodInspectionPolicy';
import { RoastAlertModal } from '../components/freshness/RoastAlertModal';

interface FreshnessFAQ {
  id: string;
  question: string;
  answer: string;
}

const FRESHNESS_FAQS: FreshnessFAQ[] = [
  {
    id: 'degassing-time',
    question: 'Pourquoi le café a-t-il besoin de repos (dégazage) après la torréfaction ?',
    answer:
      'Pendant la torréfaction, le grain de café emprisonne une grande quantité de dioxyde de carbone (CO₂). S’il est extrait immédiatement (dans les 48h), le gaz perturbe l’eau et crée une amertume piquante. Nous conseillons de déguster nos cafés entre 5 et 28 jours après la date de cuisson inscrite sur le sachet : c’est le pic aromatique absolu (la "fenêtre d’or").',
  },
  {
    id: 'cod-refusal',
    question: 'Puis-je réellement refuser le colis si la date de torréfaction ne me convient pas ?',
    answer:
      'Oui, absolument. C’est notre engagement "Inspection avant Paiement". Lorsque le livreur vous remet le colis, vous pouvez examiner le paquet et vérifier la date manuscrite. Si elle dépasse 14 jours ou si la valve est endommagée, vous pouvez refuser le colis sans aucun frais ni justification.',
  },
  {
    id: 'bag-valve',
    question: 'À quoi sert la valve blanche présente sur les sachets ?',
    answer:
      'Il s’agit d’une valve de dégazage unidirectionnelle haute performance. Elle permet au CO₂ de s’échapper naturellement du sachet sans jamais laisser l’air extérieur ni l’humidité pénétrer. Grâce à elle et à notre matériau triple couche hermétique, le café reste protégé de l’oxydation jusqu’à 60 jours.',
  },
  {
    id: 'dispatch-tracking',
    question: 'Comment vais-je recevoir le lien de suivi de ma commande ?',
    answer:
      'Dès que votre commande est prise en charge par notre coursier ou notre transporteur partenaire (le Mardi ou le Vendredi), un message WhatsApp automatique vous est envoyé avec votre numéro d’expédition et le contact de l’agence ou du coursier en charge de votre secteur.',
  },
  {
    id: 'urgent-roast',
    question: 'Puis-je commander un batch spécifique pour un événement ou un restaurant ?',
    answer:
      'Oui. Pour les commandes professionnelles ou les volumes supérieurs à 10 kg, notre Maître Torréfacteur peut planifier une session de cuisson dédiée le jour de votre choix. Rendez-vous sur notre page Wholesale / B2B pour en faire la demande.',
  },
];

export const RoasteryFreshnessPage: React.FC = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>('degassing-time');

  useEffect(() => {
    document.title = 'Fraîcheur & Logistique de Torréfaction | Coffee House Maroc';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421]">
      {/* ── 1. Top Breadcrumbs ── */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-2 text-white/60">
            <Link to="/" className="hover:text-[#EFAE54] transition-colors font-medium">
              Accueil
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#EFAE54] font-semibold">
              Fraîcheur, Planning & Logistique
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/50 font-medium">
            <Flame className="w-3.5 h-3.5 text-[#EFAE54]" />
            <span>Torréfié 2x par semaine à Casablanca • Expédition 24h / 48h</span>
          </div>
        </div>
      </div>

      {/* ── 2. Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-white/10 bg-gradient-to-b from-[#191C2E] via-[#121421] to-[#121421]">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#EFAE54]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparence Totale & Chaîne du Froid Aromatique</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Engagements Fraîcheur, Planning de Torréfaction & Logistique Maroc
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Zéro café stocké des mois sur des étagères. Chez Coffee House, chaque paquet de spécialité est cuit lors de nos sessions hebdomadaires du <strong>Lundi</strong> et du <strong>Jeudi</strong>, scellé sous valve étanche et livré à votre porte avec droit d’inspection avant tout paiement.
          </p>

          {/* Hero Value Anchors Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-white/80">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Flame className="w-4 h-4 text-[#EFAE54]" />
              <span>2 Sessions / Semaine</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Livraison 24h/48h Partout au Maroc</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#EFAE54]" />
              <span>Inspection Sachet avant Paiement COD</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Main Content: 3 Core Pillars ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Pillar 1: Weekly Roasting Calendar Card */}
        <RoastCalendarCard onSubscribeClick={() => setIsAlertModalOpen(true)} />

        {/* Pillar 2: Morocco Delivery SLA Map */}
        <MoroccoDeliveryMap />

        {/* Pillar 3: COD Inspection Policy & 14-Day Freshness Guarantee */}
        <CodInspectionPolicy />

        {/* ── 4. Freshness FAQ Accordion ── */}
        <section className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/20 text-[#EFAE54] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions Fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Tout Comprendre sur la Fraîcheur & les Délais
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-2">
              Les réponses de notre Maître Torréfacteur pour une dégustation optimale.
            </p>
          </div>

          <div className="space-y-4">
            {FRESHNESS_FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-display pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen
                          ? 'bg-[#EFAE54] text-[#121421] rotate-180'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. Bottom Conversion Banner ── */}
        <section className="rounded-3xl overflow-hidden border border-[#EFAE54]/30 bg-gradient-to-r from-[#1E2238] via-[#161826] to-[#1E2238] p-8 sm:p-12 lg:p-14 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EFAE54] mb-3">
              <Coffee className="w-4 h-4" />
              <span>Prêt(e) à goûter la différence ?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
              Commandez votre paquet de la prochaine fournée
            </h3>
            <p className="text-white/70 text-xs sm:text-sm sm:text-base mt-3 leading-relaxed">
              Explorez nos micro-lots fraîchement torréfiés ou nos packs matériel complets pour préparer le meilleur café à la maison.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-sm tracking-wide shadow-lg shadow-[#EFAE54]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="freshness-footer-shop-cta"
            >
              <span>Voir la Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/wholesale"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              id="freshness-footer-wholesale-cta"
            >
              <span>Espace B2B & Wholesale</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── 6. Alert Preferences Modal ── */}
      <RoastAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </div>
  );
};
