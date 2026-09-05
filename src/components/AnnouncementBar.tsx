import { MessageSquare, ChevronRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div
      className="bg-[#121316] text-white py-2 px-4 border-b border-white/10"
      role="banner"
      aria-label="Informations de livraison et support"
    >
      <div className="container-outer flex items-center justify-between gap-4">
        {/* Center copy */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs font-sans text-center leading-snug">
            <span className="font-semibold text-white">
              Livraison 48h express partout au Maroc
            </span>
            <span className="mx-2 text-zinc-500">•</span>
            <span className="text-[#E89038] font-medium">Paiement à la livraison (COD)</span>
            <span className="mx-2 text-zinc-500 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">
              Torréfié chaque semaine à Casablanca
            </span>
          </p>
        </div>

        {/* Right utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency badge */}
          <span className="hidden md:flex items-center font-mono text-[11px] text-zinc-300 border border-white/15 rounded-full px-2.5 py-0.5 bg-white/[0.04]">
            MAD ﺩ.ﻡ.
          </span>

          {/* WhatsApp link */}
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#E89038] transition-colors"
            aria-label="Contactez-nous sur WhatsApp"
          >
            <MessageSquare size={13} strokeWidth={1.75} />
            <span className="hidden sm:inline">+212 600-000000</span>
            <ChevronRight size={11} strokeWidth={2} className="hidden sm:block" />
          </a>
        </div>
      </div>
    </div>
  );
}
