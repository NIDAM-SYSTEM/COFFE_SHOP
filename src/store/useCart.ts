import { useSyncExternalStore, useCallback, useMemo } from 'react';
import type { CartItem, GrindOption, CoffeeProduct } from '../types';

let globalCartItems: CartItem[] = [];
const listeners = new Set<() => void>();
const drawerListeners = new Set<(isOpen: boolean) => void>();
type ItemAddedListener = (item: CartItem) => void;
const itemAddedListeners = new Set<ItemAddedListener>();

function emitCartChange() {
  listeners.forEach((listener) => listener());
}

export function openCartDrawer() {
  drawerListeners.forEach((listener) => listener(true));
}

export function closeCartDrawer() {
  drawerListeners.forEach((listener) => listener(false));
}

export function subscribeToCartDrawer(listener: (isOpen: boolean) => void) {
  drawerListeners.add(listener);
  return () => {
    drawerListeners.delete(listener);
  };
}

export function subscribeToItemAdded(listener: ItemAddedListener) {
  itemAddedListeners.add(listener);
  return () => {
    itemAddedListeners.delete(listener);
  };
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getCartSnapshot(): CartItem[] {
  return globalCartItems;
}

export function syncCartItemQuantity(itemId: string, quantity: number) {
  globalCartItems = globalCartItems
    .map((item) => {
      const key = `${item.product.id}-${item.selectedGrind}`;
      if (key === itemId || item.product.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
  emitCartChange();
}

export function syncRemoveCartItem(itemId: string) {
  globalCartItems = globalCartItems.filter((item) => {
    const key = `${item.product.id}-${item.selectedGrind}`;
    return key !== itemId && item.product.id !== itemId;
  });
  emitCartChange();
}

export function syncClearCart() {
  globalCartItems = [];
  emitCartChange();
}

export function useCart() {
  const items = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => []);

  const addItem = useCallback(
    (product: CoffeeProduct, grind: GrindOption, autoOpen = true) => {
      let addedItem: CartItem;
      const existing = globalCartItems.find(
        (i) => i.product.id === product.id && i.selectedGrind === grind
      );
      if (existing) {
        addedItem = { ...existing, quantity: existing.quantity + 1 };
        globalCartItems = globalCartItems.map((i) =>
          i.product.id === product.id && i.selectedGrind === grind
            ? addedItem
            : i
        );
      } else {
        addedItem = { product, selectedGrind: grind, quantity: 1 };
        globalCartItems = [...globalCartItems, addedItem];
      }
      emitCartChange();
      itemAddedListeners.forEach((fn) => fn(addedItem));

      if (autoOpen) {
        openCartDrawer();
      }
    },
    []
  );

  const removeItem = useCallback((productId: string, grind: GrindOption) => {
    globalCartItems = globalCartItems.filter(
      (i) => !(i.product.id === productId && i.selectedGrind === grind)
    );
    emitCartChange();
  }, []);

  const updateQuantity = useCallback(
    (productId: string, grind: GrindOption, quantity: number) => {
      if (quantity <= 0) {
        globalCartItems = globalCartItems.filter(
          (i) => !(i.product.id === productId && i.selectedGrind === grind)
        );
      } else {
        globalCartItems = globalCartItems.map((i) =>
          i.product.id === productId && i.selectedGrind === grind
            ? { ...i, quantity }
            : i
        );
      }
      emitCartChange();
    },
    []
  );

  const clearCart = useCallback(() => {
    globalCartItems = [];
    emitCartChange();
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    openCart: openCartDrawer,
    closeCart: closeCartDrawer,
  };
}
