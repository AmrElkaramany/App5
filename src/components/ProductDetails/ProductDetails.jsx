import React, { useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let { id, category } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  function getProductDetail(id) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data);
        setProductDetail(data.data);
        setLoading(false);
      })
      .catch(({ data }) => {
        console.log(data);
        setLoading(false);
      });
  }

  function getRelatedProduct(category) {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        console.log(allProduct);
        let finalRelated = allProduct.filter(
          (product) => product.category.name === category
        );
        console.log(finalRelated);
        setRelatedProduct(finalRelated);
        setLoading(false);
      })
      .catch(({ data }) => {
        console.log(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProductDetail(id);
    getRelatedProduct(category);
  }, [id, category]);

  return (
    <>
      <div className="row   justify-evenly ">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <div className="w-full sm:w-1/4">
              <Slider  {...settings}>
                {productDetail?.images.map((src) => (
                  <div key={productDetail.id} className="flex justify-center items-center">
                    <img
                      className="w-52  sm:w-full"
                      src={src}
                      alt={productDetail?.title}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-full sm:w-2/4 p-4 sm:p-0">
              <div className="my-4 sm:my-0">
                <h2 className="font-semibold text-3xl text-[#212529]">
                  {productDetail?.title}
                </h2>
                <p className="font-light text-gray-700 my-2">
                  {productDetail?.description}
                </p>

                <div className="flex justify-between ">
                  <span className="text-[#212529]">
                    {" "}
                    {productDetail?.price} EGP
                  </span>
                  <span>
                    <i className="fa-solid fa-star text-yellow-300"></i>{" "}
                    {productDetail?.ratingsAverage}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button className="px-4 py-2 rounded-lg bg-[#22DB14] w-full my-4 text-white">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="row">
          {relatedProduct.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/4  p-6  test"
            >
              <div className="product p-5 ">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} alt={product.title} />
                  <span className="text-green-600">
                    {product.category.name}
                  </span>
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
                  <div className="flex justify-center">
                    <button className="px-4 py-2 rounded bg-green-600 w-40 my-4 text-white">
                      + Add
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
