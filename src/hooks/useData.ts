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

const useData = (
  url: string,
  dataExtractor: (response: unknown) => Product[] = (response: unknown) => {
    // Default extractor assumes `response` is an object with `products`
    if (
      typeof response === "object" &&
      response !== null &&
      "products" in response
    ) {
      return (response as { products: Product[] }).products;
    }
    throw new Error("Invalid response structure");
  }
) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await api_client.get(url);
        const rawData = res.data;

        const extractedData = dataExtractor(rawData);
        setData(extractedData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("An unknown error occurred.");
        }
        console.error(error);
      }
    }

    fetchingData();
  }, [url, dataExtractor]);

  return { data, errorMsg };
};

export default useData;
