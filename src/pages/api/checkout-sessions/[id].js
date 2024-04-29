import { stripe } from "@/utils/stripe";

export default async function handler(req, res) {
  const id = req.query.id;
  if (req.method === "GET") {
    try {
      
      if (!id.startsWith("cs_")) {
        throw new Error("Incorrect checkout session id");
      }
      const checkoutSession = await stripe.checkout.sessions.retrieve(id);
      res.status(200).json(checkoutSession);
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    req.setHeader("Allow", "GET");
    req.status(405).end("Method Not Allowed");
  }
}
