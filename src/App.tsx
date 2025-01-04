import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import LoginModal from "./Authentication/LoginModal";
import SignupModal from "./Authentication/SignupModal";
import Routing from "./components/Routing/Routing";
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import setAuthToken from "./utils/setAuthToken";
import { getJwt } from "./components/services/userServices";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ArrowUpFromLine } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

setAuthToken(getJwt());

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });

    const toggleVisibility = () => {
      if (window.scrollY >= 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app grid grid-rows-[100px_auto] max-md:grid-rows-[auto_auto]">
          <NavBar
            onOpenLoginModal={() => setOpenLoginModal(true)}
            onOpenSignupModal={() => setOpenSignupModal(true)}
          />

          <main>
            <ToastContainer position="bottom-right" />
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

          <button
            onClick={scrollToTop}
            className={`fixed rounded-full bottom-4 right-4 p-3 bg-slate-800 text-white shadow-lg transition-opacity duration-300 ease-in
              ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            aria-label="Scroll to top"
          >
            <ArrowUpFromLine size={25} />
          </button>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
