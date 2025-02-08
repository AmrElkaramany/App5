import React, { useEffect, useState } from "react";
import Style from './Logout.module.css'
export default function Logout() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis,
        harum!
      </p>
    </>
  );
}
