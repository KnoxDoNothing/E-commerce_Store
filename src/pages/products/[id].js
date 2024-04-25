import { stripe } from "@/utils/stripe";
import Image from "next/image";

export default function ProductPage({ product }) {
  // console.log('product',product);

  return (
    <div className="container lg:max-w-screen-lg mx-auto py-12 px-6 ">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12 ">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "contain" }}
            sizes="100%"
            priority
          />
        </div>

        <div className="w-full flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6 bg-white">
          <h2 className="text-3x1 font-semibold">{product.name}</h2>
          <p className="pt-2 flex items-center space-x-2"></p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const inventory = await stripe.products.list();
  const paths = inventory.data.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
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
      image: product.images[0],
    };
  });
  const product = products.find((product) => product.id === params.id);

  return {
    props: { product },
    revalidate: 60 * 60,
  };
}
