import React from "react";
import MenuItem from "../Shared/MenuItem";
import Cover from "../Shared/Cover";
import {Link} from "react-router-dom";

const MenuCategory = ({items, title, img}) => {
  return (
    <div className="my-10">
      {title && <Cover img={img} title={title} />}
      <div className="grid lg:grid-cols-2 gap-10 justify-center mx-5 my-20">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
