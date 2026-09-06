import React, { useState } from 'react';
import {
  X,
  Bell,
  Flame,
  MessageCircle,
  Mail,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { WHATSAPP_CONTACT_PHONE } from '../../data/bundles';

export interface RoastAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoastAlertModal: React.FC<RoastAlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [batchPreference, setBatchPreference] = useState<'both' | 'monday' | 'thursday'>('both');
  const [roastType, setRoastType] = useState<string[]>(['micro-lots', 'espresso']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleRoastType = (type: string) => {
    setRoastType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) {
      setError(
        channel === 'whatsapp'
          ? 'Veuillez renseigner votre numéro WhatsApp marocain.'
          : 'Veuillez saisir votre adresse email.'
      );
      return;
    }

    if (channel === 'whatsapp' && !/^(?:\+212|0)[5-7]\d{8}$/.test(contactValue.replace(/\s+/g, ''))) {
      setError('Veuillez entrer un numéro de mobile marocain valide (ex: 06 12 34 56 78).');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const whatsappDirectSubscribeUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodeURIComponent(
    `Salam NIDAM Coffee, je souhaite activer les alertes de torréfaction (Préférence: ${batchPreference === 'both' ? 'Lundi & Jeudi' : batchPreference === 'monday' ? 'Lundi (Filtre)' : 'Jeudi (Espresso)'}).`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roast-alert-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#161826] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFAE54]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Fermer la boîte de dialogue"
          id="close-roast-alert-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="text-center sm:text-left space-y-1.5 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFAE54]/10 border border-[#EFAE54]/25 text-[#EFAE54] text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Alerte Atelier Fraîcheur</span>
                </div>
                <h3
                  id="roast-alert-title"
                  className="text-xl sm:text-2xl font-extrabold text-white font-display"
                >
                  Recevoir les Alertes de Torréfaction
                </h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Soyez notifié(e) à la sortie du four dès qu'une nouvelle fournée est prête pour réserver vos sachets dans la fenêtre de dégazage idéale.
                </p>
              </div>

              {/* Channel Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider">
                  Canal de Notification Préféré :
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setChannel('whatsapp');
                      setError('');
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      channel === 'whatsapp'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setChannel('email');
                      setError('');
                    }}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                      channel === 'email'
                        ? 'bg-[#EFAE54]/20 border-[#EFAE54] text-[#EFAE54]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#EFAE54]" />
                    <span>Email Privilégié</span>
                  </button>
                </div>
              </div>

              {/* Contact Input Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="roast-contact-input"
                  className="block text-xs font-bold text-white/70 uppercase tracking-wider"
                >
                  {channel === 'whatsapp' ? 'Numéro WhatsApp (Maroc) :' : 'Adresse Email :'}
                </label>
                <input
                  id="roast-contact-input"
                  type={channel === 'whatsapp' ? 'tel' : 'email'}
                  value={contactValue}
                  onChange={(e) => {
                    setContactValue(e.target.value);
                    setError('');
                  }}
                  placeholder={channel === 'whatsapp' ? '06 12 34 56 78' : 'barista@exemple.ma'}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#EFAE54] focus:ring-1 focus:ring-[#EFAE54] transition-all"
                />
                {error && <p className="text-xs text-red-400 font-medium mt-1">{error}</p>}
              </div>

              {/* Batch Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider">
                  Fréquence & Sessions Souhaitées :
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setBatchPreference('both')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      batchPreference === 'both'
                        ? 'bg-white/15 border-white text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Lundi & Jeudi
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatchPreference('monday')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      batchPreference === 'monday'
                        ? 'bg-white/15 border-white text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Lundi (Filtre)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatchPreference('thursday')}
                    className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                      batchPreference === 'thursday'
                        ? 'bg-white/15 border-white text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Jeudi (Espresso)
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFAE54] to-[#DE9839] hover:from-[#f3b965] hover:to-[#e4a447] text-[#121421] font-bold text-sm tracking-wide shadow-lg shadow-[#EFAE54]/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60"
                  id="submit-roast-alert-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      <span>Activer mes Alertes Fraîcheur</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <a
                    href={whatsappDirectSubscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ou s'inscrire en 1 clic directement sur WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-white font-display">
                  Alerte Fraîcheur Enregistrée !
                </h4>
                <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                  Vous recevrez une notification le matin de chaque session de torréfaction avec la liste des origines fraîches prêtes pour expédition.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-mono">
                {channel === 'whatsapp' ? `WhatsApp : ${contactValue}` : `Email : ${contactValue}`}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                id="close-roast-alert-success-btn"
              >
                Parfait, merci !
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
