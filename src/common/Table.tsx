import { Trash2 } from "lucide-react";
import { Cart } from "../Cart/Cart";
import { Order } from "../Cart/Order";

interface TableProps {
  carts?: Cart[];
  headings: string[];
  orders?: Order[];
  onSetTotal?: (total: number) => void;
}
const Table = ({ carts, orders, headings, onSetTotal }: TableProps) => {
  const totalAmount = carts
    ? carts.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  if (onSetTotal) {
    onSetTotal(totalAmount + 5);
  }

  return (
    <>
      {carts ? (
        <>
          <table className="w-2/3 mt-10 rounded text-center overflow-hidden shadow-lg">
            <thead className="text-white ">
              <tr className=" bg-slate-800 ">
                {headings.map((heading, index) => (
                  <th className="px-3 py-2" key={index}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {carts.map((cart, index) => (
                <tr
                  className={`${(index + 1) % 2 === 0 ? "bg-gray-300" : ""}`}
                  key={index}
                >
                  <td className="px-3 py-2">{cart.item}</td>
                  <td className="px-3 py-2">${cart.price}</td>
                  <td className="flex justify-center items-center px-3 py-2">
                    <button className="bg-red-600 w-8 h-8 text-white text-2xl rounded-full hover:bg-red-700">
                      -
                    </button>
                    <p className="mx-8">{cart.quantity}</p>
                    <button className="bg-green-600 w-8 h-8 text-white text-2xl rounded-full hover:bg-green-700 ">
                      +
                    </button>
                  </td>
                  <td className="px-3 py-2">${cart.price * cart.quantity}</td>
                  <td className="px-3 py-2 inline-flex justify-center items-center cursor-pointer">
                    <Trash2 className="text-red-500 hover:filter hover:drop-shadow-[0_4px_10px_rgba(255,0,0,0.7)] duration-300 ease-in transition-all" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-2/3 flex  flex-col items-end gap-4 mt-10">
            <table className="rounded text-center overflow-hidden shadow-lg border border-slate-400">
              <tbody>
                <tr>
                  <td className="px-3 py-2 text-left border border-slate-400">
                    Subtotal
                  </td>
                  <td className="px-3 py-2 border border-slate-400 text-right">
                    ${totalAmount}
                  </td>
                </tr>

                <tr>
                  <td className="px-3 py-2 text-left border border-slate-400">
                    Shipping Charge
                  </td>
                  <td className="px-3 py-2 border border-slate-400 text-right">
                    $5
                  </td>
                </tr>

                <tr>
                  <th className="font-bold text-xl px-3 py-2 text-left border border-slate-400">
                    Total
                  </th>
                  <td className="font-bold px-3 py-2 border border-slate-400 text-right ">
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
        <table className="w-1/2 mt-10 rounded text-center overflow-hidden shadow-lg">
          <thead className="text-white ">
            <tr className=" bg-slate-800 ">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="px-3 py-2 "
                  colSpan={index === 1 ? 2 : 1}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders?.map((order, index) => (
              <tr className="shadow-lg" key={index}>
                <td className="px-3 py-2">{index + 1}</td>
                <td className="px-3 py-2" colSpan={2}>
                  {order.products?.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index === order.products.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </td>

                <td className="px-3 py-2">${order.total}</td>
                <td className="px-3 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
