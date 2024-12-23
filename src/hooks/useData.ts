import { useEffect, useMemo, useState } from "react";
import api_client from "../utils/api_client";

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

const useData = <T>(endpoint: string, customConfig: CustomConfig = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the stringified version of customConfig to ensure that the dependency
  // array remains stable. Without this, JSON.stringify(customConfig) would create
  // a new string on every render, causing the useEffect to re-run unnecessarily
  // even if customConfig hasn't changed. This helps avoid performance issues
  // caused by redundant re-fetching.
  const configString = useMemo(
    () => JSON.stringify(customConfig),
    [customConfig]
  );

  useEffect(() => {
    async function fetchingData() {
      setIsLoading(true);
      try {
        const res = await api_client.get(endpoint, customConfig);
        const rawData: T = res.data;

        setData(rawData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("An unknown error occurred.");
        }
        console.error(error);
      }
    }

    fetchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, configString]);

  return { data, errorMsg, isLoading };
};

export default useData;
