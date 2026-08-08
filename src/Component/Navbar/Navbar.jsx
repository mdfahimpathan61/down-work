import React from "react";
import { NavLink } from "react-router";
import logo from "/logo (1).png";
import "./navbar.css";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const list = (
    <>
      <NavLink to={"/"}>
        <li className=" hover:text-primary">Home</li>
      </NavLink>
      <NavLink to={"/bs"}>
        <li className="text-accent hover:text-primary">Browse Services</li>
      </NavLink>

      <NavLink to={"/categories"}>
        <li className="text-accent hover:text-primary">Categories</li>
      </NavLink>
    </>
  );

  return (
    <div className="max-w-360 mx-auto shadow-lg shadow-blue-50 relative z-50">
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
            <img className="md:w-30 w-20" src={logo} alt="" />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-7 text-lg">{list}</ul>
        </div>
        
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <CiMenuFries />
              </div>
              <ul
                tabIndex="5"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 max-w-52 p-2 shadow shadow-blue-200"
              >
                {list}
              </ul>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
