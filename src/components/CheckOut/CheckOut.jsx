import React, { useContext, useEffect, useState } from "react";
import Style from "./CheckOut.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";


export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false)

let {checkOut} = useContext(CartContext)

  let validationSchema = Yup.object().shape({
    details: Yup.string().required("detail is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyptian number")
      .required("phone is required"),
    city: Yup.string().required("city is required"),
  });

 async function handelCheckOut(cartId , url ) {
  setIsLoading(true)
   let response = await checkOut(cartId , url ,formik.values)
   console.log(response)
   if(response.data.status==='success')
   {
    setIsLoading(false)
    window.location.href=response.data.session.url
   }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: ()=>handelCheckOut('67978eaa4e3f2254d6a4d9f3' , 'http://localhost:5173'),
    validationSchema,
  });

  useEffect(() => {}, []);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm sm:max-w-3xl mx-auto"
      >
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            id="details"
            className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {formik.errors.details && formik.touched.details ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.details}
          </div>
        ) : null}

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            phone
          </label>
          <input
            type="tel"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {formik.errors.phone && formik.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        ) : null}

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {formik.errors.city && formik.touched.city ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.city}
          </div>
        ) : null}

        <button
          type="submit"
          className="text-[#61DCF5] border border-[#61DCF5]   font-medium rounded-lg text-md w-full  px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i>:'Pay now'}
        
        </button>
      </form>
    </>
  );
}
