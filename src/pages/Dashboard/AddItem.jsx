import React from "react";
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import {useForm} from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Img_Hosting_Token;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.url;
          const {name, price, category, recipe} = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category: category.toLowerCase(),
            recipe,
            image: imgURL,
          };
          axiosSecure.post("/menu", newItem).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire("Good job!", "New Item Added Successfully!", "success");
            }
          });
        }
      });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Bistro Boss | Add Item</title>
      </Helmet>
      <SectionTitle subHeading={"what's new?"} heading={"Add An Item"} />
      <div className="mx-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", {required: true})}
              placeholder="Recipe Name"
              className="input input-bordered input-accent w-full"
            />
          </div>
          <div className="flex gap-3 py-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="Select One"
                {...register("category", {required: true})}
                className="select select-accent select-bordered">
                <option disabled>Pick One</option>
                <option>Salad</option>
                <option>Pizza</option>
                <option>Soup</option>
                <option>Dessert</option>
                <option>Drinks</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Item Price"
                {...register("price", {required: true})}
                className="input input-bordered input-accent w-full"
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", {required: true})}
              className="textarea textarea-accent"
              placeholder="Recipe Details"></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Image*</span>
            </label>
            <input
              type="file"
              {...register("image", {required: true})}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <input
            className="btn btn-sm btn-success"
            type="submit"
            value="Add Item"
          />
        </form>
      </div>
    </div>
  );
};

export default AddItem;
