import { createContext, ReactNode, useEffect, useState } from "react";
import { Cart } from "../Cart/Cart";
import { Product } from "../hooks/useData";

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

  const addToCart = (product: Product, quantity: number) => {
    // Check if product already exists in cart, then update quantity
    setCart((prevCart) => {
      const updatedCart = prevCart.some(
        (item) => item.product.name === product.name
      )
        ? prevCart.map((item) =>
            item.product.name === product.name
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevCart, { product, quantity }];

      return updatedCart;
    });
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
