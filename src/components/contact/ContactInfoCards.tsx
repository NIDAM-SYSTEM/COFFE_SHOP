import React from 'react';
import { MapPin, Clock, Phone, Mail, Sparkles } from 'lucide-react';

export const ContactInfoCards: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Flagship Location Card */}
      <div className="bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-dark-card group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/10 border border-[#EFAE54]/25 flex items-center justify-center text-[#EFAE54] shrink-0 group-hover:scale-105 transition-transform">
            <MapPin className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EFAE54]/15 text-[#EFAE54] text-xs font-semibold tracking-wide">
              Flagship Roastery
            </div>
            <h3 className="text-lg font-bold text-white font-display pt-1">
              Coffee House Downtown
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              148 Artisan Boulevard, Suite 100<br />
              Downtown Arts District, Seattle, WA 98101
            </p>
          </div>
        </div>
      </div>

      {/* 2. Opening Hours Card */}
      <div className="bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-dark-card group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/10 border border-[#EFAE54]/25 flex items-center justify-center text-[#EFAE54] shrink-0 group-hover:scale-105 transition-transform">
            <Clock className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="space-y-2 flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">
                Brewing Hours
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Today
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm pt-1">
              <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/5">
                <p className="text-[#EFAE54] font-semibold text-xs uppercase tracking-wider">
                  Monday – Friday
                </p>
                <p className="text-white font-medium mt-0.5">06:30 AM – 09:00 PM</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-2.5 border border-white/5">
                <p className="text-[#EFAE54] font-semibold text-xs uppercase tracking-wider">
                  Saturday – Sunday
                </p>
                <p className="text-white font-medium mt-0.5">07:30 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Direct Contact Channels */}
      <div className="bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-dark-card group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFAE54]/10 border border-[#EFAE54]/25 flex items-center justify-center text-[#EFAE54] shrink-0 group-hover:scale-105 transition-transform">
            <Phone className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="space-y-3 flex-grow">
            <h3 className="text-lg font-bold text-white font-display">
              Get in Touch Directly
            </h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="tel:+12065550192"
                className="flex items-center gap-3 text-white/80 hover:text-[#EFAE54] transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#EFAE54]/30"
              >
                <Phone className="w-4 h-4 text-[#EFAE54]" />
                <span className="font-medium">+1 (206) 555-0192</span>
              </a>
              <a
                href="mailto:hello@coffeehouse.com"
                className="flex items-center gap-3 text-white/80 hover:text-[#EFAE54] transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#EFAE54]/30"
              >
                <Mail className="w-4 h-4 text-[#EFAE54]" />
                <span className="font-medium">hello@coffeehouse.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Event & Studio Booking Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EFAE54]/15 to-[#DE9839]/5 border border-[#EFAE54]/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#EFAE54] text-[#121421] flex items-center justify-center font-bold shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm font-display">
            Looking for Event Spaces or Creative Studios?
          </h4>
          <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
            Our 30+ event spaces and 20+ soundproof creative studios include tailored artisanal catering.
          </p>
        </div>
      </div>

      {/* 5. Social Presence */}
      <div className="pt-2 flex items-center justify-between text-xs text-white/60">
        <span>Follow our roasting journey:</span>
        <div className="flex items-center gap-2">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#EFAE54] hover:text-[#121421] text-white/80 flex items-center justify-center transition-all duration-200"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#EFAE54] hover:text-[#121421] text-white/80 flex items-center justify-center transition-all duration-200"
            aria-label="Twitter"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#EFAE54] hover:text-[#121421] text-white/80 flex items-center justify-center transition-all duration-200"
            aria-label="Facebook"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
