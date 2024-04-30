const Stripe = require("stripe");
const products = require("./products");

const stripe = Stripe('sk_test_51PAqgQJzZiryIXtcGPeN9gWH4ZfsvhfKeGn2UJN8aqwfPQPqlMs8LMOonIhKDb8azrVvdnewjGaIrl9qtk1Zo1Ga00ioc4Gaji');

(async () => {
  for (const product of products) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      default_price_data: {
        currency: product.currency,
        unit_amount_decimal: product.price,
      },
      images: [product.image],
    });
    console.log(stripeProduct.name, ":", stripeProduct.id);
  }
})();
