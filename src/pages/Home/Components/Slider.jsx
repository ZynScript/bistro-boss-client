import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle";

const Slider = () => {
  return (
    <>
      <SectionTitle
        subHeading={"from 11:00AM to 10:00PM"}
        heading={"Order Online"}
      />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h2 className="text-xl md:text-4xl uppercase -mt-10 md:-mt-20 pb-20 drop-shadow-md text-center text-white font-semibold">
            Salads
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h2 className="text-xl md:text-4xl uppercase -mt-10 md:-mt-20 text-center drop-shadow-md text-white font-semibold">
            Pizzas
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h2 className="text-xl md:text-4xl uppercase -mt-10 md:-mt-20 text-center drop-shadow-md text-white font-semibold">
            Soups
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h2 className="text-xl md:text-4xl uppercase -mt-10 md:-mt-20 text-center drop-shadow-md text-white font-semibold">
            Deserts
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h2 className="text-xl md:text-4xl uppercase -mt-10 md:-mt-20 text-center drop-shadow-md text-white font-semibold">
            Salads
          </h2>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
