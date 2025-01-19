import { useInfiniteQuery } from "@tanstack/react-query";
import { Product } from "./useData";
import api_client from "../utils/api_client";

interface ProductsResponse {
  products: Product[];
  totalProducts: number;
}
const useProductList = (category: string, searchQuery: string) => {
  return useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ["products", category, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api_client.get("/products", {
        params: {
          category,
          search: searchQuery,
          perPage: 10,
          page: pageParam,
        },
      });
      return data;
    },
    // this function returned value will be passed to queryFn
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.products.length > 0 ? allPages.length + 1 : null;
    },
    initialPageParam: 1,
  });
};

export default useProductList;
