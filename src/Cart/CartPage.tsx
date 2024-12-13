import { User } from "lucide-react";
import Table from "../common/Table";

const CartPage = () => {
  return (
    <section className="cart-page flex flex-col items-center mt-5">
      <div className="user_details flex items-center gap-4">
        <User className="bg-slate-300 p-2 rounded-full" size={60} />
        <div>
          <p>Name: Code Bless you</p>
          <p>Email: code1@gmail.com</p>
        </div>
      </div>

      <Table
        headings={["Item", "Price", "Quantity", "Total", "Remove"]}
        carts={[
          {
            item: "iPhone 16",
            price: 999,
            quantity: 1,
          },

          {
            item: "Airpods",
            price: 129,

            quantity: 2,
          },
          {
            item: "Headphones",
            price: 40,
            quantity: 1,
          },
        ]}
      />
    </section>
  );
};

export default CartPage;
