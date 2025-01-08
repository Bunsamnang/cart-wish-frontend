import ProductCard from "./ProductCard";
import useData from "../../hooks/useData";
import { Product } from "./../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../common/PaginationList";

interface ProductsResponse {
  products: Product[];
  totalProducts: number;
}
const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category") || "";
  const page = parseInt(search.get("page") || "1");
  const searchQuery = search.get("search") || "";

  const { data, errorMsg, isLoading } = useData<ProductsResponse>("/products", {
    params: {
      category,
      page,
      search: searchQuery,
    },
  });
  console.log(data);
  // create number of skeletons based on num of response
  const skeletons = Array.from({ length: data?.products.length || 8 });

  const handlePageChange = (pageNum: number) => {
    setSearch((prev) => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set("page", pageNum.toString());
      return newSearchParams;
    });
  };

  return (
    <section className="bg-[#f6f8fa] p-2" data-aos="fade-left">
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
        <>
          <div className="grid gap-5  max-md:place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* checks if data is not null or undefined */}

            {isLoading
              ? skeletons.map((_, index) => <ProductCardSkeleton key={index} />)
              : data?.products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
          </div>
          <div className="flex items-center justify-center">
            <Pagination
              totalPost={data?.totalProducts || 0}
              currentPage={page}
              postPerPage={8}
              onClick={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
