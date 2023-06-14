import React from "react";
import "./Featured.css";
import SectionTitle from "../../../../components/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-5 my-20">
      <SectionTitle subHeading={"Check it Out"} heading={"Featured Item"} />
      <div className="md:flex justify-center items-center gap-10 px-32 pb-20">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="drop-shadow-lg">
          <p>Aug 20, 2023</p>
          <p className="uppercase font">Where Can i get Some</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
            excepturi, voluptates libero sequi, ducimus vitae ea et repudiandae
            quod nulla fuga, deleniti nobis accusamus eaque magni delectus
            maiores laborum ex.
          </p>
          <button className="btn mt-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
