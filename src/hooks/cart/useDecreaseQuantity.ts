import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decreaseQuantity } from "../../services/cartServices";
import { toast } from "react-toastify";
import useAuth2 from "../useAuth2";

const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth2();

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
