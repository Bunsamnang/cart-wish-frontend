import Table from "../common/Table";
import { useAuth } from "../hooks/useAuth";

const CartPage = () => {
  const { user } = useAuth();

  return (
    <section className="cart-page flex flex-col items-center mt-5">
      <div className="user_details flex items-center gap-4">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="profile picture"
          className="w-16 h-16 rounded-full"
        />
        <div>
          {user ? (
            <>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </>
          ) : (
            <>
              <p>Name: Code Bless you</p>
              <p>Email: code1@gmail.com</p>
            </>
          )}
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
