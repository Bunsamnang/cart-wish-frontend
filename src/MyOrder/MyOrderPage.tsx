import { Order } from "../Cart/Order";
import { useAuth } from "../hooks/useAuth";

interface MyOrderPageProps {
  headings: string[];
  orders: Order[];
}

const MyOrderPage = ({ headings, orders }: MyOrderPageProps) => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <section className="my_order flex justify-center">
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
        </section>
      ) : (
        <p className="text-red-500 text-center text-xl mt-3">
          Token expired, please log in again
        </p>
      )}
    </>
  );
};

export default MyOrderPage;
