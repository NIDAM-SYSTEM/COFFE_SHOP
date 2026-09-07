/**
 * TrackingSearchInput.tsx — Phase 9: Order Lookup Search Field
 *
 * Accepts either:
 *   - Order ID  (e.g. "MA-1024" or "CH-XXXXXX-YYY")
 *   - Moroccan phone number (06/07XXXXXXXX or +212 variants)
 *
 * URL synchronisation:
 *   - On mount: reads `?orderId=` or `?phone=` from URL → pre-fills + auto-triggers lookup.
 *   - On submit: writes `?orderId=` (or `?phone=`) via setSearchParams()
 *     without a full page reload.
 *   - "Clear" button: removes the param and resets state.
 *
 * The component is intentionally input-only — it calls `onResult(order | undefined)`
 * so the parent page manages the found order and error presentation.
 */

import { useState, useEffect, useCallback, useId, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Loader2, AlertCircle, Phone, Hash } from 'lucide-react';
import { lookupOrder } from '../../data/mockOrders';
import type { MockOrder } from '../../types';

// ── Input type detection ───────────────────────────────────────────────────

/** Returns true if the query looks like a Moroccan mobile number */
const PHONE_RE = /^(?:\+212|0)(6|7)[\s\-]?(\d[\s\-]?){8}$/;
/** Returns true if query looks like an app-generated order code */
const ORDER_ID_RE = /^(MA|CH)-/i;

type QueryKind = 'phone' | 'orderId' | 'unknown';

function detectKind(q: string): QueryKind {
  const clean = q.trim();
  if (PHONE_RE.test(clean.replace(/\s/g, ''))) return 'phone';
  if (ORDER_ID_RE.test(clean)) return 'orderId';
  return 'unknown';
}

/** Auto-format a phone string as "06 12 34 56 78" while typing */
function autoFormatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

// ── Sub-components ─────────────────────────────────────────────────────────

