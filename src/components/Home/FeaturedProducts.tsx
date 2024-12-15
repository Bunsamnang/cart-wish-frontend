import useData, { Product } from "../../hooks/useData";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const { data: featuredProducts, errorMsg } = useData(
    "/products/featured",
    (res) => {
      if (Array.isArray(res)) {
        return res as Product[];
      }
      throw new Error("Invalid response structure");
    }
  );

  return (
    <section className="my-14">
      <h1 className="text-3xl font-bold text-center mb-16">
        Featured Products
      </h1>
      {errorMsg ? (
        <p className="text-center text-red-500">{errorMsg}</p>
      ) : (
        <div className="flex justify-evenly max-sm:flex-col max-sm:items-center gap-5 max-lg:px-2">
          {featuredProducts &&
            featuredProducts.map((product) => (
              <ProductCard
                image={product.images[0]}
                imageAlt={`${product.title} image`}
                link={`/products/${product._id}`}
                name={product.title}
                numRating={product.reviews.counts}
                price={product.price}
                rating={product.reviews.rate.toFixed(1)}
                stock={product.stock}
                key={product._id}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
