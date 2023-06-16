import React from "react";
import {Helmet} from "react-helmet-async";
import Cover from "../Shared/Cover";
import img from "../../assets/menu/banner3.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle";
import MenuCategory from "./MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={img} title="Our Menu" />
      <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"} />
      <MenuCategory items={offered} />
      <MenuCategory items={desserts} title="Dessert" img={dessertImg} />
      <MenuCategory items={pizzas} title="Pizza" img={pizzaImg} />
      <MenuCategory items={salads} title="Salad" img={saladImg} />
      <MenuCategory items={soups} title="Soup" img={soupImg} />
    </div>
  );
};

export default Menu;
