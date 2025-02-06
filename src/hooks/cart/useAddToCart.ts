import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartApi } from "../../services/cartServices";
import { toast } from "react-toastify";
import useAuth2 from "../useAuth2";

const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth2();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const res = await addToCartApi(id, quantity);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id],
      });
    },

    onError: () => {
      toast.error("Failed to add product to cart");
    },
  });
};

export default useAddToCart;
