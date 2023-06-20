import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet-async";
import {useContext} from "react";
import {AuthContext} from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin";

const SignUp = () => {
  const {createUser, updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, data.photo).then(() => {
          const saveUser = {name: data.name, email: data.email};
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Toast.fire({
                  icon: "success",
                  title: "User Created Successfully",
                });
                navigate("/");
              }
            });
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className=" w-1/2 lg:w-1/3 mx-auto my-[10vh]">
        <div className="card shadow-2xl bg-base-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-xl font-bold text-center">Login!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register("name", {required: true})}
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 pt-1">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", {required: true})}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600 pt-1">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600 pt-1">Password is required</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600 pt-1">
                  Password Must Be Less Then 20 Characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600 pt-1">
                  Password Must have one uppercase, one lowercase, one number,
                  one special character [!@#$&*]
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600 pt-1">
                  Password Must Be 8 Characters
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile</span>
              </label>
              <input
                type="text"
                {...register("photo")}
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value={"Sign Up"}
              />
            </div>
            <label className="label">
              <span className="label-text-alt ">
                Already Have An Account{" "}
                <Link to="/login" className="link link-hover">
                  Login
                </Link>
              </span>
            </label>
          </form>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default SignUp;
