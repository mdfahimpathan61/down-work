import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { TbPhotoUp } from "react-icons/tb";
import {  ToastContainer } from "react-toastify";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signinWithEmail,toastSuccess } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()



  const handleOnSubmit = (event) => {
    event.preventDefault();
    
    const email = event.target.email.value;
   
    const password = event.target.password.value;
    //console.log(name, email, url, password)
    

    //reset state
    setError("");
    setSuccessLogin(false);

    signinWithEmail(email, password)
    
      .then((result) => {
        console.log(result);
        setSuccessLogin(true);
        event.target.reset();
        toastSuccess("Log in successful")
        location?.state?navigate(location.state) : navigate("/")

      })
      
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100  md:w-full max-w-sm  shadow-2xl">
          <div className="card-body max-w-9/10 p-10">
            <h1 className="text-2xl font-bold">Log In </h1>
            <form onSubmit={handleOnSubmit}>
              <fieldset className="fieldset">
                
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                    <Link className="text-[12px] text-accent hover:text-black hover:underline">Forgot password</Link>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button className="btn text-white mt-4 bg-secondary hover:bg-primary">
                  Log in
                </button>

                <div>
                    <Link to={"/auth/registration"}>Don't have an account? <span className="text-primary hover:underline">Registar</span></Link>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer className="w-3/10"/>
    </div>
  );
};

export default Login;
