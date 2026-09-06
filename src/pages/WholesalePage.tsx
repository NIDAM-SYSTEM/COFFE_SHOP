import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Sparkles,
  Award,
  Truck,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { WholesaleHero } from '../components/wholesale/WholesaleHero';
import { VolumeTiersGrid, VolumeTier } from '../components/wholesale/VolumeTiersGrid';
import { FiscalComplianceBadge } from '../components/wholesale/FiscalComplianceBadge';
import { B2BSampleForm } from '../components/wholesale/B2BSampleForm';
import { WHATSAPP_CONTACT_PHONE } from '../data/bundles';

interface B2BFAQItem {
  id: string;
  question: string;
  answer: string;
}

const B2B_FAQS: B2BFAQItem[] = [
  {
    id: 'sample-pack',
    question: 'Comment puis-je recevoir un pack d’échantillons de dégustation gratuit ?',
    answer:
      'Il vous suffit de remplir le formulaire ci-dessus ou de nous contacter directement sur WhatsApp. Nous expédions gratuitement sous 48h un coffret découverte comprenant 3 paquets de 250g (profils chocolaté, fruité et équilibré) ainsi que notre catalogue grossiste complet et les grilles de remises dégressives.',
  },
  {
    id: 'machine-calibration',
    question: 'Assurez-vous le réglage et le calibrage de notre matériel sur site ?',
    answer:
      'Absolument. Dès le palier 25-50 kg/mois, notre équipe de baristas formateurs intervient directement dans votre café ou restaurant pour calibrer la granulométrie de vos moulins, vérifier la pression et la température de votre groupe espresso, et former votre équipe aux gestes d’extraction parfaits.',
  },
  {
    id: 'delivery-schedule',
    question: 'Quels sont vos délais et fréquences d’approvisionnement au Maroc ?',
    answer:
      'Nous livrons sous 24h à 48h partout au Maroc (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, etc.). Pour nos partenaires réguliers, nous mettons en place des expéditions programmées hebdomadaires ou bi-hebdomadaires, vous garantissant un stock toujours fraîchement torréfié sans immobilisation excessive de trésorerie.',
  },
  {
    id: 'fiscal-invoicing',
    question: 'Fournissez-vous des factures officielles conformes avec TVA déductible ?',
    answer:
      'Oui, à 100%. Coffee House est une société légalement enregistrée au Maroc. Toutes nos transactions font l’objet d’une facture normalisée mentionnant nos identifiants officiels (ICE, IF, RC, Patente) avec TVA 20% récupérable pour votre comptabilité d’entreprise.',
  },
  {
    id: 'custom-blend',
    question: 'Pouvons-nous développer notre propre blend signature ou ensachage personnalisé ?',
    answer:
      'Oui, à partir du palier 50 kg/mois, notre Maître Torréfacteur co-développe avec vous une recette d’assemblage exclusive (Signature Roast) qui correspond exactement à l’identité de votre établissement. Nous proposons également un service d’ensachage à vos couleurs (White Label ou co-branding).',
  },
  {
    id: 'payment-terms',
    question: 'Quelles sont les modalités de règlement acceptées pour les professionnels ?',
    answer:
      'Les premières commandes sont réglées par virement bancaire ou chèque à la livraison. Après 3 mois de partenariat et validation du dossier comptable, nous ouvrons un compte professionnel avec facilités de paiement à 30 jours fin de mois.',
  },
];

export const WholesalePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>('sample-pack');
  const [selectedVolumeTier, setSelectedVolumeTier] = useState<string>(
    '25 – 50 kg / mois (Specialty Café & Resto)'
  );

  useEffect(() => {
    document.title = 'B2B & Wholesale Café de Spécialité | Coffee House Maroc';
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleSelectTier = (tier: VolumeTier) => {
    setSelectedVolumeTier(tier.volumeRange);
  };

  const handleHeroSampleClick = () => {
    const el = document.getElementById('sample-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappGeneralB2BUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    'Salam NIDAM Coffee, je représente un établissement professionnel et je souhaite échanger directement avec votre département B2B & Wholesale.'
  )}`;

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
              Espace Professionnel B2B & Wholesale
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/50 font-medium">
            <Building2 className="w-3.5 h-3.5 text-[#EFAE54]" />
            <span>Solutions Torréfaction & Équipement Cafés / Entreprises</span>
          </div>
        </div>
      </div>

      {/* ── 2. Wholesale Hero Section ── */}
      <WholesaleHero onSampleClick={handleHeroSampleClick} />

      {/* ── 3. Volume Tiers Grid ── */}
      <VolumeTiersGrid onSelectTier={handleSelectTier} />

      {/* ── 4. Main Conversion Area: Fiscal Compliance + B2B Sample Form ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Fiscal Compliance Banner */}
        <FiscalComplianceBadge />

        {/* Lead & Sample Request Form */}
        <B2BSampleForm initialVolumeTier={selectedVolumeTier} />
      </section>

      {/* ── 5. B2B FAQ Accordion ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/20 text-[#EFAE54] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>F.A.Q Professionnels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Questions Fréquentes sur notre Partenariat B2B
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-2">
            Tout savoir sur les commandes de gros, les échantillons, la formation et la facturation.
          </p>
        </div>

        <div className="space-y-4">
          {B2B_FAQS.map((faq) => {
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

      {/* ── 6. Bottom Direct Commercial Hotline Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-[#EFAE54]/30 bg-gradient-to-r from-[#1E2238] via-[#161826] to-[#1E2238] p-8 sm:p-12 lg:p-14 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EFAE54] mb-3">
              <PhoneCall className="w-4 h-4" />
              <span>Contact Direct Département Commercial</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
              Vous ouvrez un nouvel établissement ou préparez un appel d'offres ?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm sm:text-base mt-3 leading-relaxed">
              Nos consultants café et notre roastmaster sont à votre disposition pour auditer vos besoins, vous faire déguster nos lots directement dans vos locaux ou dans notre torréfaction.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={whatsappGeneralB2BUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-sm tracking-wide shadow-lg shadow-[#EFAE54]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#121421]" />
              <span>WhatsApp Direction B2B</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              <span>Page Contact</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
