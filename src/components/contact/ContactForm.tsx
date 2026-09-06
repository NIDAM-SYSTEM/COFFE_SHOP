import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Coffee, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: 'General Coffee Inquiry',
    message: '',
  });

  const [touched, setTouched] = useState<{ [key in keyof FormData]?: boolean }>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form fields
  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.name.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailPattern.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.message.trim()) {
      errs.message = 'Please write a brief message.';
    } else if (data.message.trim().length < 10) {
      errs.message = 'Your message should be at least 10 characters long.';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (touched[name as keyof FormData]) {
      setErrors(validate(updatedData));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate network request
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 700);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Coffee Inquiry',
      message: '',
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/[0.04] border border-[#EFAE54]/30 rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-dark-card animate-fade-in flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-[#EFAE54]/20 border border-[#EFAE54] flex items-center justify-center text-[#EFAE54] mb-5 shadow-accent-glow">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-[#EFAE54] text-xs font-bold uppercase tracking-widest">
          Message Received
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2 mb-3">
          Thank You, {formData.name}!
        </h3>
        <p className="text-white/75 text-sm sm:text-base max-w-md leading-relaxed mb-6">
          Your note regarding <span className="text-white font-semibold">{formData.subject}</span> has reached our team. We typically respond within 2 to 4 business hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="btn-pill-primary"
        >
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-dark-card transition-all">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white font-display">
          Send Us a Message
        </h2>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          Fill in the details below and our lead roaster or event team will follow up promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2"
          >
            Full Name <span className="text-[#EFAE54]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white transition-all text-sm focus:outline-none ${
                touched.name && errors.name
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-white/15 focus:border-[#EFAE54] focus:ring-2 focus:ring-[#EFAE54]/20'
              }`}
            />
          </div>
          {touched.name && errors.name && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2"
          >
            Email Address <span className="text-[#EFAE54]">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white transition-all text-sm focus:outline-none ${
                touched.email && errors.email
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-white/15 focus:border-[#EFAE54] focus:ring-2 focus:ring-[#EFAE54]/20'
              }`}
            />
          </div>
          {touched.email && errors.email && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject / Purpose Field */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2"
          >
            Inquiry Topic
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#1A1D2D] border border-white/15 text-white transition-all text-sm focus:outline-none focus:border-[#EFAE54] focus:ring-2 focus:ring-[#EFAE54]/20"
          >
            <option value="General Coffee Inquiry">General Coffee Inquiry</option>
            <option value="Private Room & Studio Booking">Private Room & Studio Booking</option>
            <option value="Wholesale & Bean Sourcing">Wholesale & Bean Sourcing</option>
            <option value="Event Catering & Tastings">Event Catering & Tastings</option>
            <option value="Feedback & Press">Feedback & Press</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-2"
          >
            Your Message <span className="text-[#EFAE54]">*</span>
          </label>
          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white transition-all text-sm focus:outline-none resize-none ${
                touched.message && errors.message
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-white/15 focus:border-[#EFAE54] focus:ring-2 focus:ring-[#EFAE54]/20'
              }`}
            />
          </div>
          {touched.message && errors.message && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-pill-primary w-full sm:w-auto"
            id="contact-submit-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#121421]" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#121421] flex items-center justify-center shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
