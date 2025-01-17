import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { decreaseQuantity } from "../../components/services/cartServices";
import { toast } from "react-toastify";

const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await decreaseQuantity(productId);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id],
      });
    },

    onError: () => {
      toast.error("Failed to decrease quantity");
    },
  });
};

export default useDecreaseQuantity;
