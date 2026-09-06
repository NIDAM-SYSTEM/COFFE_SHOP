/**
 * MoroccoAddressForm.tsx — Phase 8: Checkout Delivery Details Form
 *
 * Fully controlled form component for the Moroccan express checkout.
 * Validates on blur (and on change after the first blur) without blocking
 * the user mid-type. Grouped city <optgroup> reflects SLA delivery zones.
 */

import { useState, useCallback, useId } from 'react';
import { User, Phone, MapPin, Navigation, MessageSquare, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOROCCAN_CITIES, CITY_ZONE_LABELS, getCityByValue, type SlaZone } from '../../data/moroccanCities';
import type { CheckoutFormData, CheckoutFormErrors } from '../../types';

// ── Validation ─────────────────────────────────────────────────────────────

/** Exact regex specified in task requirements */
const MOROCCAN_PHONE_REGEX = /^(?:0|\+212)[67]\d{8}$/;

function validateField(
  field: keyof CheckoutFormData,
  value: string
): string | undefined {
  switch (field) {
    case 'fullName':
      if (!value.trim()) return 'Le nom est requis.';
      if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères.';
      return undefined;
    case 'phone':
      if (!value.trim()) return 'Le numéro WhatsApp est requis.';
      if (!MOROCCAN_PHONE_REGEX.test(value.replace(/[\s\-]/g, '')))
        return 'Format invalide. Ex : 0612345678 ou +212612345678';
      return undefined;
    case 'city':
      if (!value) return 'Veuillez sélectionner votre ville.';
      return undefined;
    case 'quartierAddress':
      if (!value.trim()) return "L'adresse est requise.";
      if (value.trim().length < 5) return "Veuillez fournir une adresse plus détaillée.";
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(form: CheckoutFormData): CheckoutFormErrors {
  return {
    fullName:       validateField('fullName',       form.fullName),
    phone:          validateField('phone',          form.phone),
    city:           validateField('city',           form.city),
    quartierAddress: validateField('quartierAddress', form.quartierAddress),
  };
}

export function isAddressFormValid(form: CheckoutFormData): boolean {
  const errs = validateAll(form);
  return !errs.fullName && !errs.phone && !errs.city && !errs.quartierAddress;
}

// ── Sub-components ─────────────────────────────────────────────────────────

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: React.ReactNode;
}

function FieldWrapper({ label, htmlFor, error, required, children, hint }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-white/80 tracking-wide"
      >
        {label}
        {required && <span className="text-[#EFAE54] ml-1">*</span>}
      </label>

      {children}

      {/* Hint shown only when no error */}
      {hint && !error && (
        <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5">
          {hint}
        </p>
      )}

      {/* Inline error */}
      {error && (
        <p
          role="alert"
          className="text-xs text-red-400 flex items-center gap-1.5 mt-0.5 animate-[fadeIn_0.15s_ease]"
        >
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// Shared input className builder
function inputCls(hasError: boolean, hasValue: boolean): string {
  const base =
    'w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 ' +
    'bg-white/5 border transition-all duration-200 outline-none ' +
    'focus:ring-2 focus:ring-[#EFAE54]/30';

  if (hasError)
    return `${base} border-red-500/60 focus:border-red-400`;
  if (hasValue)
    return `${base} border-[#EFAE54]/40 focus:border-[#EFAE54]`;
  return `${base} border-white/10 focus:border-[#EFAE54]`;
}

// ── SLA Delivery Badge ─────────────────────────────────────────────────────

const ZONE_BADGE_STYLES: Record<SlaZone, string> = {
  1: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  2: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  3: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
};

function SlaBadge({ zone, estimate }: { zone: SlaZone; estimate: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ZONE_BADGE_STYLES[zone]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      Livraison {estimate}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export interface MoroccoAddressFormProps {
  /** Current controlled form state (managed by parent CheckoutPage) */
  values: CheckoutFormData;
  /** Callback fired on any field change */
  onChange: (updates: Partial<CheckoutFormData>) => void;
  /** External errors injected by parent (e.g. on final submit attempt) */
  externalErrors?: CheckoutFormErrors;
}

export default function MoroccoAddressForm({
  values,
  onChange,
  externalErrors = {},
}: MoroccoAddressFormProps) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  // Track which fields have been blurred at least once
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

  // Compute live errors only for touched fields (or all if parent provided them)
  const liveErrors = validateAll(values);

  function getError(field: keyof CheckoutFormErrors): string | undefined {
    if (externalErrors[field]) return externalErrors[field];
    if (touched[field]) return liveErrors[field];
    return undefined;
  }

  const handleBlur = useCallback((field: keyof CheckoutFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleChange = useCallback(
    (field: keyof CheckoutFormData, val: string) => {
      onChange({ [field]: val });
      // Show errors on change once field has been touched
      setTouched((prev) => ({ ...prev, [field]: prev[field] ? true : prev[field] }));
    },
    [onChange]
  );

  const selectedCity = values.city ? getCityByValue(values.city) : undefined;

  // Group cities by SLA zone for <optgroup>
  const zones: SlaZone[] = [1, 2, 3];

  return (
    <div className="space-y-5">

      {/* ── Section header ── */}
      <div className="flex items-center gap-3 pb-1">
        <div className="p-2 rounded-lg bg-[#EFAE54]/10 border border-[#EFAE54]/20">
          <Navigation size={16} className="text-[#EFAE54]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Adresse de Livraison</h2>
          <p className="text-xs text-white/40 mt-0.5">Tous les champs marqués <span className="text-[#EFAE54]">*</span> sont requis</p>
        </div>
      </div>

      {/* ── Full Name ── */}
      <FieldWrapper
        label="Nom & Prénom"
        htmlFor={id('fullName')}
        error={getError('fullName')}
        required
      >
        <div className="relative">
          <User
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <input
            id={id('fullName')}
            type="text"
            autoComplete="name"
            placeholder="Mohamed El Fassi"
            value={values.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            className={`${inputCls(!!getError('fullName'), !!values.fullName)} pl-10`}
          />
          {/* Valid indicator */}
          {!liveErrors.fullName && values.fullName && (
            <CheckCircle2
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400"
            />
          )}
        </div>
      </FieldWrapper>

      {/* ── WhatsApp Phone ── */}
      <FieldWrapper
        label="Numéro WhatsApp"
        htmlFor={id('phone')}
        error={getError('phone')}
        required
        hint={
          <>
            <Phone size={11} className="shrink-0 text-[#EFAE54]" />
            Utilisé par le livreur pour la localisation WhatsApp
          </>
        }
      >
        <div className="relative">
          <Phone
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <input
            id={id('phone')}
            type="tel"
            autoComplete="tel"
            placeholder="0612 345 678"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`${inputCls(!!getError('phone'), !!values.phone)} pl-10`}
          />
          {!liveErrors.phone && values.phone && (
            <CheckCircle2
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400"
            />
          )}
        </div>
      </FieldWrapper>

      {/* ── City Dropdown ── */}
      <FieldWrapper
        label="Ville"
        htmlFor={id('city')}
        error={getError('city')}
        required
      >
        <div className="relative">
          <MapPin
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10"
          />
          <ChevronDown
            size={15}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10"
          />
          <select
            id={id('city')}
            value={values.city}
            onChange={(e) => handleChange('city', e.target.value)}
            onBlur={() => handleBlur('city')}
            className={`
              ${inputCls(!!getError('city'), !!values.city)}
              pl-10 pr-10 appearance-none cursor-pointer
              [&>optgroup]:bg-[#1a1d2e] [&>optgroup]:text-[#EFAE54] [&>optgroup]:font-semibold
              [&>option]:bg-[#1a1d2e] [&>option]:text-white
            `}
          >
            <option value="" disabled>Sélectionnez votre ville…</option>
            {zones.map((zone) => {
              const citiesInZone = MOROCCAN_CITIES.filter((c) => c.slaZone === zone);
              return (
                <optgroup key={zone} label={CITY_ZONE_LABELS[zone]}>
                  {citiesInZone.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.name}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

        {/* SLA delivery badge appears below dropdown when city is selected */}
        {selectedCity && !getError('city') && (
          <div className="flex items-center gap-2 mt-1">
            <SlaBadge zone={selectedCity.slaZone} estimate={selectedCity.deliveryEstimate} />
            <span className="text-xs text-white/35">après expédition de votre torréfaction</span>
          </div>
        )}
      </FieldWrapper>

      {/* ── Quartier / Address ── */}
      <FieldWrapper
        label="Quartier & Adresse Détaillée"
        htmlFor={id('quartierAddress')}
        error={getError('quartierAddress')}
        required
        hint="Numéro, rue, résidence, immeuble, étage…"
      >
        <div className="relative">
          <MapPin
            size={15}
            className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none"
          />
          <textarea
            id={id('quartierAddress')}
            rows={3}
            autoComplete="street-address"
            placeholder="Ex : 12 Rue Ibn Sina, Appt 4, Résidence Al Fath, Hay Riad"
            value={values.quartierAddress}
            onChange={(e) => handleChange('quartierAddress', e.target.value)}
            onBlur={() => handleBlur('quartierAddress')}
            className={`
              ${inputCls(!!getError('quartierAddress'), !!values.quartierAddress)}
              pl-10 resize-none leading-relaxed
            `}
          />
          {!liveErrors.quartierAddress && values.quartierAddress && (
            <CheckCircle2
              size={14}
              className="absolute right-3.5 top-3.5 text-emerald-400"
            />
          )}
        </div>
      </FieldWrapper>

      {/* ── Delivery Notes (optional) ── */}
      <FieldWrapper
        label="Notes pour le livreur"
        htmlFor={id('deliveryNotes')}
        hint="Optionnel — Code de portail, heure préférée, point de repère…"
      >
        <div className="relative">
          <MessageSquare
            size={15}
            className="absolute left-3.5 top-3.5 text-white/30 pointer-events-none"
          />
          <textarea
            id={id('deliveryNotes')}
            rows={2}
            placeholder="Ex : Appeler avant d'arriver, ne pas laisser chez le gardien"
            value={values.deliveryNotes}
            onChange={(e) => handleChange('deliveryNotes', e.target.value)}
            className={`
              ${inputCls(false, !!values.deliveryNotes)}
              pl-10 resize-none leading-relaxed
            `}
          />
        </div>
      </FieldWrapper>

      {/* ── Trust footer ── */}
      <div className="flex items-start gap-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15 px-4 py-3 mt-1">
        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-white/55 leading-relaxed">
          Vos informations sont uniquement utilisées pour l'acheminement de votre commande.{' '}
          <strong className="text-white/75">Aucune carte bancaire requise.</strong> Paiement en espèces à la livraison.
        </p>
      </div>
    </div>
  );
}
