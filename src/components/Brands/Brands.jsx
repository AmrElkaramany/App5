import React, { useEffect, useState } from "react";
import Style from './Brands.module.css'
export default function Brands() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Brands</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis,
        harum!
      </p>
    </>
  );
}
