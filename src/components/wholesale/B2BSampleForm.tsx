import React, { useState, useEffect, useId } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Coffee,
  MessageCircle,
  Building2,
  MapPin,
  Phone,
  User,
  SlidersHorizontal,
  Wrench,
  Sparkles,
  Loader2,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';

export interface B2BSampleFormData {
  fullName: string;
  professionalRole: string;
  establishmentName: string;
  city: string;
  whatsapp: string;
  monthlyVolume: string;
  machineModel: string;
}

export interface B2BSampleFormErrors {
  fullName?: string;
  establishmentName?: string;
  city?: string;
  whatsapp?: string;
  monthlyVolume?: string;
}

export interface B2BSampleFormProps {
  initialVolumeTier?: string;
  className?: string;
}

export const CITIES_LIST = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Agadir',
  'Fès',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Autre Ville du Maroc',
];

export const ROLES_LIST = [
  'Gérant / Propriétaire d’Établissement',
  'Head Barista / Chef Barista',
  'Directeur F&B / Responsable Restauration',
  'Office Manager / Responsable Achats',
  'Porteur de Projet (Création de Café)',
  'Autre Décisionnaire',
];

export const VOLUME_OPTIONS = [
  '10 – 25 kg / mois (Discovery & Bureaux)',
  '25 – 50 kg / mois (Specialty Café & Resto)',
  '50 kg et + / mois (Enterprise & Multi-Sites)',
];

