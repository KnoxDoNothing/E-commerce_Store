import AppLayout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "use-shopping-cart";
import { SpeedInsights } from "@vercel/speed-insights/next";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }) {
  return (
    <SpeedInsights>
      <CartProvider
        stripe={stripeKey}
        cartMode="checkout-session"
        currency="USD"
      >
        <AppLayout>
          <Component {...pageProps} />
          <Toaster />
        </AppLayout>
      </CartProvider>
    </SpeedInsights>
  );
}
