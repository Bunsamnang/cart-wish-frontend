import { createContext, ReactNode } from "react";
import { Cart } from "../Cart/Cart";
import { Product } from "../hooks/useData";
import { getUserCartAPI } from "../components/services/cartServices";
import { useQuery } from "@tanstack/react-query";
import useAddToCart from "../hooks/cart/useAddToCart";
import useAuth2 from "../hooks/useAuth2";

interface CartContextType {
  cart: Cart[];
  addToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth2();
  // const { data } = useData<Cart[]>("/cart");

  const { data: cart } = useQuery<Cart[], Error>({
    queryKey: ["cart", user?._id],
    queryFn: async () => {
      const res = await getUserCartAPI();
      return res.data;
    },
    enabled: !!user,
    staleTime: 300_000,
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
