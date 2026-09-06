import React, { useMemo } from 'react';
import {
  Flame,
  Clock,
  Calendar,
  Bell,
  MessageCircle,
  Sparkles,
  Package,
  Truck,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';
import { getRoastScheduleStatus } from '../../utils/roastSchedule';

export interface RoastCalendarCardProps {
  onSubscribeClick?: () => void;
  className?: string;
}

interface DaySchedule {
  dayName: string;
  shortName: string;
  isRoastDay: boolean;
  isDispatchDay?: boolean;
  batchTitle?: string;
  description: string;
}

const WEEK_DAYS: DaySchedule[] = [
  {
    dayName: 'Lundi',
    shortName: 'LUN',
    isRoastDay: true,
    batchTitle: 'Batch #1 Filtre & Micro-Lots',
    description: 'Torréfaction douce à profil clair/moyen (Éthiopie & Salvador).',
  },
  {
    dayName: 'Mardi',
    shortName: 'MAR',
    isRoastDay: false,
    isDispatchDay: true,
    description: 'Dégazage 24h sous valve & expédition express Casablanca / Maroc.',
  },
  {
    dayName: 'Mercredi',
    shortName: 'MER',
    isRoastDay: false,
    description: 'Contrôle qualité en cupping & préparation des grains verts.',
  },
  {
    dayName: 'Jeudi',
    shortName: 'JEU',
    isRoastDay: true,
    batchTitle: 'Batch #2 Espresso & Blends',
    description: 'Torréfaction médium-dark pour créma soyeuse & notes chocolatées.',
  },
  {
    dayName: 'Vendredi',
    shortName: 'VEN',
    isRoastDay: false,
    isDispatchDay: true,
    description: 'Expéditions weekend Casablanca & réassort express cafés.',
  },
  {
    dayName: 'Samedi',
    shortName: 'SAM',
    isRoastDay: false,
    description: 'Atelier de formation & dégazage naturel des sachets scellés.',
  },
  {
    dayName: 'Dimanche',
    shortName: 'DIM',
    isRoastDay: false,
    description: 'Repos de l’atelier & sélection des profils de la semaine suivante.',
  },
];

export const RoastCalendarCard: React.FC<RoastCalendarCardProps> = ({
  onSubscribeClick,
  className = '',
}) => {
  // Shared dynamic real-time roast status based on current day of the week
  const roastStatus = useMemo(() => getRoastScheduleStatus(), []);

  const whatsappAlertUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    'Salam NIDAM Coffee, je souhaite être notifié(e) par WhatsApp lors du lancement des prochains batchs de torréfaction hebdomadaires.'
  )}`;

  return (
    <div
      className={`rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm ${className}`}
      id="roast-calendar-card"
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFAE54]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 space-y-8">
        {/* 1. Header with dynamic status badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/25 text-[#EFAE54] text-xs font-extrabold uppercase tracking-widest mb-2.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Planning Hebdomadaire Atelier Casablanca</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Calendrier de Torréfaction & Fenêtre de Dégazage
            </h3>
            <p className="text-white/65 text-xs sm:text-sm mt-1 max-w-2xl">
              Nous torréfions exclusivement le <strong>Lundi</strong> et le <strong>Jeudi</strong> sur notre torréfacteur d’artisan pour garantir un café consommé dans sa fenêtre aromatique idéale (4 à 28 jours post-roast).
            </p>
          </div>

          {/* Dynamic real-time badge */}
          <div className="shrink-0">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold shadow-lg ${roastStatus.badgeColor}`}
              id="roast-calendar-status-badge"
            >
              <span className="w-2 h-2 rounded-full bg-current animate-ping shrink-0" />
              <span>{roastStatus.badgeText}</span>
            </div>
          </div>
        </div>

        {/* 2. Real-Time Operational Spotlight Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.04] border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/30 flex items-center justify-center text-[#EFAE54] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">
                {roastStatus.headline}
              </div>
              <div className="text-xs text-white/60 mt-0.5 leading-relaxed">
                {roastStatus.subtext}
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
            <div className="text-[11px] uppercase tracking-wider text-white/40 font-mono">
              Prochaine Cuisson
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-[#EFAE54] mt-0.5">
              {roastStatus.nextBatchCountdown}
            </div>
          </div>
        </div>

        {/* 3. 7-Day Visual Week Planner */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#EFAE54]" />
              <span>Cycle des 7 Jours de la Semaine</span>
            </h4>
            <span className="text-[11px] text-white/50 hidden sm:inline">
              Lundi & Jeudi = Torréfaction • Mardi & Vendredi = Expéditions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {WEEK_DAYS.map((dayItem, idx) => {
              const isToday = (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) === idx;

              return (
                <div
                  key={dayItem.dayName}
                  className={`rounded-2xl p-4 border transition-all relative flex flex-col justify-between min-h-[140px] ${
                    dayItem.isRoastDay
                      ? 'bg-gradient-to-b from-[#EFAE54]/15 to-transparent border-[#EFAE54]/40 shadow-lg shadow-[#EFAE54]/5'
                      : dayItem.isDispatchDay
                      ? 'bg-white/[0.04] border-emerald-500/30'
                      : 'bg-white/[0.02] border-white/10 text-white/70'
                  } ${isToday ? 'ring-2 ring-[#EFAE54] ring-offset-2 ring-offset-[#121421]' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold tracking-wider text-white">
                        {dayItem.shortName}
                      </span>
                      {dayItem.isRoastDay ? (
                        <span className="p-1 rounded-md bg-[#EFAE54] text-[#121421]">
                          <Flame className="w-3 h-3 fill-current" />
                        </span>
                      ) : dayItem.isDispatchDay ? (
                        <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                          <Truck className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      )}
                    </div>

                    <div className="text-[11px] font-bold text-white mb-1">
                      {dayItem.dayName}
                    </div>

                    <p className="text-[10px] text-white/60 leading-tight">
                      {dayItem.description}
                    </p>
                  </div>

                  {dayItem.isRoastDay && (
                    <div className="mt-2.5 pt-2 border-t border-[#EFAE54]/20">
                      <span className="inline-block text-[9px] font-extrabold uppercase tracking-wide text-[#EFAE54]">
                        ★ Cuisson Atelier
                      </span>
                    </div>
                  )}

                  {dayItem.isDispatchDay && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-500/20">
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wide text-emerald-400">
                        ✓ Expédition 24h
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Dual Batch Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Batch 1: Monday */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 sm:p-5 flex items-start gap-4 hover:border-[#EFAE54]/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#EFAE54]/15 border border-[#EFAE54]/25 flex items-center justify-center text-[#EFAE54] shrink-0 font-display font-extrabold text-sm">
              #1
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-white text-sm">Batch Lundi : Profils Filtre & Terroirs</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono">08h - 12h</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Dédié aux grains d’altitude (Éthiopie Sidamo, micro-lots floraux). Torréfaction légère préservant acidité vive et sucres naturels.
              </p>
              <div className="text-[11px] text-[#EFAE54] font-medium pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Expédition garantie dès Mardi matin</span>
              </div>
            </div>
          </div>

          {/* Batch 2: Thursday */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 sm:p-5 flex items-start gap-4 hover:border-[#EFAE54]/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-600/15 border border-amber-600/25 flex items-center justify-center text-[#EFAE54] shrink-0 font-display font-extrabold text-sm">
              #2
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-white text-sm">Batch Jeudi : Espresso & Blends Riches</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono">08h - 12h</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Dédié aux profils ronds et caramélisés (Colombie Huila, Salvador San Alberto, Signature Roast) pour machines espresso et Moka.
              </p>
              <div className="text-[11px] text-[#EFAE54] font-medium pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Expédition garantie dès Vendredi matin</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Retention Action: WhatsApp Alert Subscription & Education Note */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-white/60 text-center sm:text-left">
            <Info className="w-4 h-4 text-[#EFAE54] shrink-0" />
            <span>
              Un sachet scellé avec valve conserve son pic aromatique jusqu’à <strong>60 jours</strong>. Nous recommandons de consommer entre <strong>7 et 30 jours</strong> après cuisson.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            {onSubscribeClick && (
              <button
                type="button"
                onClick={onSubscribeClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
                id="roast-calendar-subscribe-cta"
              >
                <Bell className="w-4 h-4 text-[#EFAE54]" />
                <span>Paramétrer Alertes</span>
              </button>
            )}

            <a
              href={whatsappAlertUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#EFAE54]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="roast-calendar-whatsapp-cta"
            >
              <MessageCircle className="w-4 h-4 text-[#121421]" />
              <span>Recevoir les Alertes de Torréfaction sur WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
