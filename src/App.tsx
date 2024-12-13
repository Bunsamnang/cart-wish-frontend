import { useState } from "react";
import NavBar from "./components/NavBar";
import LoginModal from "./Form/LoginModal";
import SignupModal from "./Form/SignupModal";
import Routing from "./components/Routing/Routing";
import { useTotal } from "./hooks/useTotal";

const App = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const { total } = useTotal();
  console.log(total);

  return (
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
  );
};

export default App;
