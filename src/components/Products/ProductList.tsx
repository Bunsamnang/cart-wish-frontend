import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import { Product } from "./../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductsResponse {
  products: Product[];
}
const ProductList = () => {
  const { data, errorMsg, isLoading } = useData<ProductsResponse>("/products");
  console.log(data);

  // create number of skeletons based on num of response
  const skeletons = Array.from({ length: data?.products.length || 8 });

  return (
    <section className="bg-[#f6f8fa] p-2">
      <header className="flex items-center justify-between gap-x-2 mb-5">
        <h1 className="text-2xl font-semibold">Products</h1>
        <select
          name="sort"
          id=""
          className="outline-none rounded-md text-sm border-none shadow"
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH </option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH </option>
        </select>
      </header>
      {errorMsg ? (
        <p className="text-red-500 text-center">{errorMsg}</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* checks if data is not null or undefined */}

          {isLoading
            ? skeletons.map((_, index) => <ProductCardSkeleton key={index} />)
            : data?.products.map((product) => (
                <ProductCard
                  image={product.images[0]}
                  imageAlt={product.title}
                  link={product._id}
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

export default ProductList;
