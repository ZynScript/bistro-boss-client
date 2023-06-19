import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";

const Main = () => {
  const location = useLocation();
  const noNavFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {noNavFooter || <NavBar />}
      <Outlet />
      {noNavFooter || <Footer />}
    </div>
  );
};

export default Main;
