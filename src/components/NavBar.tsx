import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "../common/Link";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

interface NavBarProps {
  onOpenLoginModal: () => void;
  onOpenSignupModal: () => void;
}

const NavBar = ({ onOpenLoginModal, onOpenSignupModal }: NavBarProps) => {
  // if user is logged in
  const { user, setUser } = useAuth();

  const { cart } = useCart();

  const [isExpanded, setIsExpanded] = useState(false);

  console.log(isExpanded);
  // Handle resetting isExpanded when the screen width is >= 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isExpanded) {
        setIsExpanded(false);
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <nav
      className={`w-full flex justify-between items-center flex-wrap p-4 sticky t-0 left-0 r-0 z-1 bg-black text-white
       ${isExpanded ? "h-fit" : ""} 
      `}
    >
      <NavLink
        to={"/"}
        className="text-2xl font-semibold transition-all duration-300 "
      >
        Cart Wish
      </NavLink>

      <AlignJustify
        size={35}
        className={`lg:hidden opacity-50 p-1 cursor-pointer transition-all duration-300 ease-in ${
          isExpanded
            ? "opacity-100 shadow-[0_0_0_3px_rgb(157,157,157)] rounded-sm"
            : ""
        } `}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <ul
        className={`w-full max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease lg:w-auto lg:flex lg:max-h-screen lg:opacity-100 text-gray-400 
          ${isExpanded ? "max-h-screen opacity-100" : ""}
            
        `}
      >
        <li className="py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
          <Link link="/" title="Home" />
        </li>
        <li className="py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
          <Link link="/products" title="Products" />
        </li>

        {user ? (
          <>
            <li className="py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
              <Link link="/myorder" title="MyOrder" />
            </li>
            <li
              className={`py-2 px-4 mr-4  hover:text-white transition-colors duration-300 ease-in-out ${
                isExpanded ? "mb-4" : ""
              }`}
            >
              <Link link="/cart" title={`Cart(${cart.length})`} />
            </li>
            <button
              className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out
                ${isExpanded ? "ml-4" : ""}
                `}
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              className={`inline-block mr-4 px-4 py-2 bg-black text-white rounded-md border border-white transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black
            ${isExpanded ? "ml-4" : ""}
          `}
              onClick={onOpenLoginModal}
            >
              Log in
            </button>
            <button
              className="inline-block mr-1 px-4 py-2 bg-white text-black rounded-md border border-black transition duration-300 ease-in-out hover:bg-black hover:text-white hover:border-white"
              onClick={onOpenSignupModal}
            >
              Sign up
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
