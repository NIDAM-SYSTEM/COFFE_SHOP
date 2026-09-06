import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Truck,
  Banknote,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Coffee,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  HelpCircle,
  Flame,
  Award,
  SlidersHorizontal,
} from 'lucide-react';
import { BUNDLES, bundleToCartPayload } from '../data/bundles';
import { BundleCard } from '../components/bundles/BundleCard';
import type { Bundle, CoffeeProduct, GrindOption } from '../types';

export interface StarterKitsPageProps {
  onAddToCartSpecialty?: (
    product: CoffeeProduct,
    grind: GrindOption,
    quantity?: number
  ) => void;
  onOpenCart?: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'easy-start',
    question: 'Je débute complètement : ces packs sont-ils vraiment faciles à utiliser sans expérience ?',
    answer:
      'Absolument. C’est la raison d’être de nos Starter Kits. Nous avons éliminé le casse-tête du matériel incompatible et des calculs ardus : chaque pack comprend le matériel nécessaire, le café déjà moulu au micron près pour cette méthode, et une fiche guide pas-à-pas avec des repères en cuillères de table ordinaires. Vous réussirez votre première extraction en moins de 4 minutes, sans aucune balance nécessaire.',
  },
  {
    id: 'kit-differences',
    question: 'Quelle est la différence entre le Kit Moka, le Kit Pour-Over et le Kit Barista ?',
    answer:
      'Le Kit Moka produit un café corsé, rond et sirupeux, parfait pour ceux qui aiment les expressos serrés ou les boissons lactées matinales. Le Kit Pour-Over (Hario V60) privilégie la clarté, les notes florales et fruitées délicates (café filtre de terroir). Le Kit Home Barista inclut le moulin haute précision Timemore C2 à meules acier inox et du café en grains entiers pour ceux qui désirent moudre leur café à la seconde près.',
  },
  {
    id: 'heat-sources',
    question: 'La cafetière Moka est-elle compatible avec ma plaque de cuisson ?',
    answer:
      'Notre cafetière Moka en aluminium alimentaire haute conductivité fonctionne directement sur feux à gaz, plaques électriques chauffantes et plaques vitrocéramiques. Pour les plaques à induction magnétique pure, il suffit d’utiliser un disque relais adaptateur en inox universel.',
  },
  {
    id: 'fresh-grind',
    question: 'Le café est-il moulu à l’avance ou fraîchement préparé avant l’envoi ?',
    answer:
      'Nous ne stockons aucun café pré-moulu. Dès réception de votre commande, notre maître torréfacteur prélève un lot fraîchement torréfié de la semaine et le moud sur nos meules professionnelles Mahlkönig EK43 calibrées spécifiquement pour le pack choisi (Moka fin ou Pour-Over moyen). Le paquet est ensuite scellé hermétiquement avec valve de dégazage unidirectionnelle.',
  },
  {
    id: 'cod-delivery',
    question: 'Comment fonctionne le paiement Cash à la livraison (Cash on Delivery) ?',
    answer:
      'Vous pouvez commander directement via le panier du site ou en un clic sur le bouton WhatsApp pré-rempli. Vous ne payez aucun centime en avance : le règlement se fait intégralement en dirhams (MAD) en espèces auprès du livreur au moment de la remise de votre colis en main propre chez vous.',
  },
  {
    id: 'cleaning-care',
    question: 'Comment nettoyer et entretenir mon équipement au quotidien ?',
    answer:
      'C’est très rapide et simple : rincez votre cafetière Moka ou votre dripper V60 uniquement à l’eau chaude/tiède sans liquide vaisselle agressif ni éponge abrasive afin de préserver les matériaux et le goût neutre du café. Laissez sécher à l’air libre. Pour le moulin Timemore C2, utilisez le petit pinceau dépoussiéreur fourni (ne jamais passer le moulin sous l’eau).',
  },
];

