import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PacmanLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [Loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0)
  let { addProductToCart } = useContext(CartContext);

  async function addProduct(productId) {
    setLoading(true);
    setCurrentProductId(productId)
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-right",
        className: "mt-14",
      });
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
    console.log(response);
  }

  const { data, isLoading, isFetching, isError, error } = useProducts();

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <PacmanLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  // const [recentProducts, setRecentProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getRecentProducts();
  // }, []);

  // function getRecentProducts() {
  //   setLoading(true);
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then(({ data }) => {
  //       console.log(data.data);
  //       setRecentProducts(data.data);
  //       setLoading(false)

  //     })

  //     .catch((response) => {
  //     console.log(response);
  //     setLoading(false)

  //   });

  // }

  return (
    <>
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4  p-6  test">
            <div className="product p-5 ">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt={product.title} />
                <span className="text-green-600">{product.category.name}</span>
                <h2 className="font-semibold pt-4 pb-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="flex justify-between">
                  <span className="text-[#212529]"> {product.price} EGP</span>
                  <span>
                    <i className="fa-solid fa-star text-yellow-300"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div className="flex justify-center">
                <button
                  onClick={() => addProduct(product.id)}
                  className="px-4 py-2 rounded bg-green-600 w-40 my-4 text-white"
                >
                {currentProductId === product.id && Loading?<i className="fas fa-spinner fa-spin"></i>:'+ Add'}
                
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
