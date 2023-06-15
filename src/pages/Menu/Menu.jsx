import React from "react";
import {Helmet} from "react-helmet-async";
import Cover from "../Shared/Cover";
import img from "../../assets/menu/banner3.jpg";
import PopularMenu from "../Home/Components/PopularMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={img} title="Our Menu" />
      <PopularMenu />
      <Cover img={img} title="Our Menu" />
      <PopularMenu />
      <Cover img={img} title="Our Menu" />
    </div>
  );
};

export default Menu;
