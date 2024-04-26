import { stripe } from "@/utils/stripe";
import { validateCartItems } from "use-shopping-cart/utilities";

export default async function handler(req, res) {
  if (req.method === "PSOT") {
    try {
      const cartDetails = req.body;
      const inventory = await stripe.products.list({
        expand: ["data.default_price"],
      });

      const products = inventory.data.map((product) => {
        const price = product.default_price;

        return {
          currency: price.currency,
          id: product.id,
          name: product.name,
          price: price.unit_amount,
          image: product.image[0],
        };
      });
      const lineItems = validateCartItems(products, cartDetails);
    } catch (error) {}
  } else {
    req.setHeader("Allow", "POST");
    req.status(405).end("Method Not Allowed");
  }
}
