"use client";

import type { ElementType, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useCheckoutStore, ShippingAddress } from "@/store/useCheckoutStore";
import {
  ArrowLeft, ArrowRight, MapPin, ShieldCheck,
  User, Mail, Phone, Hash, Building2, Map,
} from "lucide-react";

function Field({
  id, label, Icon, error, children,
}: {
  id: string;
  label: string;
  Icon: ElementType;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-widest"
      >
        <Icon size={11} className="text-emerald-500" />
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500">⚠ {error}</p>}
    </div>
  );
}

export default function ShippingStep() {
  const { setShippingAddress, setStep, shippingAddress } = useCheckoutStore();

  const { register, handleSubmit, formState: { errors } } = useForm<ShippingAddress>({
    defaultValues: shippingAddress || {
      fullName: "Samir",
      email: "samiryzy@gmaail.com",
      phone: "8595136700",
      pinCode: "110008",
      city: "New Delhi",
      state: "Delhi",
    },
  });

  const onSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
  };

  const inputCls = (err: boolean) =>
    `w-full px-3 py-2 rounded-lg border text-sm text-stone-900 placeholder:text-stone-300 bg-stone-50 outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] ${
      err
        ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
        : "border-stone-200 focus:border-emerald-400"
    }`;

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* Back link */}
      <button
        onClick={() => setStep(1)}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-400 hover:text-stone-700 uppercase tracking-widest transition-colors mb-4 group"
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to cart
      </button>

      <div className="bg-white rounded-xl border border-stone-100 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Card header */}
        <div className="px-5 py-4 border-b border-stone-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <MapPin size={15} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="font-bold text-stone-900 text-sm">Delivery Details</h2>
            <p className="text-xs text-stone-400 mt-0.5">Where should we send your order?</p>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="fullName" label="Full Name" Icon={User} error={errors.fullName?.message}>
              <input
                id="fullName"
                type="text"
                placeholder="Aanya Sharma"
                className={inputCls(!!errors.fullName)}
                {...register("fullName", { required: "Full name is required" })}
              />
            </Field>
            <Field id="email" label="Email Address" Icon={Mail} error={errors.email?.message}>
              <input
                id="email"
                type="email"
                placeholder="aanya@ecoyaan.com"
                className={inputCls(!!errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="phone" label="Phone Number" Icon={Phone} error={errors.phone?.message}>
              <input
                id="phone"
                type="tel"
                placeholder="9876543210"
                className={inputCls(!!errors.phone)}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" },
                })}
              />
            </Field>
            <Field id="pinCode" label="PIN Code" Icon={Hash} error={errors.pinCode?.message}>
              <input
                id="pinCode"
                type="text"
                placeholder="110008"
                className={inputCls(!!errors.pinCode)}
                {...register("pinCode", {
                  required: "PIN Code is required",
                  pattern: { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="city" label="City" Icon={Building2} error={errors.city?.message}>
              <input
                id="city"
                type="text"
                placeholder="New Delhi"
                className={inputCls(!!errors.city)}
                {...register("city", { required: "City is required" })}
              />
            </Field>
            <Field id="state" label="State" Icon={Map} error={errors.state?.message}>
              <input
                id="state"
                type="text"
                placeholder="Delhi"
                className={inputCls(!!errors.state)}
                {...register("state", { required: "State is required" })}
              />
            </Field>
          </div>

          {/* Footer row */}
          <div className="pt-4 mt-1 border-t border-stone-50 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <ShieldCheck size={12} className="text-emerald-500" />
              Your details are encrypted &amp; secure
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm active:scale-[0.98] text-sm group whitespace-nowrap"
            >
              Continue to Payment
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
