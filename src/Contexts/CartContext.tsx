import { createContext, ReactNode } from "react";
import { Cart } from "../Cart/Cart";
import { Product } from "../hooks/useData";
import { getUserCartAPI } from "../components/services/cartServices";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAddToCart from "../hooks/cart/useAddToCart";

interface CartContextType {
  cart: Cart[];
  addToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // const { data } = useData<Cart[]>("/cart");

  const { data: cart } = useQuery<Cart[], Error>({
    queryKey: ["cart", user?._id],
    queryFn: async () => {
      if (!user) {
        return;
      }
      const res = await getUserCartAPI();
      return res.data;
    },
    enabled: !!user,
  });

  const addToCartMutation = useAddToCart();

  const addToCart = async (product: Product, quantity: number) => {
    addToCartMutation.mutate({ id: product._id, quantity: quantity });
  };

  return (
    <CartContext.Provider value={{ cart: cart || [], addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
