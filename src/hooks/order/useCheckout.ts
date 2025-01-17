import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutAPI } from "../../components/services/orderServices";
import { toast } from "react-toastify";
import { useAuth } from "../useAuth";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const res = await checkOutAPI();
      return res.data;
    },

    onSuccess: () => {
      toast.success("Order placed successfully");
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id],
      });
    },

    onError: () => {
      toast.error("Failed to place order");
    },
  });
};

export default useCheckout;
