import ProductCard from "./ProductCard";
import iphone from "../../assets/images/iphone-16-pro.webp";
import { useEffect, useState } from "react";
import api_client from "../../utils/api_client";

interface Product {
  _id: string;
  title: string;
  price: number;
  reviews: {
    rate: number;
    counts: number;
  };
  images: string[];
  stock: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchingProducts() {
      try {
        const res = await api_client.get("/products");

        const data = await res.data;
        console.log("Whole data: ", data);

        setProducts(data.products);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        }
        // setErrorMsg("Failed to fetch products. Please try again later.");
        console.error(error);
      }
    }

    fetchingProducts();
  }, []);

  console.log("Actual products list: ", products);

  return (
    <section className="bg-[#f6f8fa] p-2">
      <header className="flex items-center justify-between gap-x-2 mb-5">
        <h1>Products</h1>
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
          {products.map((product) => (
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
