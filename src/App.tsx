import { useState } from "react";
import NavBar from "./components/NavBar";
import LoginModal from "./Authentication/LoginModal";
import SignupModal from "./Authentication/SignupModal";
import Routing from "./components/Routing/Routing";
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import setAuthToken from "./utils/setAuthToken";
import { getJwt } from "./components/services/userServices";

setAuthToken(getJwt());

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app grid grid-rows-[100px_auto] max-md:grid-rows-[auto_auto]">
          <NavBar
            onOpenLoginModal={() => setOpenLoginModal(true)}
            onOpenSignupModal={() => setOpenSignupModal(true)}
          />

          <main>
            <Routing />
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
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
