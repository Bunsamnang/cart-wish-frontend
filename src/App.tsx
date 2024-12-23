import { useState } from "react";
import NavBar from "./components/NavBar";
import LoginModal from "./Form/LoginModal";
import SignupModal from "./Form/SignupModal";
import Routing from "./components/Routing/Routing";
import { TotalProvider } from "./Contexts/TotalContext";
import { AuthProvider } from "./Contexts/AuthContext";

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  return (
    <div className="app grid grid-rows-[100px_auto] max-md:grid-rows-[auto_auto]">
      <AuthProvider>
        <NavBar
          onOpenLoginModal={() => setOpenLoginModal(true)}
          onOpenSignupModal={() => setOpenSignupModal(true)}
        />
        <main>
          <TotalProvider>
            <Routing />
          </TotalProvider>
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
      </AuthProvider>
    </div>
  );
};

export default App;
