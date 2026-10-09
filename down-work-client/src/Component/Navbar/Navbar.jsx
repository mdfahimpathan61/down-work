
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "/logo (1).png";
import "./navbar.css";

import {
  CiLogin,
  CiLogout,
  CiMenuFries,
} from "react-icons/ci";

import {
  MdWork,
  MdWorkHistory,
  MdPerson,
  MdEdit,
} from "react-icons/md";

import { FiUser } from "react-icons/fi";

import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { activeUser, signout, role } = useContext(AuthContext);

  const navigate = useNavigate();

  // -----------------------------------
  // Client menu
  // -----------------------------------

  const clientRole = (
    <>
      <Link
        to="/client/postjob"
        className="group flex items-center gap-2 rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MdWork className="text-lg transition-transform group-hover:scale-110" />
        <span>Post Job</span>
      </Link>

      <Link
        to="/client/mypostedjobs"
        className="group mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MdWorkHistory className="text-lg transition-transform group-hover:scale-110" />
        <span>My Posted Jobs</span>
      </Link>

      <hr className="my-2 border-base-300" />
    </>
  );

  // -----------------------------------
  // Freelancer menu
  // -----------------------------------

  const freelancerRole = (
    <>
      <Link
        to="/freelancer/profile"
        className="group flex items-center gap-2 rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MdPerson className="text-lg transition-transform group-hover:scale-110" />
        <span>My Profile</span>
      </Link>

      <Link
        to="/freelancer/profile/update"
        className="group mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MdEdit className="text-lg transition-transform group-hover:scale-110" />
        <span>Update Profile</span>
      </Link>

      <Link
        to="/freelancer/appliedjobs"
        className="group mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary"
      >
        <MdWorkHistory className="text-lg transition-transform group-hover:scale-110" />
        <span>Applied Jobs</span>
      </Link>

      <hr className="my-2 border-base-300" />
    </>
  );

  // -----------------------------------
  // Sign out
  // -----------------------------------

  const handleSignOut = () => {
    if (activeUser) {
      signout();
    } else {
      navigate("/auth/login");
    }
  };

  // -----------------------------------
  // Main navigation
  // -----------------------------------

  const list = (
    <>
      <NavLink to="/">
        {({ isActive }) => (
          <li
            className={`rounded-xl px-3 py-2 transition-all duration-200 ${
              isActive
                ? "bg-primary/10 font-semibold text-primary"
                : "text-accent hover:bg-primary/5 hover:text-primary"
            }`}
          >
            Home
          </li>
        )}
      </NavLink>

      <NavLink to="/browseservice">
        {({ isActive }) => (
          <li
            className={`rounded-xl px-3 py-2 transition-all duration-200 ${
              isActive
                ? "bg-primary/10 font-semibold text-primary"
                : "text-accent hover:bg-primary/5 hover:text-primary"
            }`}
          >
            Browse Services
          </li>
        )}
      </NavLink>

      <a href="/#categories">
        <li className="rounded-xl px-3 py-2 text-accent transition-all duration-200 hover:bg-primary/5 hover:text-primary">
          Categories
        </li>
      </a>
    </>
  );

  return (
    <div className="sticky top-0 z-50 mx-auto max-w-360  ">

      <div className="navbar rounded-b-lg border-b border-base-200 bg-base-300/70 shadow-md backdrop-blur-md">

        {/* =====================================
            LOGO
        ====================================== */}

        <div className="navbar-start">

          <Link
            to="/"
            className="group flex items-center"
          >
            <img
              className="w-20 transition-transform duration-300 group-hover:scale-105 md:w-30"
              src={logo}
              alt="Logo"
            />
          </Link>

        </div>

        {/* =====================================
            DESKTOP NAVIGATION
        ====================================== */}

        <div className="navbar-center hidden md:flex">

          <ul className="menu menu-horizontal items-center gap-2 px-1 text-base lg:gap-4 lg:text-lg">
            {list}
          </ul>

        </div>

        {/* =====================================
            RIGHT SIDE
        ====================================== */}

        <div className="navbar-end gap-1">

          {/* Login */}

          {!activeUser && (
            <Link
              to="/auth/login"
              className="hidden rounded-xl px-4 py-2 text-accent transition-all duration-200 hover:bg-primary/10 hover:text-primary sm:flex sm:items-center sm:gap-1"
            >
              <CiLogin className="text-xl" />
              <span>Log in / Registration</span>
            </Link>
          )}

          {/* =================================
              DESKTOP PROFILE DROPDOWN
          ================================== */}

          <div className="dropdown dropdown-end hidden sm:block">

            <div
              tabIndex={0}
              role="button"
              className="m-1 cursor-pointer rounded-full p-0.5 transition-all duration-300 hover:bg-primary/10"
            >

              {activeUser && (
                <div className="relative">

                  <img
                    className="h-9 w-9 rounded-full border-2 border-base-200 object-cover shadow-sm transition-all duration-300 hover:border-primary md:h-11 md:w-11"
                    src={activeUser?.photoURL}
                    alt={activeUser?.displayName || "User"}
                  />

                  {/* Online indicator */}

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-success"></span>

                </div>
              )}

            </div>

            <div
              tabIndex="-1"
              className="dropdown-content menu mt-3 w-60 rounded-2xl border border-base-200 bg-base-100 p-3 shadow-xl"
            >

              {/* User Header */}

              {activeUser && (
                <div className="mb-2">

                  <div className="flex flex-col items-center">

                    <div className="relative">

                      <img
                        className="h-16 w-16 rounded-full border-3 border-primary/20 object-cover shadow-md"
                        src={activeUser?.photoURL}
                        alt={activeUser?.displayName || "User"}
                      />

                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-base-100 bg-success"></span>

                    </div>

                    <h4 className="mt-2 font-bold">
                      {activeUser?.displayName}
                    </h4>

                    <p className="max-w-full truncate text-xs text-accent">
                      {activeUser?.email}
                    </p>

                    {role && (
                      <span className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                        {role}
                      </span>
                    )}

                  </div>

                  <hr className="my-3 border-base-300" />

                </div>
              )}

              {/* Client */}

              {role === "client" && clientRole}

              {/* Freelancer */}

              {role === "freelancer" && freelancerRole}

              {/* Logout */}

              <button
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-secondary transition-all duration-200 hover:bg-error/10 hover:text-error"
                onClick={handleSignOut}
              >
                <CiLogout className="text-xl" />
                Log out
              </button>

            </div>

          </div>

          {/* =================================
              MOBILE MENU
          ================================== */}

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-xl text-xl hover:bg-primary/10 md:hidden"
            >
              <CiMenuFries />
            </div>

            <div
              tabIndex="-1"
              className="dropdown-content menu mt-3 w-64 rounded-2xl border border-base-200 bg-base-100 p-3 shadow-xl"
            >

              {/* Mobile User */}

              {activeUser && (
                <div className="mb-2">

                  <div className="flex items-center gap-3 rounded-2xl bg-base-200/50 p-3">

                    <div className="relative shrink-0">

                      <img
                        className="h-11 w-11 rounded-full border-2 border-primary/20 object-cover"
                        src={activeUser?.photoURL}
                        alt={activeUser?.displayName || "User"}
                      />

                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-success"></span>

                    </div>

                    <div className="min-w-0">

                      <h4 className="truncate text-sm font-bold">
                        {activeUser?.displayName}
                      </h4>

                      <p className="truncate text-xs text-accent">
                        {activeUser?.email}
                      </p>

                    </div>

                  </div>

                  <hr className="my-3 border-base-300" />

                </div>
              )}

              {/* Main Links */}

              {list}

              {/* Role based links */}

              {role === "client" && clientRole}

              {role === "freelancer" && freelancerRole}

              {/* Login / Logout */}

              <button
                className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-secondary transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                onClick={handleSignOut}
              >
                {activeUser ? (
                  <>
                    <CiLogout className="text-xl" />
                    Log out
                  </>
                ) : (
                  <>
                    <CiLogin className="text-xl" />
                    Log in
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;

