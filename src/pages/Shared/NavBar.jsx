import React from "react";
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
  const {user, logOut} = useAuth();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const handleLogOut = () => {
    logOut();
  };
  const navList = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order Food</Link>
      </li>
      {user && (
        <li>
          <Link to="/secret">Private</Link>
        </li>
      )}
      {isAdmin && (
        <li>
          <Link to="/dashboard/admin-panel">Admin Panel</Link>
        </li>
      )}
      {!isAdmin && (
        <li>
          <Link to="/dashboard/myCart">
            <button className="badge badge-secondary">
              <FaShoppingCart></FaShoppingCart>
              <span>+{cart?.length || 0}</span>
            </button>
          </Link>
        </li>
      )}
      {user && (
        <>
          {user.photoURL && (
            <li>
              <span className="mr-2">
                <img
                  width={40}
                  className="rounded-full h-[40px]"
                  src={user.photoURL}
                  alt=""
                />
              </span>
            </li>
          )}
          <li>
            <span>{user.displayName}</span>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed bg-black bg-opacity-40 z-10 max-w-screen-xl text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
              {navList}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center">
            {navList}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button className="btn btn-primary" onClick={handleLogOut}>
              LOGOUT
            </button>
          ) : (
            <button>
              <Link className="btn btn-success" to="/login">
                LOGIN
              </Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
