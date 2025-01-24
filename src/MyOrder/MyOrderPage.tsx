import { LoaderCircle } from "lucide-react";
import { Order } from "../Cart/Order";
import useData from "../hooks/useData";
import useAuth2 from "../hooks/useAuth2";

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
  const { user } = useAuth2();
  const {
    data: orders,
    isLoading,
    errorMsg,
  } = useData<MyOrderAPI[]>("/order", 1 * 60 * 1000);

  return (
    <>
      {user ? (
        <section
          className="my_order flex justify-center md:p-2 mt-20"
          data-aos="slide-right"
        >
          {errorMsg ? (
            <p className="text-red-500 italic">{errorMsg}</p>
          ) : (
            <>
              {isLoading ? (
                <LoaderCircle className="animate-spin text-slate-800 w-10 h-10" />
              ) : (
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
                    {orders?.map((order, index) => (
                      <tr key={order._id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td colSpan={2}>
                          {order.products.map(
                            ({ product, quantity }, index) => (
                              <span key={product._id}>
                                {product.title} ({quantity})
                                {index === order.products.length - 1
                                  ? ""
                                  : ", "}
                              </span>
                            )
                          )}
                        </td>
                        <td>${order.total}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </section>
      ) : (
        <p
          className="text-red-500 text-center text-xl mt-3"
          data-aos="slide-right"
        >
          Token expired, please log in again
        </p>
      )}
    </>
  );
};

export default MyOrderPage;
