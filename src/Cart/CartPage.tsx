import Table from "../common/Table";
import useAuth2 from "../hooks/useAuth2";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { user } = useAuth2();
  const { cart } = useCart();
  console.log(user);

  return (
    <>
      {user ? (
        <section
          className="cart-page flex flex-col items-center mt-20 max-sm:mt-10 "
          data-aos="slide-right"
        >
          <div className="user_details flex items-center gap-4 max-sm:flex-col max-sm:justify-center">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/profile/${
                user.profilePic
              }`}
              alt="profile picture"
              className="w-16 h-16 rounded-full max-sm:w-32 max-sm:h-32"
            />
            <div className="max-sm:text-center">
              <p className="whitespace-nowrap">Name: {user.name}</p>
              <p className="whitespace-nowrap">Email: {user.email}</p>
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
