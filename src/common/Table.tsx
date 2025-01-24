import { ShoppingCart, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Cart } from "../Cart/Cart";
import QuantityInput from "../components/SingleProduct/QuantityInput";
import useCheckout from "../hooks/order/useCheckout";
import { Product } from "../hooks/useData";
import useRemoveFromCart from "../hooks/cart/useRemoveFromCart";

interface TableProps {
  cart: Cart[];
  headings: string[];
}
const Table = ({ cart, headings }: TableProps) => {
  const subTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const removeFromCartMutation = useRemoveFromCart();
  const checkoutMutation = useCheckout();

  const handleRemoveProduct = (cartItem: Product) => {
    removeFromCartMutation.mutate(cartItem._id);
  };

  const handleCheckout = () => {
    checkoutMutation.mutate();
  };

  console.log(cart);

  return (
    <>
      {cart.length >= 1 ? (
        <>
          <table className="w-2/3 mt-10 rounded text-center overflow-hidden shadow-lg">
            <thead className="text-white ">
              <tr className=" bg-slate-800 ">
                {headings.map((heading, index) => (
                  <th className="px-3 py-2 w-1/5" key={index}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {cart.map(({ product, quantity }, index) => (
                <tr
                  className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""}`}
                  key={index}
                >
                  <td className="px-3 py-2 whitespace-nowrap w-1/5">
                    {product.title}
                  </td>
                  <td className="px-3 py-2 w-1/5">${product.price}</td>
                  <td className=" px-3 py-2 w-1/5">
                    <QuantityInput
                      isCartPage
                      quantity={quantity}
                      productId={product._id}
                      stock={product.stock}
                    />
                  </td>
                  <td className="px-3 py-2 w-1/5">
                    ${product.price * quantity}
                  </td>
                  <td className="px-3 py-2 inline-flex justify-center cursor-pointer ">
                    <Trash2
                      className="text-red-500 ml-3  hover:filter hover:drop-shadow-[0_4px_10px_rgba(255,0,0,0.7)] duration-300 ease-in transition-all"
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-2/3 flex  flex-col items-end gap-4 mt-10">
            <table className="rounded text-center overflow-hidden shadow-lg border border-slate-400">
              <tbody>
                <tr>
                  <td className="w-40 h-10 text-left border border-slate-400">
                    Subtotal
                  </td>
                  <td className="w-40 h-10 border border-slate-400 text-right">
                    {subTotal}
                  </td>
                </tr>

                <tr>
                  <td className="w-40 h-10 text-left border border-slate-400">
                    Shipping Charge
                  </td>
                  <td className="w-40 h-10 border border-slate-400 text-right">
                    $5
                  </td>
                </tr>

                <tr>
                  <th className="font-bold text-xl w-40 h-10 text-left border border-slate-400">
                    Total
                  </th>
                  <td className="font-bold w-40 h-10 border border-slate-400 text-right ">
                    ${subTotal + 5}
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-800 transition-colors duration-300 ease-in"
              onClick={handleCheckout}
            >
              Check out
            </button>
          </div>
        </>
      ) : (
        <div className="flex mt-5 items-center gap-2 justify-center max-sm:flex-col">
          <div className="flex items-center">
            <ShoppingCart size={30} className="text-violet-500 mr-2" />
            <p className="max-sm:text-sm">
              Your cart is empty. Start adding items.
            </p>
          </div>
          <NavLink
            to={"/products"}
            className={
              "text-blue-500 hover:underline hover:text-blue-800 duration-300 transition-colors ease-in"
            }
          >
            Browse products.
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Table;
