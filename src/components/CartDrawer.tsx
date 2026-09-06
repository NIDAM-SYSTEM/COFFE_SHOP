import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartProduct } from '../types/coffeeHouse';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartProduct[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [deliveryName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#121421] text-white h-full shadow-2xl flex flex-col z-10 border-l border-white/10 animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EFAE54] text-[#121421] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Your Coffee Bag</h2>
              <span className="text-xs text-white/50">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Order Confirmed!
              </h3>
              <p className="text-sm text-white/70">
                Thank you, {deliveryName || 'Coffee Lover'}! Your freshly ground morning brew is being prepared with artisanal care.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-white/50 space-y-3">
              <ShoppingBag className="w-16 h-16 stroke-1 text-white/20" />
              <p className="text-base font-medium text-white/70">Your cart is empty</p>
              <p className="text-xs text-white/40 max-w-xs">
                Explore our Popular Menu to add freshly pulled coffees and delectable pairing dishes.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-5 py-2.5 rounded-full bg-[#EFAE54] text-[#121421] font-bold text-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-contain bg-white/5 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#EFAE54] font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2 py-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-white/40 hover:text-red-400 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!orderComplete && items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-white/[0.02] space-y-3">
            <div className="space-y-1.5 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-white">
                  {items.reduce((s, i) => s + i.price * i.quantity, 0)} MAD
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              id="cart-drawer-checkout-cta"
              className="w-full py-3.5 rounded-full bg-[#EFAE54] hover:bg-[#DE9839] text-[#121421] font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Passer à la caisse</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
