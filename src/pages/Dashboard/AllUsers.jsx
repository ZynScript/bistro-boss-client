import {useQuery} from "@tanstack/react-query";
import React from "react";
import {Helmet} from "react-helmet-async";
import {
  FaTrashAlt,
  FaUser,
  FaUserAlt,
  FaUserAltSlash,
  FaUserCheck,
  FaUserFriends,
  FaUserNinja,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {data: users = [], refetch} = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleDelete = (user) => {
    console.log(user);
  };
  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire("Good job!", `${user.name} is an Admin Now`, "success");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <div className="text-xl my-8 font-semibold">
        Total Users: {users.length}
      </div>
      <div className="overflow-x-auto w-full px-5">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="pl-1">
                  {user.role === "admin" ? (
                    <button className="btn btn-ghost text-[18px]">
                      <FaUserNinja />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost text-[18px]">
                      <FaUserFriends />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost text-[18px]">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
