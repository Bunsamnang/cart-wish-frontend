import api_client from "../utils/api_client";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  images: string[];
  image: string;
  name: string;
  price: number;
  stock: number;
  reviews: {
    rate: number;
    counts: number;
  };
  title: string;
  description: string;
  _id: string;
}

interface CustomConfig {
  params?: Record<string, string | number | boolean>; // type for params (key-value pair)
}

const useData = <T>(
  endpoint: string,
  customConfig: CustomConfig = {},
  staleTime: number = 300_000
) => {
  const fetchData = async () => {
    const res = await api_client.get(endpoint, customConfig);
    return res.data;
  };

  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey: [endpoint, customConfig],
    queryFn: fetchData,
    staleTime: staleTime,
  });

  const errorMsg = error?.message || "";

  return { data, errorMsg, isLoading };
};

export default useData;
