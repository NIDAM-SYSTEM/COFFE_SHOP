import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  Award,
  Truck,
  Flame,
  Wrench,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Users,
  FileDown,
  CheckCircle2,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';

export interface WholesaleHeroProps {
  onSampleClick?: () => void;
  className?: string;
}

export const WholesaleHero: React.FC<WholesaleHeroProps> = ({
  onSampleClick,
  className = '',
}) => {
  const [downloadNotice, setDownloadNotice] = useState(false);

  const whatsappWholesaleUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    'Salam NIDAM Coffee, je suis responsable d’un café / restaurant / entreprise et je souhaite échanger au sujet de votre offre B2B et grille tarifaire de gros.'
  )}`;

  const handleSampleScroll = (e: React.MouseEvent) => {
    if (onSampleClick) {
      e.preventDefault();
      onSampleClick();
      return;
    }
    const target = document.getElementById('sample-form');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadClick = () => {
    setDownloadNotice(true);
    setTimeout(() => {
      setDownloadNotice(false);
    }, 4000);
  };

  return (
    <section
      className={`relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-white/10 bg-gradient-to-b from-[#191C2E] via-[#121421] to-[#121421] ${className}`}
      aria-label="Espace B2B Wholesale Hero"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-[#EFAE54]/10 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#DE9839]/10 rounded-full blur-[100px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
          <Building2 className="w-3.5 h-3.5" />
          <span>Offre Professionnelle B2B • Torréfaction & Équipement</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Partenaire Café de Spécialité pour Cafés, Restaurants & Entreprises
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-white/75 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
          Élevez l'expérience café de vos clients et collaborateurs grâce à nos terroirs d'exception torréfiés sur-mesure chaque semaine, notre rigueur de calibrage technique sur site et un approvisionnement ponctuel partout au Maroc.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {/* Primary CTA: Sample Request Form */}
          <a
            href="#sample-form"
            onClick={handleSampleScroll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-sm tracking-wide shadow-lg shadow-[#EFAE54]/20 hover:shadow-[#EFAE54]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            id="wholesale-hero-sample-cta"
          >
            <span>Demander un Pack D'échantillons</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Direct B2B Pricing PDF Download CTA */}
          <a
            href="/docs/grille-tarifaire-b2b-coffee-house.pdf"
            download="Grille-Tarifaire-B2B-Coffee-House.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#EFAE54]/50 text-white font-semibold text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] group"
            id="wholesale-hero-download-catalog-cta"
          >
            <FileDown className="w-4 h-4 text-[#EFAE54] group-hover:translate-y-0.5 transition-transform" />
            <span>Télécharger la Grille Tarifaire B2B (PDF)</span>
          </a>

          {/* WhatsApp Direct Hotline CTA */}
          <a
            href={whatsappWholesaleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-white/90 hover:text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            id="wholesale-hero-whatsapp-cta"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Hotline B2B WhatsApp</span>
          </a>
        </div>

        {/* Temporary Download Feedback Notice */}
        {downloadNotice && (
          <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Téléchargement initié : Grille-Tarifaire-B2B-Coffee-House.pdf</span>
          </div>
        )}

        {/* 4 Pillars Highlight Grid */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {/* Pillar 1: Roast Consistency */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/25 flex items-center justify-center text-[#EFAE54] mb-3.5 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-display">
              Répétabilité & Profilage Précis
            </h4>
            <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
              Courbes de chauffe enregistrées par lot : même profil gustatif, même extraction et zéro amertume semaine après semaine.
            </p>
          </div>

          {/* Pillar 2: 48h Scheduled Deliveries */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3.5 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-display">
              Livraisons 48h Programmées
            </h4>
            <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
              Expéditions express régulières à Casablanca, Rabat, Marrakech, Tanger et tout le Maroc en direct de notre atelier.
            </p>
          </div>

          {/* Pillar 3: On-Site Barista Calibration */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400 mb-3.5 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-display">
              Calibrage Machine sur Site
            </h4>
            <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
              Nos baristas formateurs vous accompagnent : réglage des meules, audit de température et formation de vos équipes au bar.
            </p>
          </div>

          {/* Pillar 4: Fiscal & Legal Compliance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#EFAE54]/30 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-display">
              Facturation 100% Conforme
            </h4>
            <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
              Factures officielles B2B avec ICE, IF, RC et Patente avec TVA déductible. Conditions de règlement négociées pour comptes réguliers.
            </p>
          </div>
        </div>

        {/* Social Proof Stats Counter */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#EFAE54]" />
            <span><strong className="text-white">40+</strong> Cafés & Hôtels Partenaires</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#EFAE54]" />
            <span><strong className="text-white">SCA 86+</strong> Lots Éthiques Tracés</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#EFAE54]" />
            <span><strong className="text-white">100%</strong> Villes du Maroc Couvertes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
