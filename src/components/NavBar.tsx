import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import setAuthToken from "../utils/setAuthToken";
import { useOpen } from "../hooks/useOpen";
import { getSuggestionsAPI } from "./services/productServices";
import Navlink from "../common/Navlink";
interface NavBarProps {
  onOpenSignupModal: () => void;
}

interface Suggestions {
  title: string;
  _id: string;
}

const NavBar = ({ onOpenSignupModal }: NavBarProps) => {
  // if user is logged in
  const { user, setUser } = useAuth();

  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const { openLoginModal, setOpenLoginModal } = useOpen();

  useEffect(() => {
    async function getSuggestions() {
      if (search.trim() !== "") {
        try {
          const res = await getSuggestionsAPI(search);
          setSuggestions(res.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSuggestions([]);
      }
    }

    getSuggestions();
  }, [search]);

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
    setCart([]);
    localStorage.removeItem("token");
    setAuthToken("");

    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim() !== "") navigate(`/products?search=${search}`);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (selectedItem === 9) {
        setSelectedItem(9);
      } else {
        setSelectedItem((current) => current + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (selectedItem === 0) {
        setSelectedItem(0);
      } else {
        setSelectedItem((current) => current - 1);
      }
    } else if (e.key === "Enter" && selectedItem >= 0) {
      const suggestion = suggestions[selectedItem];
      navigate(`/products?search=${suggestion.title}`);

      // Reset search and suggestions to default to prevent handlesubmit
      // from overriding
      setSearch("");
      setSuggestions([]);
    }
  };

  return (
    <nav
      className={`w-full fixed flex justify-between items-center flex-wrap p-4 h-24 t-0 left-0  z-10 bg-black text-white 
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
        className={` w-full max-h-0 opacity-0  transition-all duration-300 ease lg:w-auto lg:flex lg:flex-1 lg:justify-between lg:max-h-screen lg:opacity-100 text-gray-400 
          ${isExpanded ? "max-h-screen opacity-100" : ""}
            
        `}
      >
        <form
          className="w-full max-w-xs relative border-none outline-none rounded-sm max-lg:my-4 lg:ml-2 focus:outline-none active:outline-none"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full text-black border-none outline-none focus:outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full bg-violet-500 text-white px-4  rounded-sm hover:bg-violet-600 transition duration-300 ease-in-out"
          >
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute m-0 w-full top-full left-0 bg-slate-50 z-50 mt-1 border rounded-sm border-slate-200">
              {suggestions.map((suggestion, index) => (
                <li
                  className={`text-black flex p-2 cursor-pointer hover:bg-slate-200 
                    ${selectedItem === index ? "bg-slate-200 " : ""}
                    `}
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    className="w-full"
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
        <div className="flex max-lg:flex-col max-lg:gap-2">
          <li className="lg:py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
            <Navlink link="/" title="Home" />
          </li>
          <li className="lg:py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
            <Navlink link="/products" title="Products" />
          </li>

          {user ? (
            <>
              <li className="lg:py-2 px-4 hover:text-white transition-colors duration-300 ease-in-out">
                <Navlink link="/myorder" title="MyOrder" />
              </li>
              <li
                className="lg:py-2 px-4 mr-4  hover:text-white transition-colors duration-300 ease-in-out ${
                 
                "
              >
                <Navlink link="/cart" title={`Cart(${cart.length})`} />
              </li>
              <button
                className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out self-start
                max-lg:ml-4
                `}
                onClick={() => handleLogout()}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className={`inline-block mr-4 px-4 py-2 bg-black text-white rounded-md border border-white transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black self-start
                   max-lg:ml-4
          `}
                onClick={() => setOpenLoginModal(!openLoginModal)}
              >
                Log in
              </button>
              <button
                className={`inline-block mr-1 px-4 py-2 bg-white text-black rounded-md border border-black transition duration-300 ease-in-out hover:bg-black hover:text-white hover:border-white self-start
                     max-lg:ml-4
                  `}
                onClick={onOpenSignupModal}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
