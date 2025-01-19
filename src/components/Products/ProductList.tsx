import ProductCard from "./ProductCard";
import { Product } from "./../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductList from "../../hooks/useProductList";

const ProductList = () => {
  const [search] = useSearchParams();
  const category = search.get("category") || "";
  const searchQuery = search.get("search") || "";

  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const { data, isLoading, error, hasNextPage, fetchNextPage } = useProductList(
    category,
    searchQuery
  );
  console.log(data?.pages);
  // create number of skeletons based on num of response
  const skeletons = Array.from({ length: 8 });

  const errorMsg = error?.message || "";
  // const handlePageChange = (pageNum: number) => {
  //   setSearch((prev) => {
  //     const newSearchParams = new URLSearchParams(prev);
  //     newSearchParams.set("page", pageNum.toString());
  //     return newSearchParams;
  //   });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (data && data.pages) {
      //flatmap: combining the values of the array (products) into one single array
      const products = data.pages.flatMap((page) => page.products);

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [data, sortBy]);

  return (
    <section className="bg-[#f6f8fa] p-2" data-aos="fade-left">
      <header className="flex items-center justify-between gap-x-2 mb-5">
        <h1 className="text-2xl font-semibold">Products</h1>
        <select
          name="sort"
          id=""
          className="outline-none rounded-md text-sm border-none shadow"
          onChange={(e) => setSortBy(e.target.value)}
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
        <>
          <div className="grid gap-5  max-md:place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* checks if data is not null or undefined */}

            {isLoading
              ? skeletons.map((_, index) => <ProductCardSkeleton key={index} />)
              : sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
