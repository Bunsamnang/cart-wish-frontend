import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";
import useAuth2 from "../useAuth2";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth2();

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
