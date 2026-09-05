import { useState, useCallback, useMemo } from 'react';
import type { CartItem, GrindOption, CoffeeProduct } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: CoffeeProduct, grind: GrindOption) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedGrind === grind
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedGrind === grind
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, selectedGrind: grind, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, grind: GrindOption) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedGrind === grind)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, grind: GrindOption, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter(
            (i) => !(i.product.id === productId && i.selectedGrind === grind)
          )
        );
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedGrind === grind
            ? { ...i, quantity }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal };
}
