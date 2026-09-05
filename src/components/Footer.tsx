import { MapPin, Phone, Mail, MessageSquare, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#121316] text-white pt-20 border-t border-white/10" aria-label="Pied de page NIDAM Roastery">
      <div className="container-outer">

        {/* Top Call to Action Banner: Ready for Better Coffee */}
        <div className="card-dark bg-[#1A1C23] border border-white/15 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-dark-card">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[#E89038] uppercase font-bold tracking-widest">
              Rejoignez le Mouvement Specialty Coffee
            </span>
            <h2 className="display-font text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
              <span className="font-serif">REady</span> for Better Coffee ?
            </h2>
            <p className="font-sans text-sm text-[#A1A1AA] leading-relaxed">
              Commandez votre premier sachet torréfié cette semaine. Livraison 48h partout au Maroc avec paiement à la réception.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#menu" className="btn-pill-amber group">
              <span>Commander Maintenant</span>
              <span className="btn-arrow-circle" aria-hidden="true">
                <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary"
            >
              <MessageSquare size={16} className="text-[#E89038]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">

          {/* Col 1: Identity & Casablanca Workshop */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#E89038]/20 border border-[#E89038]/50 flex items-center justify-center font-serif font-bold text-sm text-[#E89038]">
                N
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                NIDAM<span className="text-[#E89038]">.</span>
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA] tracking-widest uppercase">ROASTERY</span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
              Torréfaction artisanale de cafés de spécialité basée à Casablanca. Nous sélectionnons des grains éthiques d'origine unique et calibrons chaque mouture sur mesure.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-zinc-300 font-sans">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E89038] shrink-0" />
                <span>Atelier : Quartier Gauthier, Casablanca, Maroc</span>
              </div>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E89038] transition-colors"
              >
                <Phone size={14} className="text-[#E89038] shrink-0" />
                <span>+212 600-000000 (WhatsApp)</span>
              </a>
              <a
                href="mailto:hello@nidam.ma"
                className="flex items-center gap-2 hover:text-[#E89038] transition-colors"
              >
                <Mail size={14} className="text-[#E89038] shrink-0" />
                <span>hello@nidam.ma</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E89038] hover:text-[#121316] flex items-center justify-center transition-colors"
                aria-label="Instagram NIDAM"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E89038] hover:text-[#121316] flex items-center justify-center transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Facility */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E89038] font-semibold mb-4">
              Facility & Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A1A1AA]">
              {[
                { label: 'Accueil NIDAM', href: '#' },
                { label: 'Menu & Cuissons Actuelles', href: '#menu' },
                { label: 'Kits Débutants (Moka & V60)', href: '#bundles' },
                { label: 'Atelier de Torréfaction', href: '#wholesale' },
                { label: 'Espace Professionnels (B2B)', href: '#wholesale' },
                { label: 'Avis & Stories Clients', href: '#reviews' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products & Origins */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E89038] font-semibold mb-4">
              Nos Cafés & Méthodes
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A1A1AA]">
              {[
                'Salvador San Alberto (Washed)',
                'Ethiopia Sidamo Guji (Natural)',
                'Colombia Huila Supremo',
                'Atlas Crema Espresso Blend',
                'Mouture Moka Pot Italienne',
                'Mouture V60 Filtre Papier',
                'Grains Entiers (Whole Bean)',
              ].map((item) => (
                <li key={item}>
                  <a href="#menu" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Opening Hours & Roast Days */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E89038] font-semibold mb-4">
              Jours de Torréfaction & Horaires
            </h3>

            <div className="bg-[#1A1C23] border border-white/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-[#E89038]" />
                <span className="font-mono text-xs font-bold text-white uppercase">
                  Cuissons Hebdomadaires
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-300">
                <strong className="text-[#E89038]">Lundi & Jeudi :</strong> Sessions de cuisson dès 07h00.
              </p>
              <p className="font-sans text-xs text-zinc-400 mt-1">
                Expédition l'après-midi même pour une livraison sous 24h-48h.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#2D6A4F]" />
                <span>Livraison partout au Maroc (48h)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#2D6A4F]" />
                <span>Paiement en espèces à la livraison (COD)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {currentYear} NIDAM Roastery SARL</span>
            <span>•</span>
            <span>ICE : 00293819200003</span>
            <span>•</span>
            <span>RC Casablanca 48921</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400">Règlement :</span>
            {['Paiement COD', 'Espèces Porte', 'Virement CIH', 'Attijari'].map((b) => (
              <span
                key={b}
                className="bg-white/[0.06] border border-white/10 text-zinc-300 px-2 py-0.5 rounded text-[10px]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
