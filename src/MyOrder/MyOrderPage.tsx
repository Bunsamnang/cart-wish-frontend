import { useEffect, useState } from "react";
import { Order } from "../Cart/Order";
import { getOrderAPI } from "../components/services/orderServices";
import { useAuth } from "../hooks/useAuth";

interface MyOrderPageProps {
  headings: string[];
  orders: Order[];
}

interface MyOrderProduct {
  product: {
    _id: string;
    title: string;
    price: number;
  };
  quantity: number;
}

interface MyOrderAPI {
  _id: string;
  products: MyOrderProduct[];
  total: number;
  status: string;
}

const MyOrderPage = ({ headings }: MyOrderPageProps) => {
  const { user } = useAuth();
  const [order, setOrder] = useState<MyOrderAPI[]>([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await getOrderAPI();
        console.log(res.data);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrder();
  }, []);

  return (
    <>
      {user ? (
        <section className="my_order flex justify-center md:p-2">
          <table className="w-3/4 max-lg:w-full mt-10 rounded text-center overflow-hidden shadow-lg">
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
              {order.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td colSpan={2}>
                    {item.products.map(({ product }, index) => (
                      <span key={product._id}>
                        {product.title}{" "}
                        {index === item.products.length - 1 ? "" : ", "}
                      </span>
                    ))}
                  </td>
                  <td>{item.total}</td>
                  <td>{item.status}</td>
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
