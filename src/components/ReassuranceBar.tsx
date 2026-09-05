import { SlidersHorizontal, Flame, Truck } from 'lucide-react';

export function ReassuranceBar() {
  const steps = [
    {
      number: '01',
      icon: <SlidersHorizontal size={24} strokeWidth={1.8} className="text-[#E89038]" />,
      title: 'Calibrated Grind',
      subtitle: 'Mouture Micron de Précision',
      description:
        'Moulu sur burins professionnels en acier trempé, calibré au micron pour Moka Pot, V60, Espresso ou cafetière à piston.',
      badge: 'Zéro Résidu Amer',
    },
    {
      number: '02',
      icon: <Flame size={24} strokeWidth={1.8} className="text-[#E89038]" />,
      title: 'Roasted & Grounded',
      subtitle: 'Torréfaction Hebdomadaire',
      description:
        'Petits lots torréfiés à Casablanca chaque lundi et jeudi. Date de cuisson exacte tamponnée sur chaque sachet.',
      badge: 'Casablanca Atelier',
    },
    {
      number: '03',
      icon: <Truck size={24} strokeWidth={1.8} className="text-[#E89038]" />,
      title: '48h Express SLA',
      subtitle: 'Partout au Maroc avec COD',
      description:
        'Livraison rapide en 24h à 48h à Rabat, Casablanca, Marrakech, Tanger, Fès, Agadir. Inspectez et payez en espèces à la livraison.',
      badge: 'Paiement à la Porte',
    },
  ];

  return (
    <section
      aria-label="Processus de torréfaction et garanties NIDAM"
      className="relative bg-[#2A2D34] text-white pt-6 pb-12 sm:pb-16"
    >
      <div className="container-outer relative z-10">

        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E89038] mb-2 font-semibold">
            Le Standard NIDAM
          </p>
          <h2 className="display-font text-3xl sm:text-4xl font-bold text-white tracking-tight">
            De l'Atelier de Casablanca à Votre Tasse
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A1A1AA] mt-2.5">
            Trois étapes rigoureuses pour bannir le café insipide et rassis de supermarché.
          </p>
        </div>

        {/* Connecting curved path graphic on desktop */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#E89038]/30 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* 3 Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="card-dark bg-[#1A1C23]/60 hover:bg-[#1A1C23]/90 p-7 flex flex-col items-start gap-4 group transition-all duration-300 relative overflow-hidden"
              >
                {/* Large Background Step Number */}
                <span
                  className="display-font text-6xl font-black text-white/[0.04] group-hover:text-[#E89038]/10 absolute -right-2 -top-2 transition-colors pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon in Amber Pill Box */}
                <div className="w-14 h-14 rounded-2xl bg-[#E89038]/10 border border-[#E89038]/25 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-amber-glow">
                  {step.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-[#E89038] tracking-wider uppercase font-semibold">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="display-font font-bold text-xl text-white mb-2 group-hover:text-[#E89038] transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#A1A1AA] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Badge */}
                <div className="mt-auto pt-3 border-t border-white/10 w-full flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                    Garantie NIDAM
                  </span>
                  <span className="font-mono text-[10px] text-[#E89038] bg-[#E89038]/10 px-2 py-0.5 rounded-full font-medium">
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Sweeping Transition into Warm Cream Menu Section ── */}
      <div className="relative w-full overflow-hidden leading-none mt-16 sm:mt-24">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 lg:h-32 block"
          preserveAspectRatio="none"
        >
          {/* Sweeping wave from Dark Slate (#2A2D34) into Warm Cream (#F9F8F4) */}
          <path
            d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z"
            fill="#F9F8F4"
          />
        </svg>
      </div>
    </section>
  );
}
