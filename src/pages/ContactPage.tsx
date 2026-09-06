import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Coffee, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { ContactInfoCards } from '../components/contact/ContactInfoCards';
import { ContactForm } from '../components/contact/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121421] text-white selection:bg-[#EFAE54] selection:text-[#121421]">
      {/* 1. Header & Breadcrumb */}
      <div className="border-b border-white/10 bg-gradient-to-b from-[#555555]/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-[#EFAE54] transition-colors mb-6 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Coffee House</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              We Would Love to Hear From You
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
              Whether you are looking to reserve one of our 80+ private rooms, plan an artisan coffee catering session, or source whole bean roasts for your workspace, our team is ready to assist.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info, Hours & Location */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfoCards />
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>

        {/* 3. Assurance Strip */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <Coffee className="w-5 h-5 text-[#EFAE54] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-bold text-sm font-display">
                Artisanal Care
              </h4>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Every customer message is reviewed directly by our café concierge and master roasters.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#EFAE54] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-bold text-sm font-display">
                Rapid Response Time
              </h4>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Expect a response to your space reservation or roast inquiries within 2 to 4 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <HeartHandshake className="w-5 h-5 text-[#EFAE54] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-bold text-sm font-display">
                Community Gatherings
              </h4>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                Custom equipment setups, tasting flights, and private event packages available upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
