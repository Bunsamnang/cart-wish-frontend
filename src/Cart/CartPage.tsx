import Table from "../common/Table";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <>
      {user ? (
        <section
          className="cart-page flex flex-col items-center mt-20"
          data-aos="slide-right"
        >
          <div className="user_details flex items-center gap-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/profile/${
                user.profilePic
              }`}
              alt="profile picture"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>

          <Table
            headings={["Item", "Price", "Quantity", "Total", "Remove"]}
            cart={cart}
          />
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

export default CartPage;
