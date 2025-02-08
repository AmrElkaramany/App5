import React, { useContext, useState } from "react";
import Style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/finalProject assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContextProvider";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let Navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(cart);
  
  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    Navigate("/login");
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0 z-20">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink
                      to=""
                      className="block font-normal text-gray-800 hover:text-black py-2 px-3 rounded md:p-0"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="cart"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="wishList"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      WishList
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
              {userLogin === null ? (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="register"
                      className="block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <span
                    to="logout"
                    className="cursor-pointer block font-normal text-gray-600 hover:text-black py-2 px-3 rounded md:p-0"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </li>
              )}

              <ul className="font-medium gap-4 flex p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
                <li>
                  <Link>
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fab fa-youtube"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="fab fa-tiktok"></i>
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
