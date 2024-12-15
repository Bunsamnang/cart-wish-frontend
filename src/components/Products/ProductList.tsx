import ProductCard from "./ProductCard";
import iphone from "../../assets/images/iphone-16-pro.webp";
import useData from "../../hooks/useData";

const ProductList = () => {
  const { data: products, errorMsg } = useData("/products");

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
        <div className="flex justify-evenly flex-wrap gap-10">
          {products &&
            products.map((product) => (
              <ProductCard
                name={product.title}
                imageAlt={`${product.title} image`}
                numRating={product.reviews.counts}
                rating={product.reviews.rate.toFixed(1)}
                price={product.price}
                image={product.images[0] || iphone}
                link={`/products/${product._id}`}
                key={product._id}
                stock={product.stock}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
