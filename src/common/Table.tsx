import { Trash2 } from "lucide-react";
import { Cart } from "../Cart/Cart";
import { useCart } from "../hooks/useCart";
import QuantityInput from "../components/SingleProduct/QuantityInput";
import { removeItem } from "../components/services/cartServices";
import { Product } from "../hooks/useData";
import { useEffect } from "react";

interface TableProps {
  cart: Cart[];
  headings: string[];
}
const Table = ({ cart, headings }: TableProps) => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {}, [cart]);

  const { setCart } = useCart();

  const handleQuantityChange = (cartItem: Product, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.product._id === cartItem._id ? { ...item, quantity: quantity } : item
    );

    setCart(updatedCart);
  };

  const handleRemoveProduct = async (cartItem: Product, cartIndex: number) => {
    const updatedCart = cart.filter((_, index) => index !== cartIndex);

    setCart(updatedCart);

    try {
      const res = await removeItem(cartItem._id);

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
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
                      quantity={quantity}
                      productId={product._id}
                      stock={product.stock}
                      setQuantity={(newQuantity) => {
                        handleQuantityChange(product, newQuantity);
                      }}
                    />
                  </td>
                  <td className="px-3 py-2 w-1/5">
                    ${product.price * quantity}
                  </td>
                  <td className="px-3 py-2 inline-flex justify-center cursor-pointer ">
                    <Trash2
                      className="text-red-500 ml-3  hover:filter hover:drop-shadow-[0_4px_10px_rgba(255,0,0,0.7)] duration-300 ease-in transition-all"
                      onClick={() => handleRemoveProduct(product, index)}
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
                    ${totalAmount}
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
                    ${totalAmount + 5}
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-800 transition-colors duration-300 ease-in">
              Check out
            </button>
          </div>
        </>
      ) : (
        <p className="text-red-500 mt-5">No items added yet.</p>
      )}
    </>
  );
};

export default Table;
