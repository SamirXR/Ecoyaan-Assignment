"use client";

import { useCheckoutStore, calculateTotals } from "@/store/useCheckoutStore";
import { CheckCircle2, ChevronLeft, CreditCard, Lock, MapPin, Mail, Phone, Package } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// ── Minimal inline brand SVGs ───────────────────────────────────────────────
function VisaLogo() {
  return (
    <svg viewBox="0 0 780 500" className="h-5 w-auto" aria-label="Visa">
      <rect width="780" height="500" rx="50" fill="#1A1F71" />
      <path d="M316 357H270l29-180h46l-29 180zm-75-180-44 124-5-26-15-78s-2-20-23-20H84l-1 4s21 5 45 19l37 177h47l72-200h-43zm320 180h41l-36-180h-36c-17 0-21 13-21 13l-68 167h48l10-26h58l4 26zm-50-63 24-65 14 65h-38zm-100-86-7 41s-18-9-39-9c-21 0-21 9-21 11 0 24 63 24 63 74 0 44-39 66-80 66-33 0-56-10-56-10l8-43s24 12 48 12c14 0 22-6 22-15 0-26-62-26-62-74 0-44 36-69 76-69 32 0 48 16 48 16z" fill="white" />
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 131.39 86.9" className="h-5 w-auto" aria-label="Mastercard">
      <rect width="131.39" height="86.9" rx="8" fill="#252525" />
      <circle cx="49.22" cy="43.45" r="27.23" fill="#EB001B" />
      <circle cx="82.17" cy="43.45" r="27.23" fill="#F79E1B" />
      <path d="M65.7 21.33a27.22 27.22 0 0 1 0 44.24 27.22 27.22 0 0 1 0-44.24z" fill="#FF5F00" />
    </svg>
  );
}

function UPILogo() {
  return (
    <svg viewBox="0 0 80 32" className="h-5 w-auto" aria-label="UPI">
      <rect width="80" height="32" rx="5" fill="#FFFFFF" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="11" fill="#097939">UPI</text>
      <path d="M8 16 L14 8 L14 13 L18 13 L18 19 L14 19 L14 24 Z" fill="#097939" />
      <path d="M22 16 L16 8 L16 13 L12 13 L12 19 L16 19 L16 24 Z" fill="#ED1C24" />
    </svg>
  );
}

function RuPayLogo() {
  return (
    <svg viewBox="0 0 90 32" className="h-5 w-auto" aria-label="RuPay">
      <rect width="90" height="32" rx="5" fill="#FFFFFF" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="7" y="21" fontFamily="Arial" fontWeight="900" fontSize="12" fill="#003399">Ru</text>
      <text x="30" y="21" fontFamily="Arial" fontWeight="900" fontSize="12" fill="#E91E2C">Pay</text>
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg viewBox="0 0 80 32" className="h-5 w-auto" aria-label="American Express">
      <rect width="80" height="32" rx="5" fill="#016FD0" />
      <text x="50%" y="57%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="9" fill="white" letterSpacing="0.5">AMERICAN</text>
      <text x="50%" y="78%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial" fontWeight="800" fontSize="9" fill="white" letterSpacing="0.5">EXPRESS</text>
    </svg>
  );
}

const PAYMENT_BADGES = [
  { label: "Visa",     Icon: VisaLogo },
  { label: "Mastercard", Icon: MastercardLogo },
  { label: "UPI",      Icon: UPILogo },
  { label: "RuPay",    Icon: RuPayLogo },
  { label: "Amex",     Icon: AmexLogo },
];

