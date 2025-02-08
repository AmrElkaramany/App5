import React, { useEffect, useState } from "react";
import Style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [CategoriesSlider, setCategoriesSlider] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200, // أقل من 1200 بيكسل
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992, // أقل من 992 بيكسل
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // أقل من 768 بيكسل
        settings: {
          slidesToShow: 3,
        },
      },
      
    ],
  };
  
  async function getCategoriesSlider() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      let finalData = data.data;
      console.log(finalData);
      setCategoriesSlider(finalData);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getCategoriesSlider();
  }, []);

  return (
    <>
      <Slider {...settings}>

      {CategoriesSlider.map((category) =>  <div key={category.name} className="category">
          <img className="category-img "  src={category.image} alt={category.name} />
          <h3 className="mt-2 font-light">{category.name}</h3>
        </div>
      )}
      </Slider>
   
    </>
  );
}
