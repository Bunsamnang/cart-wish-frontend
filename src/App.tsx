import { useState } from "react";
import CartPage from "./Cart/CartPage";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/NavBar";
import ProductPage from "./components/Products/ProductPage";
import SingleProductPage from "./components/SingleProduct/SingleProductPage";
import MyOrderPage from "./MyOrder/MyOrderPage";
import LoginModal from "./Form/LoginModal";
import SignupModal from "./Form/SignupModal";

const App = () => {
  const [total, setTotal] = useState(0);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  return (
    <div className="app grid grid-rows-[100px_auto] max-md:grid-rows-[auto_auto]">
      <NavBar
        onOpenLoginModal={() => setOpenLoginModal(true)}
        onOpenSignupModal={() => setOpenSignupModal(true)}
      />
      <main>
        <HomePage />
        {/* <ProductPage /> */}
        {/* <SingleProductPage /> */}
        {/* <CartPage onSetTotal={(total) => setTotal(total)} /> */}
        {/* <MyOrderPage total={total} /> */}
      </main>

      {openLoginModal && (
        <LoginModal
          openModal={openLoginModal}
          onCloseModal={() => setOpenLoginModal(false)}
        />
      )}

      {openSignupModal && (
        <SignupModal
          openModal={openSignupModal}
          onCloseModal={() => setOpenSignupModal(false)}
        />
      )}
    </div>
  );
};

export default App;
