"use client";

import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import CartStep from "./CartStep";
import ShippingStep from "./ShippingStep";
import PaymentStep from "./PaymentStep";
import { Check, ShoppingCart, MapPin, CreditCard } from "lucide-react";

const stepMeta = [
  { id: 1, title: "Cart",     icon: ShoppingCart },
  { id: 2, title: "Shipping", icon: MapPin },
  { id: 3, title: "Payment",  icon: CreditCard },
];

export default function CheckoutClient({ initialData }: { initialData: any }) {
  const { setCartData, step, cartItems } = useCheckoutStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (useCheckoutStore.getState().cartItems.length === 0) {
      setCartData(initialData);
    }
    setMounted(true);
  }, [initialData, setCartData]);

  if (!mounted) return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="animate-pulse h-20 bg-white/60 rounded-2xl" />
      <div className="animate-pulse h-[50vh] bg-white/60 rounded-2xl" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ── Progress stepper ── */}
      {cartItems.length > 0 && step <= 3 && (
        <div className="mb-8 max-w-xs mx-auto">
          <div className="relative flex items-start justify-between">
            {/* track base */}
            <div className="absolute left-0 right-0 top-[18px] h-px bg-emerald-100" />
            {/* filled track */}
            <div
              className="absolute left-0 top-[18px] h-px bg-emerald-500 transition-[width] duration-500"
              style={{ width: `${((step - 1) / (stepMeta.length - 1)) * 100}%` }}
            />

            {stepMeta.map((s) => {
              const Icon = s.icon;
              const done    = step > s.id;
              const current = step === s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      done    ? "bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-100" : "",
                      current ? "bg-white border-emerald-500 shadow-md shadow-emerald-100" : "",
                      !done && !current ? "bg-white border-stone-200" : "",
                    ].join(" ")}
                  >
                    {done
                      ? <Check size={14} strokeWidth={3} className="text-white" />
                      : <Icon size={14} strokeWidth={2} className={current ? "text-emerald-600" : "text-stone-300"} />
                    }
                  </div>
                  <span
                    className={[
                      "text-[10px] font-semibold uppercase tracking-widest",
                      step >= s.id ? "text-stone-700" : "text-stone-300",
                    ].join(" ")}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="min-h-[50vh]">
        {step === 1 && <CartStep />}
        {step === 2 && <ShippingStep />}
        {step === 3 && <PaymentStep />}
      </div>
    </div>
  );
}