/** Pill badge showing which input type was detected */
function KindPill({ kind }: { kind: QueryKind }) {
  if (kind === 'unknown') return null;
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border
        ${kind === 'phone'
          ? 'bg-blue-500/15 text-blue-400 border-blue-500/25'
          : 'bg-[#EFAE54]/15 text-[#EFAE54] border-[#EFAE54]/25'}
      `}
    >
      {kind === 'phone' ? <Phone size={9} /> : <Hash size={9} />}
      {kind === 'phone' ? 'Numéro WhatsApp' : 'Numéro de commande'}
    </span>
  );
}

// ── Example pills ──────────────────────────────────────────────────────────

const EXAMPLES = [
  { label: 'MA-1024', kind: 'orderId' as QueryKind },
  { label: '0661234567', kind: 'phone' as QueryKind },
  { label: 'MA-1026', kind: 'orderId' as QueryKind },
];

// ── Main Component ─────────────────────────────────────────────────────────

export interface TrackingSearchInputProps {
  /** Called with the found order (or undefined if not found) after each search */
  onResult: (order: MockOrder | undefined) => void;
  /** Called when the input is cleared, so the parent can reset its state */
  onClear: () => void;
}

export default function TrackingSearchInput({
  onResult,
  onClear,
}: TrackingSearchInputProps) {
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<MockOrder | undefined>();

  const kind = detectKind(query);

  // ── Core search function ──────────────────────────────────────────────

  const triggerSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;

      setLoading(true);
      setHasSearched(false);

      // Simulate a brief async lookup (≈400ms) for perceived realism
      setTimeout(() => {
        const result = lookupOrder(trimmed);
        setFoundOrder(result);
        setHasSearched(true);
        setLoading(false);
        onResult(result);

        // Push to URL without reload
        const detectedKind = detectKind(trimmed);
        if (detectedKind === 'phone') {
          setSearchParams({ phone: trimmed.replace(/\s/g, '') }, { replace: true });
        } else {
          setSearchParams({ orderId: trimmed }, { replace: true });
        }
      }, 400);
    },
    [onResult, setSearchParams]
  );

  // ── Auto-hydrate from URL params on mount ─────────────────────────────

  useEffect(() => {
    const paramOrderId = searchParams.get('orderId');
    const paramPhone   = searchParams.get('phone');
    const initialQuery = paramOrderId ?? paramPhone ?? '';

    if (initialQuery) {
      setQuery(initialQuery);
      triggerSearch(initialQuery);
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Form submit ───────────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(query);
  };

  // ── Input change with phone auto-format ──────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Only auto-format if it looks like a phone number being typed
    if (/^[0\+]/.test(val) && /^[\d\s\+\-]*$/.test(val)) {
      val = autoFormatPhone(val);
    }
    setQuery(val);
    // Reset result state on edit so stale result doesn't persist
    if (hasSearched) {
      setHasSearched(false);
      setFoundOrder(undefined);
    }
  };

  // ── Clear ─────────────────────────────────────────────────────────────

  const handleClear = () => {
    setQuery('');
    setHasSearched(false);
    setFoundOrder(undefined);
    setSearchParams({}, { replace: true });
    onClear();
    inputRef.current?.focus();
  };

  // ── Derived states ────────────────────────────────────────────────────

  const isNotFound = hasSearched && !foundOrder && !loading;
  const isFound    = hasSearched && !!foundOrder && !loading;

  const inputBorderClass = isNotFound
    ? 'border-red-500/50 focus:border-red-400'
    : isFound
    ? 'border-emerald-500/40 focus:border-emerald-400'
    : 'border-white/12 focus:border-[#EFAE54]';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* ── Label ── */}
      <div className="text-center space-y-1">
        <label
          htmlFor={`${uid}-search`}
          className="block text-sm font-semibold text-white/70"
        >
          Numéro de commande ou numéro WhatsApp
        </label>
        <p className="text-xs text-white/35">
          Entrez votre référence de commande (ex : <span className="text-[#EFAE54]">MA-1024</span>) ou votre numéro WhatsApp marocain
        </p>
      </div>

      {/* ── Search form ── */}
      <form onSubmit={handleSubmit} className="relative">
        {/* Left search icon / loading spinner */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading
            ? <Loader2 size={18} className="text-[#EFAE54] animate-spin" />
            : <Search size={18} className={isNotFound ? 'text-red-400' : isFound ? 'text-emerald-400' : 'text-white/30'} />
          }
        </div>

        {/* Input field */}
        <input
          ref={inputRef}
          id={`${uid}-search`}
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="MA-1024  ou  06 12 34 56 78"
          value={query}
          onChange={handleChange}
          disabled={loading}
          className={`
            w-full pl-11 pr-24 py-4 rounded-2xl text-sm text-white
            bg-white/5 border transition-all duration-200
            placeholder-white/20 outline-none
            focus:ring-2 focus:ring-[#EFAE54]/20
            disabled:opacity-60
            ${inputBorderClass}
          `}
        />

        {/* Right: clear button + submit */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query && !loading && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Effacer la recherche"
              className="p-1.5 rounded-full text-white/30 hover:text-white/70 hover:bg-white/8 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <button
            type="submit"
            disabled={!query.trim() || loading}
            id="tracking-search-submit"
            className={`
              px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
              ${query.trim() && !loading
                ? 'bg-[#EFAE54] text-[#121421] hover:bg-[#DE9839] hover:scale-[1.03] active:scale-[0.97]'
                : 'bg-white/8 text-white/25 cursor-not-allowed'}
            `}
          >
            Suivre
          </button>
        </div>
      </form>

      {/* ── Detected input type pill ── */}
      {query.trim() && !hasSearched && (
        <div className="flex justify-center">
          <KindPill kind={kind} />
        </div>
      )}

      {/* ── Not found error state ── */}
      {isNotFound && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-red-500/8 border border-red-500/20 px-4 py-3"
        >
          <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-400">Commande introuvable</p>
            <p className="text-xs text-white/45 mt-0.5 leading-relaxed">
              Vérifiez votre numéro de commande ou votre numéro WhatsApp.
              Le suivi est disponible dès la confirmation de votre paiement.
            </p>
          </div>
        </div>
      )}

      {/* ── Quick-try example pills ── */}
      {!hasSearched && !query && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-[11px] text-white/25">Essayez :</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => {
                setQuery(ex.label);
                triggerSearch(ex.label);
              }}
              className={`
                inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium
                border transition-colors hover:brightness-125
                ${ex.kind === 'phone'
                  ? 'bg-blue-500/10 text-blue-400/80 border-blue-500/20'
                  : 'bg-[#EFAE54]/10 text-[#EFAE54]/70 border-[#EFAE54]/20'}
              `}
            >
              {ex.kind === 'phone' ? <Phone size={9} /> : <Hash size={9} />}
              {ex.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
