import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import swal from "sweetalert"; // SweetAlert
import { UserContext } from "../../Context/UserContextProvider";


export default function Login() {
  const { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{2,8}$/, "password must start with upper case")
      .required("password is required"),
  });

  async function handelLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)

      .then(function (apiResponse) {
        setIsLoading(false);
        console.log(apiResponse)
        localStorage.setItem("userToken", apiResponse?.data?.token);
        setUserLogin(apiResponse?.data?.token)
        const message = apiResponse?.data?.message || "Signup successful!";
        swal({
          title: "Success!",
          text: message,
          icon: "success",
          buttons: true, // Enables the OK button
        }).then((willNavigate) => {
          if (willNavigate) {
            navigate("/");
          }
        });
      })

      .catch(function (apiResponse) {
        setIsLoading(false);
        const errorMessage =
          apiResponse?.response?.data?.message || "An error occurred!";
        swal("Error!", errorMessage, "error");
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handelLogin,
    validationSchema,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm sm:max-w-xl mx-auto"
      >
        <h2 className="text-3xl text-green-600 font-bold my-3">Login Now</h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your email address
          </label>
        </div>

        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your password
          </label>
        </div>

        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : null}

        <div className="flex items-center">
          <button
            type="submit"
            className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <p className="pl-6">
            didn't have account yet ? 
             <span className="font-semibold"><Link to={'/register'}> Register Now</Link></span>
          </p>
        </div>
      </form>
    </>
  );
}
