import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/coffeeHouseData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="w-full bg-[#121421] text-white py-16 sm:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#EFAE54] text-xs uppercase font-bold tracking-widest">
            Loved By Coffee Lovers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
            What Our Customers Are Saying
          </h2>
          <p className="text-white/60 text-sm mt-3 font-light">
            Real experiences from coffee aficionados, remote creators, and daily regulars.
          </p>
        </div>

        {/* 3-Column Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#EFAE54]/50 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-1 shadow-dark-card"
            >
              <div>
                {/* Quotation Marks Symbol & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EFAE54]/10 text-[#EFAE54] flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-[#EFAE54]/20 text-[#EFAE54]" />
                  </div>

                  {/* 5-Star Rating Row */}
                  <div className="flex items-center gap-1 text-[#EFAE54]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#EFAE54] text-[#EFAE54]"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Paragraph */}
                <p className="text-white/80 text-sm leading-relaxed font-light italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-white/10">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#EFAE54]/40"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-white group-hover:text-[#EFAE54] transition-colors">
                    {review.name}
                  </span>
                  <span className="text-xs text-white/50 font-mono">
                    {review.handle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
