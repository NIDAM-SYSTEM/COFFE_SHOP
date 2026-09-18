import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/coffeeHouseData';

export const Testimonials: React.FC = () => {
  return (
    <section 
      id="reviews" 
      className="relative w-full bg-[#0a0b10] text-white py-24 sm:py-32 overflow-hidden border-t border-white/5"
      aria-labelledby="testimonials-heading"
    >
      {/* ════════ BACKGROUND GLOWS ════════ */}
      <div 
        className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-[#EFAE54]/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" 
        aria-hidden="true" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ════════ SECTION HEADER ════════ */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#EFAE54]/10 border border-[#EFAE54]/20 px-4 py-1.5 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 fill-[#EFAE54] text-[#EFAE54]" aria-hidden="true" />
            <span className="text-[#EFAE54] text-[11px] uppercase font-bold tracking-[0.2em]">
              Loved By Coffee Lovers
            </span>
          </div>
          
          <h2 
            id="testimonials-heading"
            className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Don't just take our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EFAE54] to-amber-200">word for it.</span>
          </h2>
          
          <p className="text-white/60 text-base font-light leading-relaxed max-w-lg">
            Real experiences from coffee aficionados, remote creators, and the daily regulars who make our house their home.
          </p>
        </div>

        {/* ════════ REVIEWS GRID ════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <figure
              key={review.id}
              className="group relative bg-[#13151f]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:bg-[#181b28] hover:border-[#EFAE54]/30 hover:shadow-[0_10px_40px_rgba(239,174,84,0.08)] transition-all duration-500 overflow-hidden"
            >
              {/* Giant Watermark Quote Icon (Decorative) */}
              <Quote 
                className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.02] -rotate-12 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-[#EFAE54]/5 transition-all duration-700 ease-out pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="relative z-10 flex flex-col flex-1">
                
                {/* 5-Star Rating Row */}
                <div 
                  className="flex items-center gap-1 mb-8"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-colors duration-300 ${
                        i < review.rating 
                          ? 'fill-[#EFAE54] text-[#EFAE54] drop-shadow-[0_0_8px_rgba(239,174,84,0.4)]' 
                          : 'fill-transparent text-white/10'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote Paragraph */}
                <blockquote className="text-white/80 text-[15px] leading-loose font-light flex-1">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Row */}
              <figcaption className="relative z-10 flex items-center gap-4 mt-10 pt-6 border-t border-white/5 group-hover:border-[#EFAE54]/10 transition-colors duration-500">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#EFAE54] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <img
                    src={review.avatar}
                    alt={`Portrait of ${review.name}`}
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-[#EFAE54]/40 transition-colors duration-500"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex flex-col">
                  <cite className="font-display font-bold text-[15px] text-white tracking-wide group-hover:text-[#EFAE54] transition-colors duration-300 not-italic">
                    {review.name}
                  </cite>
                  <span className="text-[12px] text-white/40 font-mono tracking-wider mt-0.5">
                    {review.handle}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};