import useData, { Product } from "../../hooks/useData";
import ProductCard from "../Products/ProductCard";

const FeaturedProducts = () => {
  const { data: featuredProducts, errorMsg } = useData<Product[]>(
    "/products/featured",
    undefined,
    10 * 60 * 60 * 1000
  );

  return (
    <section data-aos="zoom-in" className="my-14">
      <h1 className="text-3xl font-bold text-center mb-16">
        Featured Products
      </h1>
      {errorMsg ? (
        <p className="text-center text-red-500">{errorMsg}</p>
      ) : (
        <div className="flex justify-evenly max-sm:flex-col max-sm:items-center gap-5 max-lg:px-2">
          {featuredProducts &&
            featuredProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
