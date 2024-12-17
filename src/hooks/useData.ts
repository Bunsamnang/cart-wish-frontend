import { useEffect, useState } from "react";
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
  _id: string;
}

const useData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      setIsLoading(true);
      try {
        const res = await api_client.get(url);
        const rawData: T = res.data;
        console.log(rawData);

        setData(rawData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("An unknown error occurred.");
        }
        console.error(error);
      }
    }

    fetchingData();
  }, [url]);

  return { data, errorMsg, isLoading };
};

export default useData;