export const StarterKitsPage: React.FC<StarterKitsPageProps> = ({
  onAddToCartSpecialty,
  onOpenCart,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('easy-start');

  useEffect(() => {
    document.title = 'Starter Kits & Packs Matériel | Coffee House Maroc';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleBundleAddToCart = useCallback(
    (bundle: Bundle, customPayload?: CoffeeProduct) => {
      if (onAddToCartSpecialty) {
        const payload = customPayload || bundleToCartPayload(bundle);
        onAddToCartSpecialty(payload, 'Whole Bean', 1);
      }
      if (onOpenCart) {
        onOpenCart();
      }
    },
    [onAddToCartSpecialty, onOpenCart]
  );

  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421]">
      {/* ── 1. BREADCRUMBS & TOP NAVIGATION STRIP ── */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <nav className="flex items-center gap-2 text-white/60">
            <Link
              to="/"
              className="hover:text-[#EFAE54] transition-colors font-medium"
            >
              Accueil
            </Link>
            <span className="text-white/30">/</span>
            <Link
              to="/shop"
              className="hover:text-[#EFAE54] transition-colors font-medium"
            >
              Boutique Café
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#EFAE54] font-semibold">
              Starter Kits & Packs
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/50 font-medium">
            <Award className="w-3.5 h-3.5 text-[#EFAE54]" />
            <span>Sélection Torréfacteur Artisanal Certifiée</span>
          </div>
        </div>
      </div>

      {/* ── 2. HERO BANNER SECTION ── */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-white/10 bg-gradient-to-b from-[#191C2E] via-[#121421] to-[#121421]">
        {/* Ambient subtle glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EFAE54]/10 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Packs Débutants Clés en Main • Zéro Casse-Tête</span>
          </div>

          {/* Exact Required Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Tout ce qu'il vous faut pour démarrer le café de spécialité à la maison
          </h1>

          {/* Persona-focused Reassurance Subtitle */}
          <p className="mt-5 sm:mt-6 text-white/75 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Fini les hésitations sur la compatibilité du matériel et les calculs de mouture.
            Chaque pack réunit <span className="text-white font-semibold">l'équipement d'extraction indispensable</span>,
            un <span className="text-[#EFAE54] font-semibold">café de terroir fraîchement torréfié</span> et calibré,
            ainsi que notre <span className="text-white font-semibold">guide de recette pas-à-pas</span> avec repères en cuillères simples.
          </p>

          {/* Micro badges for instant trust */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-white/80">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EFAE54]" />
              <span>Matériel Garanti 1 An</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EFAE54]" />
              <span>Grains 100% Arabica de Terroir</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EFAE54]" />
              <span>Zéro Balance de Précision Requise</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VALUE REASSURANCE STRIP (48h Nationwide Delivery + Cash on Delivery + Guide d'extraction inclus) ── */}
      <section className="border-b border-white/10 bg-[#161826]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. 48h Nationwide Delivery */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center shrink-0 text-[#EFAE54] group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#EFAE54]">
                  48h Nationwide Delivery
                </span>
                <h3 className="text-white font-bold text-base mt-0.5 font-display">
                  Livraison 48h Partout au Maroc
                </h3>
                <p className="text-white/65 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Expédition express sécurisée vers Casablanca, Rabat, Marrakech, Tanger et toutes les villes du Royaume dans un carton double cannelure antichoc.
                </p>
              </div>
            </div>

            {/* 2. Cash on Delivery */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center shrink-0 text-[#EFAE54] group-hover:scale-105 transition-transform">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#EFAE54]">
                  Cash on Delivery (COD)
                </span>
                <h3 className="text-white font-bold text-base mt-0.5 font-display">
                  Paiement Cash à la Livraison
                </h3>
                <p className="text-white/65 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Achetez en toute sérénité sans carte bancaire : commandez en 1 clic et réglez directement en espèces (MAD) à votre livreur au pas de votre porte.
                </p>
              </div>
            </div>

            {/* 3. Guide d'extraction inclus */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/40 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center shrink-0 text-[#EFAE54] group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#EFAE54]">
                  Guide Inclus
                </span>
                <h3 className="text-white font-bold text-base mt-0.5 font-display">
                  Guide d'Extraction & Ratios
                </h3>
                <p className="text-white/65 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Fiche recette plastifiée offerte dans chaque boîte : équivalences en cuillères ordinaires, températures d'eau idéales et pas-à-pas illustré inratable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. RESPONSIVE 3-COLUMN BUNDLE GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Section Title & Philosophy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EFAE54] mb-2">
              <Flame className="w-4 h-4" />
              <span>Sélection de la Saison</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              Choisissez Votre Rituel Café
            </h2>
          </div>
          <p className="text-white/60 text-xs sm:text-sm max-w-md">
            Chaque pack est conçu pour vous offrir une expérience d’extraction complète sans aucun achat supplémentaire nécessaire.
          </p>
        </div>

        {/* 3-Column Bundle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {BUNDLES.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onAddToCart={handleBundleAddToCart}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* ── 5. HOW IT WORKS / THREE SIMPLE STEPS ── */}
      <section className="border-t border-b border-white/10 bg-[#161826]/40 py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EFAE54]">
              Simplicité Totale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Comment ça marche ?
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-2">
              3 étapes limpides entre votre commande et votre première tasse d’exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#EFAE54]/20 text-[#EFAE54] font-bold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-white font-bold text-base font-display">
                Choisissez votre méthode
              </h3>
              <p className="text-white/65 text-xs sm:text-sm mt-2 leading-relaxed">
                Moka corsé à l'italienne, Pour-Over V60 aromatique ou Home Barista avec moulin : sélectionnez le profil qui correspond à votre style de dégustation.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#EFAE54]/20 text-[#EFAE54] font-bold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-white font-bold text-base font-display">
                Torréfaction & Mouture sur mesure
              </h3>
              <p className="text-white/65 text-xs sm:text-sm mt-2 leading-relaxed">
                Nous préparons votre café à la commande : grains fraîchement torréfiés moulus avec une précision absolue adaptée exactement à votre machine.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#EFAE54]/20 text-[#EFAE54] font-bold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-white font-bold text-base font-display">
                Livraison 48h & Dégustation
              </h3>
              <p className="text-white/65 text-xs sm:text-sm mt-2 leading-relaxed">
                Recevez votre coffret chez vous partout au Maroc, payez en Cash à la réception et suivez la fiche guide pour un résultat digne d'un coffee shop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BEGINNER FAQ ACCORDION (Addressing Mouna's hesitations) ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/20 text-[#EFAE54] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions Fréquentes Spécial Débutant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Des questions pour débuter sereinement ?
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-2">
            Tout ce que vous devez savoir pour réussir votre café dès le premier jour.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
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

      {/* ── 7. PRO / GIFT CONCIERGE CALLOUT BANNER (Linking to /contact) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-[#EFAE54]/30 bg-gradient-to-r from-[#1E2238] via-[#161826] to-[#1E2238] p-8 sm:p-12 lg:p-14 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFAE54]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EFAE54] mb-3">
              <HeartHandshake className="w-4 h-4" />
              <span>Service Cadeaux & Entreprises</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
              Offrir un kit ou composer un coffret sur-mesure ?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm sm:text-base mt-3 leading-relaxed">
              Vous désirez offrir une box café personnalisée avec mot d'accompagnement manuscrit, ou équiper votre bureau avec plusieurs packs ? Notre équipe concierge s'occupe de tout.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-sm tracking-wide shadow-lg hover:shadow-[#EFAE54]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Contacter le Concierge Café</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
