import { createContext, ReactNode, useEffect, useState } from "react";
import { Cart } from "../Cart/Cart";
import { Product } from "../hooks/useData";
import { addToCartApi } from "../components/services/cartServices";

interface CartContextType {
  cart: Cart[];
  setCart: (item: Cart[]) => void;
  addToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setCart(cart);
    }
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
