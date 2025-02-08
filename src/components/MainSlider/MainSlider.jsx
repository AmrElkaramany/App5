import React, { useEffect, useState } from "react";
import Style from "./MainSlider.module.css";
import Slider from "react-slick";
import MainSlider1 from "../../assets/finalProject assets/images/slider-2.jpeg";
import MainSlider2 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import MainSlider3 from "../../assets/finalProject assets/images/grocery-banner.png";
import Slide1 from "../../assets/finalProject assets/images/slider-image-1.jpeg";
import Slide2 from "../../assets/finalProject assets/images/slider-image-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="row">
        <div className="w-full sm:w-3/4">
          <Slider {...settings}>

      <img src={MainSlider1} className="w-full h-[400px]" />
      <img src={MainSlider2} className="w-full h-[400px]"  />
      <img src={MainSlider3} className="w-full h-[400px]"  />

          </Slider>
        </div>
        <div className="w-full sm:w-1/4">
        <img src={Slide1} className="w-full h-[200px]"  />
        <img src={Slide2} className="w-full h-[200px]"  />
        </div>
      </div>
    </>
  );
}
