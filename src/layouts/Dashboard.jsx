import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import {
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaCartPlus,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";
import {Helmet} from "react-helmet-async";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: load data from the server to have dynamic isAdmin based on data
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  return (
    <>
      <Helmet>
        <title>Bistro Boss | User Dashboard</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden my-5">
            <FaBars />
            Nav
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/">
                    <FaHome />
                    Admin Panel
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-items">
                    <FaUtensils />
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-items">
                    <FaList />
                    Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-bookings">
                    <FaBook />
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/">
                    <FaHome />
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/mycart">
                    <FaShoppingCart />
                    My Cart
                    <span className="bg-slate-700 rounded-full px-2">
                      +{cart?.length || 0}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment-history">
                    <FaWallet />
                    Payment Histroy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reservations">
                    <FaCalendarAlt />
                    Reservations
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                <FaBars />
                Our Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <FaCartPlus />
                Order Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu">
                <FaWhatsapp />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
