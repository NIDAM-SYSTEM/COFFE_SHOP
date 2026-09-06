/**
 * Shared utility for Coffee House Roastery batch scheduling.
 * Centralizes real-time operational calculation for Monday & Thursday batches
 * across RoasteryFreshnessPage, RoastCalendarCard, and ProductDetailHero.
 */

export interface RoastScheduleStatus {
  badgeText: string;
  badgeColor: string;
  headline: string;
  subtext: string;
  nextBatchCountdown: string;
  nextBatchDay: 'Lundi' | 'Jeudi';
  isRoastDayToday: boolean;
  pdpBadgeSnippet: string;
  roastDayName: string;
}

export function getRoastScheduleStatus(now: Date = new Date()): RoastScheduleStatus {
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday

  if (day === 1) {
    return {
      badgeText: '🔥 Batch en cours de torréfaction aujourd’hui',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      headline: 'Batch #1 en cuisson ce matin à l’atelier de Casablanca',
      subtext: 'Les commandes passées aujourd’hui seront expédiées dès demain après dégazage initial.',
      nextBatchCountdown: 'Aujourd’hui (Session en cours)',
      nextBatchDay: 'Lundi',
      isRoastDayToday: true,
      pdpBadgeSnippet: 'En cuisson aujourd’hui (Expédition sous 24h)',
      roastDayName: 'Lundi',
    };
  }

  if (day === 2) {
    return {
      badgeText: '⏳ Batch #1 en cours de repos & dégazage',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      headline: 'Grains torréfiés hier • Dégazage actif sous valve',
      subtext: 'Expéditions en cours de livraison 24h/48h. Prochaine cuisson ce Jeudi.',
      nextBatchCountdown: 'Prochain Batch : Jeudi à 08:00 (dans 2 jours)',
      nextBatchDay: 'Jeudi',
      isRoastDayToday: false,
      pdpBadgeSnippet: 'Prochain Batch : Jeudi à 08:00 (dans 2j)',
      roastDayName: 'Mardi',
    };
  }

  if (day === 3) {
    return {
      badgeText: '📅 Prochaine torréfaction demain Jeudi',
      badgeColor: 'bg-[#EFAE54]/20 text-[#EFAE54] border-[#EFAE54]/40',
      headline: 'Préparation du Batch #2 (Espresso & Colombie)',
      subtext: 'Commandez aujourd’hui pour réserver votre sachet sur la fournée de demain matin.',
      nextBatchCountdown: 'Prochain Batch : Demain Jeudi à 08:00',
      nextBatchDay: 'Jeudi',
      isRoastDayToday: false,
      pdpBadgeSnippet: 'Prochain Batch : Demain Jeudi à 08:00',
      roastDayName: 'Mercredi',
    };
  }

  if (day === 4) {
    return {
      badgeText: '🔥 Batch en cours de torréfaction aujourd’hui',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      headline: 'Batch #2 en cuisson ce matin à l’atelier de Casablanca',
      subtext: 'Assemblages Espresso & profils corsés en cours de torréfaction sur tambour fonte.',
      nextBatchCountdown: 'Aujourd’hui (Session en cours)',
      nextBatchDay: 'Jeudi',
      isRoastDayToday: true,
      pdpBadgeSnippet: 'En cuisson aujourd’hui (Expédition sous 24h)',
      roastDayName: 'Jeudi',
    };
  }

  if (day === 5) {
    return {
      badgeText: '⏳ Batch #2 en cours de repos & dégazage',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      headline: 'Grains torréfiés hier • Dégazage actif sous valve',
      subtext: 'Expéditions en cours. Les commandes de ce weekend partiront sur le batch de Lundi.',
      nextBatchCountdown: 'Prochain Batch : Lundi à 08:00 (dans 3 jours)',
      nextBatchDay: 'Lundi',
      isRoastDayToday: false,
      pdpBadgeSnippet: 'Prochain Batch : Lundi à 08:00 (dans 3j)',
      roastDayName: 'Vendredi',
    };
  }

  // Weekend (Saturday=6 or Sunday=0)
  const daysUntilMonday = day === 6 ? 2 : 1;
  return {
    badgeText: `📅 Prochaine torréfaction dans ${daysUntilMonday} jour${daysUntilMonday > 1 ? 's' : ''}`,
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    headline: 'L’atelier prépare les grains verts pour le batch de Lundi',
    subtext: 'Passez commande ce weekend pour que votre sachet soit torréfié dès la première fournée de Lundi matin.',
    nextBatchCountdown: `Prochain Batch : Lundi à 08:00 (dans ${daysUntilMonday}j)`,
    nextBatchDay: 'Lundi',
    isRoastDayToday: false,
    pdpBadgeSnippet: `Prochain Batch : Lundi à 08:00 (dans ${daysUntilMonday}j)`,
    roastDayName: day === 6 ? 'Samedi' : 'Dimanche',
  };
}
