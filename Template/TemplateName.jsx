import React, { useEffect, useState } from "react";
import Style from './TemplateName.module.css'
export default function TemplateName() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>TemplateName</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis,
        harum!
      </p>
    </>
  );
}
