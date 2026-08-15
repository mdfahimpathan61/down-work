import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { TbPhotoUp } from "react-icons/tb";
import {  ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router";

const Registration = () => {
  const { signUpWithEmail, updateUser,toastSuccess } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successReg, setSuccessReg] = useState(false);
  const navigate = useNavigate()



  const handleOnSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const url = event.target.url.value;
    const password = event.target.password.value;
    //console.log(name, email, url, password)
    const updateinfo = {
      displayName: name,
      photoURL: url,
    };

    if(error){
      return
    }

    //reset state
    setError("");
    setSuccessReg(false);

    signUpWithEmail(email, password)
    .then(() => updateUser(updateinfo))
      .then((result) => {
       // console.log(result);
        setSuccessReg(true);
        event.target.reset();
        toastSuccess("Registration successful")
        navigate("/auth/login")
      })
      
      .catch((error) => {
        setError(error.message);
      });
  };

  const handlePassword = (event) =>{
    const password = event.target.value 
    
    //console.log(password)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if(!passwordRegex.test(password)){
      setError("Password must be contain uppcase, lowercase, number and Special character eg. w, W, 1, @")
      
    }
    else if(password.length < 6){
      setError("Password must be 6 or more character")
    }
    else{
      setError("")
    }
    
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100  md:w-full max-w-sm  shadow-2xl">
          <div className="card-body max-w-9/10 p-10">
            <h1 className="text-2xl font-bold">Registar Now!</h1>
            <form onSubmit={handleOnSubmit}>
              <fieldset className="fieldset">
                <label className="label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  required
                />
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="url"
                  className="input"
                  placeholder="URL"
                />
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
                  required
                  onChange={handlePassword}
                />
                <div>
                    <Link className="text-sm text-accent" to={"/auth/login"}>Already have an account? <span className="text-primary hover:underline">Log in</span></Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}

                <button className="btn text-white mt-4 bg-secondary hover:bg-primary">
                  Registar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Registration;
