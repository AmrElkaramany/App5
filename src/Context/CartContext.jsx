import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function GetLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function updateProductToCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function clearUserCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function checkOut(cartId, url, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValues },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  const [cart, setCart] = useState(null);

  async function getCart() {
    let response = await GetLoggedUserCart();
    console.log(response.data);
    setCart(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        GetLoggedUserCart,
        addProductToCart,
        updateProductToCart,
        deleteCartItem,
        clearUserCart,
        checkOut,
        setCart,
        cart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
