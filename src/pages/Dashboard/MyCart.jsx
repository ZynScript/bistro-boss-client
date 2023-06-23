import React from "react";
import useCart from "../../hooks/useCart";
import {Helmet} from "react-helmet-async";
import {FaTrashAlt} from "react-icons/fa";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://bistro-boss-server-sigma-teal.vercel.app/carts/${item._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full lg:ms-10">
      <Helmet>
        <title>Bistro Boss | MyCart</title>
      </Helmet>
      <div className="font-semibold py-5 flex justify-evenly items-center gap-3">
        <h3 className="lg:text-3xl">TOTAL ITEM: {cart.length}</h3> |
        <h3 className="lg:text-3xl">TOTAL PRICE: ${total.toFixed(2)}</h3> |
        <Link to="/dashboard/payment">
          <button className="btn btn-success">PAY</button>
        </Link>
      </div>
      <div className="overflow-x-auto bg-base-200 p-10 rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="font-semibold">${item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn text-[18px]">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
