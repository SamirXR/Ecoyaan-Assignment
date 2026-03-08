"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Minus, Plus, Trash2, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartStep() {
  const { cartItems, shippingFee, discountApplied, updateQuantity, removeItems, setStep } = useCheckoutStore();
  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
  const total = subtotal + shippingFee - discountApplied;
  const totalQty = cartItems.reduce((a, i) => a + i.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-5">
          <Leaf size={28} className="text-stone-300" />
        </div>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">Your cart is empty</h2>
        <p className="text-stone-400 text-sm">Add eco-friendly products to start your sustainable journey.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-5">

      {/* ── Product list ── */}
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <h2 className="text-base font-bold text-stone-900">Your Cart</h2>
          <span className="text-sm text-stone-400 font-medium">{totalQty} item{totalQty !== 1 ? "s" : ""}</span>
        </div>

        <div className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex gap-3 p-3 bg-white rounded-xl border border-stone-100 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] hover:shadow-[0_3px_12px_0_rgba(0,0,0,0.07)] transition-shadow items-start"
            >
              {/* Product image */}
              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-emerald-50 flex-shrink-0">
                <Image src={item.image} alt={item.product_name} fill className="object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-stone-900 text-sm leading-snug">{item.product_name}</h3>
                  <span className="font-bold text-stone-900 text-sm whitespace-nowrap tabular-nums">
                    ₹{(item.product_price * item.quantity).toFixed(0)}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">₹{item.product_price} / unit</p>

                <div className="flex items-center justify-between mt-2">
                  {/* Qty stepper */}
                  <div className="inline-flex items-center gap-0.5 bg-stone-50 border border-stone-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.product_id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-stone-400 hover:bg-white hover:text-stone-900 hover:shadow-sm transition-all"
                    >
                      <Minus size={12} strokeWidth={2.5} />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold text-stone-800 tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-stone-400 hover:bg-white hover:text-stone-900 hover:shadow-sm transition-all"
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItems(item.product_id)}
                    className="p-1.5 rounded-lg text-stone-300 hover:text-red-400 hover:bg-red-50 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Eco impact strip */}
        <div className="mt-4 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
          <Leaf size={15} className="text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">{totalQty} eco-friendly item{totalQty !== 1 ? "s" : ""}</span> — making a real difference, one purchase at a time.
          </p>
        </div>
      </div>

      {/* ── Order summary ── */}
      <div>
        <div className="bg-white rounded-xl border border-stone-100 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] p-5 sticky top-20">
          <h2 className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest mb-3">Order Summary</h2>

          <div className="space-y-2.5 text-sm pb-4 border-b border-stone-100">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span className="font-medium text-stone-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Standard Shipping</span>
              <span className="font-medium text-stone-800">₹{shippingFee.toFixed(2)}</span>
            </div>
            {discountApplied > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold">−₹{discountApplied.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="font-semibold text-stone-700">Total</span>
            <div className="text-right">
              <p className="text-xl font-extrabold text-stone-900 tracking-tight tabular-nums">₹{total.toFixed(2)}</p>
              <p className="text-[10px] text-stone-400 font-medium mt-0.5">Incl. all taxes</p>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-100 active:scale-[0.98] text-sm"
          >
            Proceed to Checkout
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-stone-400">
            <ShieldCheck size={12} className="text-emerald-500" />
            Secure &amp; encrypted checkout
          </div>
        </div>
      </div>
    </div>
  );
}
