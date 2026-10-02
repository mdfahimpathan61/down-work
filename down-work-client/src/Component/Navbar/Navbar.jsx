import  { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "/logo (1).png";
import "./navbar.css";
import { CiLogin, CiLogout, CiMenuFries } from "react-icons/ci";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdWork, MdWorkHistory } from "react-icons/md";

const Navbar = () => {
  const { activeUser, signout ,role} = useContext(AuthContext);
 // console.log(activeUser);
 console.log(role)
  const navigate = useNavigate();
  const clientRole =
   <>
    <Link to={"/client/postjob"} className="pl-3 text-accent hover:text-primary flex items-center gap-1"><MdWork />Post Job</Link>
    <Link to={"/client/mypostedjobs"} className="pl-3 mt-1 text-accent hover:text-primary flex items-center gap-1"><MdWorkHistory /> My posted Jobs</Link>

    <hr className=" border-gray-200 my-2" />

  </>

  const handleSignOut = () => {
    if (activeUser) {
      signout();
    } else {
      navigate("/auth/login");
    }
  };

  const list = (
    <>
      <NavLink to={"/"}>
        <li className="text-accent hover:text-primary">Home</li>
      </NavLink>
      <NavLink to={"/browseservice"}>
        <li className="text-accent hover:text-primary">Browse Services</li>
      </NavLink>

      <a href="/#categories">
        
          <li className="text-accent hover:text-primary">Categories</li>
        
      </a>
    </>
  );

  return (
    <div className="max-w-360 mx-auto shadow-lg shadow-blue-50  z-50 sticky top-0">
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <img className="md:w-30 w-20" src={logo} alt="" />
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-7 text-lg">{list}</ul>
        </div>

        <div className="navbar-end">
          {
            !activeUser && <div className="">
            <Link to={"/auth/login"} className="hidden  sm:block ">
                  <p className="text-accent hover:text-primary flex items-center gap-1 "><CiLogin /> Log in/Registration </p>
                </Link>
          </div>
          }

          <div className="dropdown dropdown-end hidden  sm:block">
            <div tabIndex={0} className=" m-1">
              {activeUser && (
                <div>
                  <img
                    className="w-8 h-8 md:w-11 md:h-11 rounded-full  border-3  border-gray-100"
                    src={activeUser?.photoURL}
                    alt=""
                  />
                </div>
              ) 
              }
            </div>
            <div
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm py-4 "
            >
              <img
                className="w-8 h-8 md:w-11 md:h-11 rounded-full  border-3 mx-auto border-gray-100"
                src={activeUser?.photoURL}
                alt=""
              />
              <h4 className="font-bold text-center mb-1">
                {activeUser?.displayName}
              </h4>
              <hr className=" border-gray-200 my-2" />
              
              {
                role == "client"  && clientRole
              }
              <button
                className="mx-auto  mt-2 gap-1 text-secondary hover:text-primary flex items-center"
                onClick={handleSignOut}
              >
                <CiLogout /> Log out
              </button>
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <CiMenuFries />
            </div>
            <div
              tabIndex="5"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-3 shadow-sm py-4"
            >
              {activeUser && (
                <div>
                  <img
                    className="w-8 h-8 md:w-11 md:h-11 rounded-full  border-3 mx-auto border-gray-100"
                    src={activeUser?.photoURL}
                    alt=""
                  />
                  <h4 className="font-bold text-sm text-center mb-2">
                    {activeUser?.displayName}
                  </h4>
                  <hr className=" border-gray-200" />
                </div>
              )}
              {list}
              {
                role == 'client' && clientRole
              }
              <button
                className="   gap-1 text-secondary hover:text-primary flex items-center"
                onClick={handleSignOut}
              >
                <CiLogin /> {activeUser ?"Log out":"Log in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
