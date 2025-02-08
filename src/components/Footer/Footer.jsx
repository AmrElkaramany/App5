import React, { useEffect, useState } from "react";
import Style from './Footer.module.css'
export default function Footer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Footer</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis,
        harum!
      </p>
    </>
  );
}
