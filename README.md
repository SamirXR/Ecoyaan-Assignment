# Ecoyaan Checkout Flow

> A minimal, elegant checkout experience built for the Ecoyaan Frontend Engineering Interview Assignment.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Built-in SSR via Server Components; no boilerplate |
| Language | **TypeScript** | Type-safe props, store, and API responses |
| Styling | **Tailwind CSS** | Utility-first; rapid, consistent design system |
| State | **Zustand** | Minimal, boilerplate-free global store; persists across all steps |
| Forms | **React Hook Form** | Performant validation without re-renders |
| Icons | **Lucide React** | Crisp, consistent SVG icon set |

---

## Architecture

```
src/
├── app/
│   ├── api/cart/route.ts     ← Mock API route (simulates SSR data source)
│   ├── layout.tsx             ← Root layout: header, favicon, global styles
│   ├── page.tsx               ← Server Component: fetches cart data via SSR
│   └── globals.css            ← Base styles + warm gradient background
├── components/checkout/
│   ├── CheckoutClient.tsx     ← Client orchestrator: step state + progress bar
│   ├── CartStep.tsx           ← Step 1: Product list, qty controls, order summary
│   ├── ShippingStep.tsx       ← Step 2: Address form with inline validation
│   └── PaymentStep.tsx        ← Step 3: Review, payment methods, success state
└── store/
    └── useCheckoutStore.ts    ← Zustand store: cart, address, step management
```

### Key Architectural Decisions

**Server-Side Rendering** — `app/page.tsx` is an async Server Component that fetches from the local `/api/cart` route at request time. The resolved data is passed as a prop to the client shell (`CheckoutClient`), hydrating Zustand's store on first load — no client-side loading flicker.

**Zustand over Context** — Context re-renders the entire subtree on every state change. Zustand's selector-based subscriptions mean only the components that consume a specific slice re-render, keeping the UI smooth as users update quantities.

**React Hook Form** — Validation runs on the native DOM without controlled inputs, keeping the form performant. All six fields validate with regex patterns before the user can advance.

**Component isolation** — Each step (`CartStep`, `ShippingStep`, `PaymentStep`) is fully self-contained. Swapping or reordering steps requires no refactoring elsewhere.

---

## Checkout Flow

```
Cart ──→ Shipping Address ──→ Payment & Confirmation ──→ Order Success
```

1. **Cart** — Products loaded via SSR. Quantity stepper, remove items, live subtotal + shipping total.
2. **Shipping** — Pre-filled form. Validates email format, 10-digit phone, 6-digit PIN Code. Persists to Zustand.
3. **Payment** — Final order summary + saved address. Supports online payment (Visa / Mastercard / UPI / RuPay / Amex) or COD. Simulates a 1.5s processing state, then shows "Order Placed" success screen.

---

## Running Locally

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd ecoyaan-checkout

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build && npm start
```

No environment variables required — everything runs locally.

---

## Assignment Checklist

- [x] **React + Next.js App Router**
- [x] **Server-Side Rendering** — async Server Component fetches mock cart data at request time
- [x] **Mock API** — `/api/cart` route handler with simulated network delay
- [x] **Zustand** global state — cart items and address persisted across all 3 steps
- [x] **Cart screen** — product images, qty controls, subtotal, shipping fee, grand total
- [x] **Shipping form** — all 6 required fields with regex validation (email, phone, PIN)
- [x] **Payment screen** — order review + address summary + branded payment method badges
- [x] **Success state** — animated "Order Placed!" confirmation screen
- [x] **Responsive** — mobile-first grid layout, works on all screen sizes
- [x] **TypeScript** throughout — typed store, components, and API response
- [x] **Clean, minimal UI** — warm off-white palette, emerald accents, smooth transitions

---

_Built with care for the Ecoyaan team. Sustainability made easy._

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
