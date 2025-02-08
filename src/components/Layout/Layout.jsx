import React, { useEffect, useState } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="container  m-auto mt-28">
        <Navbar />

        <Outlet></Outlet>

      </div>
    </>
  );
}