export default function PaymentStep() {
  const { cartItems, shippingFee, discountApplied, shippingAddress, setStep, clearCart } = useCheckoutStore();
  const { subtotal, total } = calculateTotals(useCheckoutStore.getState());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call for payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Optional: clearCart() after a timeout or let success screen handle it
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto w-full text-center py-10 px-6 bg-white rounded-2xl shadow-sm border border-stone-100 mt-4">
        {/* Animated success ring */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-emerald-50 animate-ping opacity-30" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={44} strokeWidth={1.5} className="text-emerald-500" />
          </div>
        </div>

        <p className="text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-1.5">All done</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-2 tracking-tight">Order Placed!</h2>
        <p className="text-stone-400 mb-6 max-w-xs mx-auto text-sm leading-relaxed">
          Thank you, <span className="font-semibold text-stone-700">{shippingAddress?.fullName}</span>. We'll send a confirmation to <span className="font-medium text-stone-600">{shippingAddress?.email}</span>.
        </p>

        <div className="bg-stone-50 rounded-xl p-4 text-left mb-5 border border-stone-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-medium">Amount charged</span>
            <span className="text-lg font-bold text-stone-900">₹{total.toFixed(2)}</span>
          </div>
          <div className="border-t border-stone-100 pt-3 flex items-center gap-2 text-sm text-stone-500">
            <MapPin size={13} className="text-emerald-500 shrink-0" />
            {shippingAddress?.city}, {shippingAddress?.state} — {shippingAddress?.pinCode}
          </div>
        </div>

        <button
          onClick={() => clearCart()}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-sm text-sm"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setStep(2)}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Back to Shipping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">

          {/* ── Delivery address card ── */}
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={12} className="text-emerald-500" /> Delivering to
              </h2>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
              >
                Edit
              </button>
            </div>
            {shippingAddress && (
              <div className="space-y-1.5 text-sm">
                <p className="font-semibold text-stone-900">{shippingAddress.fullName}</p>
                <p className="text-stone-400 flex items-center gap-2">
                  <Mail size={12} className="text-stone-300" />{shippingAddress.email}
                </p>
                <p className="text-stone-400 flex items-center gap-2">
                  <Phone size={12} className="text-stone-300" />{shippingAddress.phone}
                </p>
                <p className="text-stone-500 flex items-center gap-2">
                  <Package size={12} className="text-stone-300" />
                  {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
                </p>
              </div>
            )}
          </div>

          {/* ── Payment method card ── */}
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
            <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest flex items-center gap-2 mb-3">
              <CreditCard size={12} className="text-emerald-500" /> Payment method
            </h2>

            <div className="space-y-2">
              {/* Selected: Pay Online */}
              <label className="flex items-center justify-between p-3 border-2 border-emerald-400 rounded-xl bg-emerald-50/40 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-[4px] border-emerald-500 bg-white shrink-0" />
                  <span className="font-semibold text-stone-800 text-sm">Pay Online</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full tracking-wide uppercase">Recommended</span>
                </div>
                <span className="font-bold text-stone-900 text-sm">₹{total.toFixed(2)}</span>
              </label>

              {/* Cash on delivery */}
              <label className="flex items-center justify-between p-3 border border-stone-200 rounded-xl bg-white cursor-pointer hover:border-stone-300 transition-colors opacity-55">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-stone-300 bg-white shrink-0" />
                  <span className="font-medium text-stone-700 text-sm">Cash on Delivery</span>
                </div>
                <span className="text-stone-400 text-xs font-medium">+ ₹50 handling</span>
              </label>
            </div>

            {/* ── Accepted payment brand logos ── */}
            <div className="mt-4 pt-4 border-t border-stone-100">
              <p className="text-[11px] text-stone-400 font-medium uppercase tracking-widest mb-2">Accepted payments</p>
              <div className="flex items-center gap-2 flex-wrap">
                {PAYMENT_BADGES.map(({ label, Icon }) => (
                  <div key={label} className="rounded-md overflow-hidden border border-stone-200 hover:border-stone-300 transition-colors" title={label}>
                    <Icon />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Pay button ── */}
            <div className="mt-4">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-100 active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock size={14} strokeWidth={2.5} />
                    Pay ₹{total.toFixed(2)} Securely
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-400 mt-2.5 flex items-center justify-center gap-1">
                <Lock size={10} /> 256-bit SSL encrypted · PCI DSS compliant
              </p>
            </div>
          </div>
        </div>

        {/* ── Order summary sidebar ── */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm sticky top-20">
            <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-widest mb-3">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.product_id} className="flex gap-2.5 items-center">
                  <div className="w-11 h-11 relative rounded-lg overflow-hidden bg-stone-50 border border-stone-100 flex-shrink-0">
                    <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white leading-none">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-800 text-xs line-clamp-2">{item.product_name}</h3>
                    <p className="text-stone-400 text-xs mt-0.5">₹{item.product_price} × {item.quantity}</p>
                  </div>
                  <span className="text-stone-800 text-sm font-semibold">₹{(item.product_price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-medium text-stone-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Standard Shipping</span>
                <span className="font-medium text-stone-800">₹{shippingFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 mt-3 border-t border-stone-100">
              <span className="font-semibold text-stone-700 text-sm">Total</span>
              <div className="text-right">
                <span className="text-xl font-extrabold text-stone-900">₹{total.toFixed(2)}</span>
                <p className="text-[10px] text-stone-400 font-medium">incl. all taxes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}