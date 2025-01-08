import { createContext, ReactNode, useEffect, useState } from "react";
import { Cart } from "../Cart/Cart";
import useData, { Product } from "../hooks/useData";
import { addToCartApi } from "../components/services/cartServices";
import { toast } from "react-toastify";

interface CartContextType {
  cart: Cart[];
  setCart: (item: Cart[]) => void;
  addToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const { data } = useData<Cart[]>("/cart");

  useEffect(() => {
    if (data) {
      setCart(data);
    }
  }, [data]);

  const addToCart = async (product: Product, quantity: number) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      // Check if product already exists in cart, then update quantity
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);

    try {
      const res = await addToCartApi(product._id, quantity);
      toast.success("Product Added Successfully");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
      setCart(cart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