export const B2BSampleForm: React.FC<B2BSampleFormProps> = ({
  initialVolumeTier = '25 – 50 kg / mois (Specialty Café & Resto)',
  className = '',
}) => {
  const formId = useId();

  const [formData, setFormData] = useState<B2BSampleFormData>({
    fullName: '',
    professionalRole: ROLES_LIST[0],
    establishmentName: '',
    city: 'Casablanca',
    whatsapp: '',
    monthlyVolume: initialVolumeTier || VOLUME_OPTIONS[1],
    machineModel: '',
  });

  const [touched, setTouched] = useState<{ [key in keyof B2BSampleFormData]?: boolean }>({});
  const [errors, setErrors] = useState<B2BSampleFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Synchronize monthlyVolume when initialVolumeTier prop updates (e.g. user clicked a tier card)
  useEffect(() => {
    if (initialVolumeTier) {
      const matched = VOLUME_OPTIONS.find(
        (opt) =>
          opt.toLowerCase().includes(initialVolumeTier.toLowerCase()) ||
          initialVolumeTier.toLowerCase().includes(opt.slice(0, 7).toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        monthlyVolume: matched || initialVolumeTier,
      }));
    }
  }, [initialVolumeTier]);

  // Validate Moroccan mobile phone number and required business fields
  const validate = (data: B2BSampleFormData): B2BSampleFormErrors => {
    const errs: B2BSampleFormErrors = {};

    // 1. Full Name
    if (!data.fullName.trim()) {
      errs.fullName = 'Veuillez renseigner votre nom complet.';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Le nom doit comporter au moins 2 caractères.';
    }

    // 2. Establishment Name
    if (!data.establishmentName.trim()) {
      errs.establishmentName = 'Veuillez indiquer le nom de votre établissement ou entreprise.';
    } else if (data.establishmentName.trim().length < 2) {
      errs.establishmentName = 'Le nom de l’établissement doit comporter au moins 2 caractères.';
    }

    // 3. City
    if (!data.city.trim()) {
      errs.city = 'Veuillez sélectionner votre ville.';
    }

    // 4. WhatsApp / Direct Phone (Moroccan mobile: 06, 07, +2126, +2127)
    const rawPhone = data.whatsapp.replace(/[\s.-]/g, '');
    const moroccanMobileRegex = /^(?:(?:\+|00)212|0)[67]\d{8}$/;
    if (!data.whatsapp.trim()) {
      errs.whatsapp = 'Veuillez saisir votre numéro WhatsApp pour l’envoi de la grille tarifaire.';
    } else if (!moroccanMobileRegex.test(rawPhone)) {
      errs.whatsapp =
        'Numéro mobile marocain invalide (ex: 06 12 34 56 78 ou +212 6 12 34 56 78).';
    }

    // 5. Volume Tier
    if (!data.monthlyVolume.trim()) {
      errs.monthlyVolume = 'Veuillez sélectionner une tranche de volume mensuel.';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name as keyof B2BSampleFormData]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: { [key in keyof B2BSampleFormData]: boolean } = {
      fullName: true,
      professionalRole: true,
      establishmentName: true,
      city: true,
      whatsapp: true,
      monthlyVolume: true,
      machineModel: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate B2B dispatch pipeline
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 700);
    }
  };

  // Pre-filled WhatsApp message as requested:
  // "Salam, je souhaite recevoir un pack dégustation B2B pour mon établissement [Nom] à [Ville] (Volume: [Volume], Machine: [Machine])."
  const getWhatsAppMessage = (): string => {
    const name = formData.establishmentName.trim() || '[Nom]';
    const city = formData.city.trim() || '[Ville]';
    const volume = formData.monthlyVolume.trim() || '[Volume]';
    const machine = formData.machineModel.trim() || 'Non spécifiée';

    return `Salam, je souhaite recevoir un pack dégustation B2B pour mon établissement ${name} à ${city} (Volume: ${volume}, Machine: ${machine}).`;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    getWhatsAppMessage()
  )}`;

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      professionalRole: ROLES_LIST[0],
      establishmentName: '',
      city: 'Casablanca',
      whatsapp: '',
      monthlyVolume: VOLUME_OPTIONS[1],
      machineModel: '',
    });
    setTouched({});
    setErrors({});
  };

  return (
    <div
      id="sample-form"
      className={`relative rounded-3xl border border-white/10 bg-[#161826] p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden ${className}`}
      aria-label="Formulaire de Demande d’Échantillons B2B"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFAE54]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/15 border border-[#EFAE54]/30 text-[#EFAE54] text-xs font-bold uppercase tracking-wider mb-2.5">
          <PackageCheck className="w-3.5 h-3.5" />
          <span>Pack Dégustation Offert aux Professionnels</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
          Demandez Vos Échantillons & Votre Grille Tarifaire
        </h3>
        <p className="text-white/65 text-xs sm:text-sm mt-2 leading-relaxed">
          Recevez gratuitement sous 48h un coffret de 3 x 250g de nos cafés de spécialité phares, accompagnés de la grille tarifaire dégressive et des fiches d’extraction adaptées à votre machine.
        </p>
      </div>

      {isSubmitted ? (
        /* Success Confirmation View */
        <div className="py-10 px-6 sm:px-10 rounded-2xl bg-white/[0.02] border border-emerald-500/30 text-center flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 shadow-lg shadow-emerald-950/40">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Demande Enregistrée avec Succès
          </span>
          <h4 className="text-2xl font-extrabold text-white font-display mt-1">
            Votre demande a été transmise au département B2B
          </h4>

          <p className="text-white/70 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
            Notre responsable grands comptes vous contactera sous <strong className="text-white">2 heures ouvrées</strong> sur votre numéro WhatsApp (<span className="text-[#EFAE54] font-mono font-semibold">{formData.whatsapp}</span>) pour valider l’adresse d’expédition de votre pack d’échantillons pour <span className="text-white font-semibold">{formData.establishmentName}</span> à <span className="text-white font-semibold">{formData.city}</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Accélérer via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs sm:text-sm font-semibold transition-colors"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      ) : (
        /* Controlled Form */
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Row 1: Full Name & Professional Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor={`${formId}-fullName`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Nom & Prénom <span className="text-[#EFAE54]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id={`${formId}-fullName`}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.fullName && errors.fullName)}
                  aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
                  className={`w-full py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                    touched.fullName && errors.fullName
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54]'
                  }`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                  <User className="w-4 h-4" />
                </div>
              </div>
              {touched.fullName && errors.fullName && (
                <p
                  id={`${formId}-fullName-error`}
                  className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formId}-professionalRole`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Votre Rôle / Fonction
              </label>
              <div className="relative">
                <select
                  id={`${formId}-professionalRole`}
                  name="professionalRole"
                  value={formData.professionalRole}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full appearance-none py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] transition-colors cursor-pointer"
                >
                  {ROLES_LIST.map((role) => (
                    <option key={role} value={role} className="bg-[#161826] text-white">
                      {role}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#EFAE54]">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Establishment Name & Moroccan City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor={`${formId}-establishmentName`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Nom de l'Établissement / Café <span className="text-[#EFAE54]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id={`${formId}-establishmentName`}
                  name="establishmentName"
                  value={formData.establishmentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.establishmentName && errors.establishmentName)}
                  aria-describedby={
                    errors.establishmentName ? `${formId}-establishmentName-error` : undefined
                  }
                  className={`w-full py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                    touched.establishmentName && errors.establishmentName
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54]'
                  }`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              {touched.establishmentName && errors.establishmentName && (
                <p
                  id={`${formId}-establishmentName-error`}
                  className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.establishmentName}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formId}-city`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Ville d'Implantation <span className="text-[#EFAE54]">*</span>
              </label>
              <div className="relative">
                <select
                  id={`${formId}-city`}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full appearance-none py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] transition-colors cursor-pointer"
                >
                  {CITIES_LIST.map((cityName) => (
                    <option key={cityName} value={cityName} className="bg-[#161826] text-white">
                      {cityName}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#EFAE54]">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              {touched.city && errors.city && (
                <p className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.city}</span>
                </p>
              )}
            </div>
          </div>

          {/* Row 3: WhatsApp Mobile & Monthly Volume Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor={`${formId}-whatsapp`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Numéro Mobile WhatsApp <span className="text-[#EFAE54]">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id={`${formId}-whatsapp`}
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.whatsapp && errors.whatsapp)}
                  aria-describedby={errors.whatsapp ? `${formId}-whatsapp-error` : undefined}
                  className={`w-full py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                    touched.whatsapp && errors.whatsapp
                      ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54]'
                  }`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[11px] text-white/45 mt-1 block">
                Format marocain : 06XXXXXXXX ou +212 6XXXXXXXX
              </span>
              {touched.whatsapp && errors.whatsapp && (
                <p
                  id={`${formId}-whatsapp-error`}
                  className="text-rose-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.whatsapp}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${formId}-monthlyVolume`}
                className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
              >
                Volume Mensuel Estimé <span className="text-[#EFAE54]">*</span>
              </label>
              <div className="relative">
                <select
                  id={`${formId}-monthlyVolume`}
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full appearance-none py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] transition-colors cursor-pointer"
                >
                  {VOLUME_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#161826] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#EFAE54]">
                  <Coffee className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Current Espresso Machine Model */}
          <div>
            <label
              htmlFor={`${formId}-machineModel`}
              className="text-xs font-mono text-white/80 uppercase tracking-wider block mb-1.5 font-semibold"
            >
              Modèle de Machine Espresso Actuel (Optionnel pour calibrage)
            </label>
            <div className="relative">
              <input
                type="text"
                id={`${formId}-machineModel`}
                name="machineModel"
                value={formData.machineModel}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full py-3 pl-3.5 pr-10 rounded-xl bg-[#121421] border border-white/15 focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] text-white/45 mt-1 block">
              Ex : La Marzocco Linea PB, Nuova Simonelli, Faema, ou "Projet en cours d'équipement"
            </span>
          </div>

          {/* Dual Action CTAs: Primary [Demander un Pack D'échantillons] + Secondary [Envoyer directement sur WhatsApp] */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3.5">
            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#EFAE54]/20 hover:shadow-[#EFAE54]/35 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              id="b2b-form-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Traitement de la demande...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Demander un Pack D'échantillons & Grille Tarifaire</span>
                </>
              )}
            </button>

            {/* Secondary Direct WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/90 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
              id="b2b-form-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Envoyer directement sur WhatsApp</span>
            </a>
          </div>

          {/* Reassurance Micro-text */}
          <div className="pt-2 text-center text-[11px] text-white/50 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-[#EFAE54]" />
            <span>
              Échantillons 100% gratuits réservés aux professionnels des métiers du café et de la restauration.
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
