import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItem } from "../../components/services/cartServices";
import { toast } from "react-toastify";
import { useAuth } from "../useAuth";

const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await removeItem(id);
      return res.data;
    },

    onSuccess: () => {
      toast.info("Product removed successfully from cart");
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id],
      });
    },

    onError: () => {
      toast.error("Failed to remove product from cart");
    },
  });
};

export default useDeleteFromCart;
