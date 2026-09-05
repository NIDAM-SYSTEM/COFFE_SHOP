import { useState, useCallback } from 'react';
import { Send, Building2, ChevronDown, CheckCircle2, FileText, Calendar, Sparkles } from 'lucide-react';
import type { WholesaleFormData } from '../types';

const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tangier',
  'Agadir', 'Fes', 'Meknes', 'Oujda', 'Autre',
];

const VOLUMES = [
  '5–15 kg / semaine',
  '15–30 kg / semaine',
  '30–50 kg / semaine',
  '50kg+ / semaine (Grand compte)',
];

const EMPTY: WholesaleFormData = { cafeName: '', city: '', whatsapp: '', monthlyVolume: '' };

export function WholesaleBanner() {
  const [form, setForm] = useState<WholesaleFormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    },
    []
  );

  return (
    <section
      id="wholesale"
      aria-labelledby="wholesale-heading"
      className="relative bg-[#1A1C23] text-white py-16 sm:py-24"
    >
      <div className="container-outer">
        <div className="card-dark bg-gradient-to-br from-[#2A2D34] to-[#1E1F24] rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden shadow-dark-card">

          {/* Background decorative glow */}
          <div
            className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#E89038]/10 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">

            {/* Left: Pitch & Value Pillars (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E89038]/15 border border-[#E89038]/30 mb-4">
                <Building2 size={16} className="text-[#E89038]" />
                <span className="font-mono text-xs text-[#E89038] uppercase font-bold tracking-wider">
                  Partenariat B2B & Cafés
                </span>
              </div>

              <h2
                id="wholesale-heading"
                className="display-font text-3xl sm:text-5xl font-bold text-white mb-4 leading-[1.12]"
              >
                Approvisionnement de Cafés{' '}
                <span className="text-[#E89038] italic font-serif">à Travers le Maroc</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8 max-w-xl">
                Rehaussez la réputation de votre établissement avec des lots de spécialité réguliers, une torréfaction sur-mesure pour votre équipement, une facturation formelle (ICE + TVA) et un accompagnement barista dédié.
              </p>

              {/* 4 Feature stats blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {[
                  { icon: <Sparkles size={16} className="text-[#E89038]" />, val: '5–100kg', label: 'Lots en Vrac' },
                  { icon: <Calendar size={16} className="text-[#E89038]" />, val: 'Hebdo', label: 'Livraison Fixe' },
                  { icon: <FileText size={16} className="text-[#E89038]" />, val: 'ICE + TVA', label: 'Facturation Pro' },
                  { icon: <CheckCircle2 size={16} className="text-[#E89038]" />, val: 'Formation', label: 'Barista Calibré' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex flex-col items-start gap-1"
                  >
                    <div className="mb-1">{item.icon}</div>
                    <p className="display-font font-bold text-lg text-white">{item.val}</p>
                    <p className="font-mono text-[10px] text-zinc-400 uppercase">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lead Inquiry Form (5 cols) */}
            <div className="lg:col-span-5 w-full bg-[#1A1C23]/90 rounded-2xl border border-white/15 p-6 sm:p-7 shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#2D6A4F]/20 border border-[#2D6A4F] flex items-center justify-center text-[#2D6A4F]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="display-font font-bold text-2xl text-white">
                    Demande Reçue !
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xs">
                    Notre maître torréfacteur vous contactera sur WhatsApp sous 24h ouvrables avec notre catalogue tarifaire professionnel et un échantillon de 500g offert.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <h3 className="display-font font-bold text-xl text-white">
                      Demander des Échantillons Wholesale
                    </h3>
                    <p className="font-sans text-xs text-[#A1A1AA] mt-1">
                      Réponse garantie sous 24h ouvrables · 500g d'échantillon offert
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="cafeName" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                        Nom de l'établissement *
                      </label>
                      <input
                        id="cafeName"
                        name="cafeName"
                        type="text"
                        required
                        value={form.cafeName}
                        onChange={handleChange}
                        placeholder="Ex: Café de Paris, Riad Marrakech..."
                        className="input-dark"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="city" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                          Ville *
                        </label>
                        <div className="relative">
                          <select
                            id="city"
                            name="city"
                            required
                            value={form.city}
                            onChange={handleChange}
                            className="input-dark appearance-none pr-8 cursor-pointer"
                          >
                            <option value="" className="bg-[#1A1C23]">Ville</option>
                            {CITIES.map((c) => (
                              <option key={c} value={c} className="bg-[#1A1C23]">{c}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="monthlyVolume" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                          Volume *
                        </label>
                        <div className="relative">
                          <select
                            id="monthlyVolume"
                            name="monthlyVolume"
                            required
                            value={form.monthlyVolume}
                            onChange={handleChange}
                            className="input-dark appearance-none pr-8 cursor-pointer text-xs"
                          >
                            <option value="" className="bg-[#1A1C23]">Volume</option>
                            {VOLUMES.map((v) => (
                              <option key={v} value={v} className="bg-[#1A1C23]">{v}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block font-mono text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                        WhatsApp Professionnel *
                      </label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        required
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="+212 6XX-XXXXXX"
                        className="input-dark"
                        autoComplete="tel"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!form.cafeName || !form.city || !form.whatsapp || !form.monthlyVolume}
                      className="btn-pill-amber w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={15} />
                      <span>Envoyer la Demande Wholesale</span>
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
