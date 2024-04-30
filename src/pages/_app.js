import AppLayout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "use-shopping-cart";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }) {
  return (
    <CartProvider stripe={stripeKey} cartMode="checkout-session" currency="USD">
      <AppLayout>
        <Component {...pageProps} />
        <Toaster />
        <SpeedInsights />
        <Analytics/>
      </AppLayout>
    </CartProvider>
  );
}
