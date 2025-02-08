import React, { createContext, useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [totalNumber, setTotalNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { GetLoggedUserCart, updateProductToCart , deleteCartItem ,clearUserCart } = useContext(CartContext);

  async function getCartItems() {
   
    let response = await GetLoggedUserCart();
 
    console.log(response?.data?.data);
    setCartDetails(response?.data?.data);
    setTotalNumber(response?.data);
  }

  async function updateCartCount(productId , count) {
    let response = await updateProductToCart(productId , count);

    console.log(response.data.data);
    setCartDetails(response.data.data);
  }

  async function deleteItem(productId) {
    let response = await deleteCartItem(productId);

    console.log(response.data.data);
    setCartDetails(response.data.data);

  }

  async function clearCartItems() {
    setIsLoading(true)
    let response = await clearUserCart();
  
    if (response?.data?.message === "success") {
      setIsLoading(false)
      // قم بتعيين السلة كفارغة والقيم كـ 0
      setCartDetails({
        products: [], // السلة أصبحت فارغة
        totalCartPrice: 0, // إجمالي السعر = 0
      });
  
      setTotalNumber({
        numOfCartItems: 0, // عدد العناصر = 0
      });
  
      console.log("Cart cleared successfully!");
    } else {
      setIsLoading(false)
      console.error("Failed to clear the cart");
    }

  }
  


  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="row mx-auto cartRow bg-[#F8F9FA]  ">
        <div className="w-1/2 ">
          <h1 className="text-3xl sm:text-4xl  my-5 font-[600] text-[#212529]">
            Cart Shop
          </h1>
          <h3 className="text-xl sm:text-2xl text-[#212529]">
            total price:
            <span className="text-[#22DB14]">
              {cartDetails?.totalCartPrice} EGP
            </span>
          </h3>
        </div>

        <div className="w-1/2  mb-4  text-end ">
        <Link to='/checkout'>
        <button className="px-4 py-2 my-5 bg-[#0D6EFD] text-white rounded-lg text-xl">
            check Out
          </button>
        </Link>
       
          <h3 className="text-xl sm:text-2xl  text-[#212529] font-bolder">
            total number of items:{" "}
            <span className="text-[#22DB14]">
              {totalNumber?.numOfCartItems}
            </span>
          </h3>
        </div>

       

        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg my-5">
          <table className="w-[90%] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {cartDetails?.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>

                  <td className="px-6 py-4">
                    <span
                      onClick={()=>deleteItem(product.product.id)}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="flex justify-center items-center  w-full">
          <button onClick={clearCartItems} className="px-6 py-4 border border-green-400 text-xl rounded-lg capitalize">{isLoading?<i className="fas fa-spinner fa-spin text-green-600"></i>:"clear your cart"}</button>
        </div>
      </div>
    </>
  );
}
