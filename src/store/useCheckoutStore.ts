import { create } from "zustand";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

export interface CheckoutState {
  cartItems: CartItem[];
  shippingFee: number;
  discountApplied: number;
  shippingAddress: ShippingAddress | null;
  step: number; 
  setCartData: (data: { cartItems: CartItem[]; shipping_fee: number; discount_applied: number }) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeItems: (id: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setStep: (step: number) => void;
  clearCart: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  cartItems: [],
  shippingFee: 0,
  discountApplied: 0,
  shippingAddress: null,
  step: 1, // 1: Cart, 2: Shipping, 3: Payment
  
  setCartData: (data) =>
    set({
      cartItems: data.cartItems,
      shippingFee: data.shipping_fee,
      discountApplied: data.discount_applied,
    }),

  updateQuantity: (id, delta) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) => {
        if (item.product_id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    })),

  removeItems: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product_id !== id),
    })),

  setShippingAddress: (address) =>
    set({
      shippingAddress: address,
      step: 3, // Proceed to payment
    }),

  setStep: (step) => set({ step }),
  
  clearCart: () =>
    set({
      cartItems: [],
      shippingFee: 0,
      discountApplied: 0,
      shippingAddress: null,
      step: 1,
    }),
}));

export const calculateTotals = (state: CheckoutState) => {
  const subtotal = state.cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const total = subtotal + state.shippingFee - state.discountApplied;
  return { subtotal, total };
};
