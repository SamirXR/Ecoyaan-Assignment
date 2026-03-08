import CheckoutClient from "@/components/checkout/CheckoutClient";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/cart", { cache: "no-store" }).catch(() => null);
  let data = null;

  if (res && res.ok) {
    data = await res.json();
  } else {
    data = {
      cartItems: [
        {
          product_id: 101,
          product_name: "Bamboo Toothbrush (Pack of 4)",
          product_price: 299,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=640&q=80",
        },
        {
          product_id: 102,
          product_name: "Reusable Cotton Produce Bags",
          product_price: 450,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=640&q=80",
        },
      ],
      shipping_fee: 50,
      discount_applied: 0,
    };
  }

  return (
    <div className="w-full">
      <h1 className="sr-only">Checkout</h1>
      <CheckoutClient initialData={data} />
    </div>
  );
}
