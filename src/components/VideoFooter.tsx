import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Coffee, Clock, MapPin, Phone, Mail, X } from 'lucide-react';

export const VideoFooter: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <footer id="facility" className="w-full bg-[#121421] text-white pt-12 border-t border-white/10">
      {/* ------------------------------------------------------------- */}
      {/* 1. VIDEO CTA BANNER                                           */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 p-10 sm:p-14 text-center">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#EFAE54]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Central Golden Circular Play Button */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              aria-label="Play coffee brewing documentary video"
              className="bg-[#EFAE54] hover:bg-[#DE9839] w-14 h-14 rounded-full flex items-center justify-center text-[#121421] mx-auto shadow-lg shadow-amber-500/20 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#EFAE54]/40 group"
              id="video-play-btn"
            >
              <Play className="w-6 h-6 fill-[#121421] translate-x-0.5 group-hover:scale-105 transition-transform" />
            </button>

            {/* Subtitle */}
            <h3 className="text-white text-xl sm:text-2xl font-bold font-display text-center mt-4">
              Ready For Healthy Life
            </h3>
            <p className="text-white/60 text-xs sm:text-sm max-w-md mt-2 font-light">
              Watch our master roaster describe how precision temperature profiling enhances every morning note and antioxidant profile.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CATEGORIZED FOOTER COLUMNS                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="border-t border-white/10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: Brand Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#EFAE54] flex items-center justify-center text-[#121421]">
                  <Coffee className="w-5 h-5" strokeWidth={2.2} />
                </div>
                <span className="font-display font-black text-xl text-white tracking-wide">
                  COFFEE<span className="text-[#EFAE54]">HOUSE</span>
                </span>
              </div>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed font-light mb-5">
                Elevating your daily coffee ritual with ethically sourced single-origins, cozy co-working sanctuaries, and artisanal baked treats.
              </p>
              <div className="flex items-center gap-3 text-white/60 text-xs">
                <MapPin className="w-4 h-4 text-[#EFAE54] shrink-0" />
                <span>124 Roastery Avenue, Downtown Quarter</span>
              </div>
              <Link
                to="/roastery-freshness"
                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors w-fit"
                id="footer-trust-freshness-badge"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>Torréfié 2x/semaine • Garantie Fraîcheur</span>
              </Link>
            </div>

            {/* Column 2: Facility */}
            <div className="flex flex-col">
              <h4 className="font-display text-base font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EFAE54]" />
                Facility
              </h4>
              <ul className="space-y-2.5 text-sm text-white/65">
                <li>
                  <a href="#facility" className="hover:text-[#EFAE54] transition-colors">
                    Private Room
                  </a>
                </li>
                <li>
                  <a href="#facility" className="hover:text-[#EFAE54] transition-colors">
                    Event Space
                  </a>
                </li>
                <li>
                  <a href="#facility" className="hover:text-[#EFAE54] transition-colors">
                    Creative Studio
                  </a>
                </li>
                <li>
                  <a href="#facility" className="hover:text-[#EFAE54] transition-colors">
                    Custom Room
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Product */}
            <div className="flex flex-col">
              <h4 className="font-display text-base font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EFAE54]" />
                Product & Shop
              </h4>
              <ul className="space-y-2.5 text-sm text-white/65">
                <li>
                  <Link
                    to="/starter-kits"
                    className="hover:text-[#EFAE54] transition-colors flex items-center gap-1.5 font-medium text-white/90 group"
                    id="footer-link-starter-kits"
                  >
                    <span className="text-[#EFAE54] text-xs">★</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">Starter Kits & Packs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="hover:text-[#EFAE54] transition-colors"
                    id="footer-link-shop"
                  >
                    Specialty Coffee
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/salvador-san-alberto"
                    className="hover:text-[#EFAE54] transition-colors"
                    id="footer-link-microlot"
                  >
                    Micro-Lot Curation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wholesale"
                    className="hover:text-[#EFAE54] transition-colors flex items-center gap-1.5 font-medium text-white/90 group"
                    id="footer-link-wholesale"
                  >
                    <span className="text-[#EFAE54] text-xs">◆</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">B2B & Wholesale Portal</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roastery-freshness"
                    className="hover:text-[#EFAE54] transition-colors flex items-center gap-1.5 font-medium text-emerald-400 group"
                    id="footer-link-roastery-freshness"
                  >
                    <span className="text-emerald-400 text-xs">⚡</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">Fraîcheur & Logistique SLA</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order-tracking"
                    className="hover:text-[#EFAE54] transition-colors flex items-center gap-1.5 font-medium text-white/90 group"
                    id="footer-link-order-tracking"
                  >
                    <span className="text-[#EFAE54] text-xs">📦</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">Suivi de Commande</span>
                  </Link>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#EFAE54] transition-colors">
                    Café Menu
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#EFAE54] transition-colors"
                    id="footer-link-contact"
                  >
                    Contact & Reservations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Opening Hours */}
            <div className="flex flex-col">
              <h4 className="font-display text-base font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EFAE54]" />
                Opening Hours
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-white/65">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="font-medium text-white/85">Monday – Friday</span>
                  <span className="font-mono text-[#EFAE54]">09:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="font-medium text-white/85">Saturday</span>
                  <span className="font-mono text-[#EFAE54]">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-white/85">Sunday</span>
                  <span className="text-red-400 font-semibold uppercase text-xs">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
            <p>© {new Date().getFullYear()} Coffee House Roastery. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#home" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#home" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#home" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#121421] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-display font-bold text-white text-base">
                Coffee House — The Roasting Craft
              </span>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Coffee Roasting Journey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

