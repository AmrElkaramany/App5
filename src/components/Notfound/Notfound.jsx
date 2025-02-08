import React, { useEffect, useState } from "react";
import Style from './Notfound.module.css'
export default function Notfound() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Notfound</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis,
        harum!
      </p>
    </>
  );
}
