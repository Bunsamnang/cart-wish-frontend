import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { increaseQuantity } from "../../services/cartServices";
import { toast } from "react-toastify";

const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await increaseQuantity(productId);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id],
      });
    },

    onError: () => {
      toast.error("Failed to increase quantity");
    },
  });
};

export default useIncreaseQuantity;
