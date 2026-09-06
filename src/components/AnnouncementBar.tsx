import { Link } from 'react-router-dom';
import { MessageSquare, ChevronRight, Truck } from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../data/bundles';

export function AnnouncementBar() {
  return (
    <div
      className="bg-[#121316] text-white py-2 px-4 border-b border-white/10"
      role="banner"
      aria-label="Informations de livraison et support"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Center copy: clickable link to /roastery-freshness */}
        <div className="flex-1 flex items-center justify-center">
          <Link
            to="/roastery-freshness"
            className="text-xs font-sans text-center leading-snug hover:text-[#EFAE54] transition-colors group flex items-center justify-center gap-1"
            id="announcement-freshness-link"
          >
            <span className="font-semibold text-white group-hover:text-[#EFAE54] transition-colors">
              Livraison 48h express partout au Maroc
            </span>
            <span className="mx-1.5 text-zinc-500">•</span>
            <span className="text-[#EFAE54] font-medium">Paiement à la livraison (COD)</span>
            <span className="mx-1.5 text-zinc-500 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline group-hover:text-white transition-colors">
              Torréfié chaque semaine à Casablanca
            </span>
            <span className="ml-1 text-[#EFAE54] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[11px] font-bold hidden md:inline">
              (Planning & SLAs →)
            </span>
          </Link>
        </div>

        {/* Right utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency badge */}
          <span className="hidden md:flex items-center font-mono text-[11px] text-zinc-300 border border-white/15 rounded-full px-2.5 py-0.5 bg-white/[0.04]">
            MAD ﺩ.ﻡ.
          </span>

          {/* WhatsApp link */}
          <a
            href={`https://wa.me/${WHATSAPP_CONTACT_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#EFAE54] transition-colors"
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
