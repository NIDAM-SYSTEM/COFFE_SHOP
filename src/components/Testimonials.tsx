import { useState } from 'react';
import { Star, BadgeCheck, Play, X } from 'lucide-react';
import { TESTIMONIALS } from '../data/catalog';

export function Testimonials() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      className="relative bg-[#1A1C23] text-white py-16 sm:py-24 overflow-hidden"
    >
      {/* Subtle background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E89038]/5 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-outer relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E89038] mb-2 font-semibold">
            Témoignages & Avis Vérifiés
          </p>
          <h2
            id="testimonials-heading"
            className="display-font text-3xl sm:text-5xl font-bold text-white tracking-tight"
          >
            <span className="font-serif">WHat</span> Our Customers Are Saying
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A1A1AA] mt-3">
            Plus de 1,200 buveurs de café et dizaines de coffee shops font confiance à notre torréfaction chaque semaine au Maroc.
          </p>
        </div>

        {/* Central Video Review Spotlight Feature with Amber Play Button */}
        <div className="mb-14 max-w-4xl mx-auto">
          <div className="card-dark bg-gradient-to-r from-[#2A2D34] to-[#1E1F24] p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#E89038] uppercase font-bold tracking-wider">
                  Story Vidéo · Rabat & Casablanca
                </span>
              </div>
              <h3 className="display-font text-xl sm:text-2xl font-bold text-white mb-2">
                "Du supermarché au specialty coffee : pourquoi je ne reviendrai jamais en arrière."
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                Regardez l'expérience de Nidal H. recevant sa commande en 24h à Rabat et calibrant son V60 avec les grains Salvador San Alberto.
              </p>
            </div>

            {/* Amber Play Button */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E89038] hover:bg-[#F59E0B] text-[#121316] flex items-center justify-center shadow-amber-glow hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E89038]/40 group"
                aria-label="Regarder le témoignage vidéo de Nidal H."
              >
                <Play size={28} className="fill-current ml-1 transition-transform group-hover:scale-110" />
              </button>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                Voir l'Avis (1 min)
              </span>
            </div>
          </div>
        </div>

        {/* Minimalist Floating Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="card-dark p-6 sm:p-7 flex flex-col justify-between hover:border-[#E89038]/50"
              aria-label={`Avis de ${review.name}`}
            >
              {/* Stars & Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1" aria-label={`${review.rating} étoiles sur 5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[#E89038] text-[#E89038]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full uppercase tracking-wider bg-white/10 text-zinc-300 border border-white/10">
                  {review.tag}
                </span>
              </div>

              {/* Review text */}
              <blockquote className="font-sans text-sm text-zinc-200 leading-relaxed mb-6 italic">
                "{review.text}"
              </blockquote>

              {/* Reviewer identity footer */}
              <footer className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E89038]/15 border border-[#E89038]/30 flex items-center justify-center font-serif font-bold text-sm text-[#E89038]">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-sans font-semibold text-sm text-white">{review.name}</p>
                      <BadgeCheck size={14} className="text-[#2D6A4F]" aria-label="Achat vérifié" />
                    </div>
                    <p className="font-mono text-[11px] text-[#A1A1AA]">
                      {review.location} · {review.role}
                    </p>
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>

      </div>

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-[#1A1C23] border border-white/15 rounded-3xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-white">
                  Témoignage Client NIDAM Roastery
                </h4>
                <p className="font-mono text-xs text-[#E89038]">Extraction V60 & Livraison 24h Rabat</p>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fermer la vidéo"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video mockup frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex flex-col items-center justify-center text-center p-6 border border-white/10">
              <img
                src="/images/barista_craft.jpg"
                alt="Aperçu vidéo NIDAM"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#E89038] text-[#121316] flex items-center justify-center shadow-amber-glow animate-pulse">
                  <Play size={24} className="fill-current ml-1" />
                </div>
                <p className="font-serif text-lg font-bold text-white">
                  "Une fraîcheur incomparable livrée directement à ma porte."
                </p>
                <p className="font-mono text-xs text-zinc-300">
                  Nidal H. · Amateur V60 à Rabat · Lot Lundi 2 Sept.
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
