import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { TbPhotoUp } from "react-icons/tb";
import {  ToastContainer } from "react-toastify";

const Registration = () => {
  const { signUpWithEmail, updateUser,toastSuccess } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successReg, setSuccessReg] = useState(false);



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

    //reset state
    setError("");
    setSuccessReg(false);

    signUpWithEmail(email, password)
    .then(() => updateUser(updateinfo))
      .then((result) => {
        console.log(result);
        setSuccessReg(true);
        event.target.reset();
        toastSuccess("Registration successful")
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
            <h1 className="text-2xl font-bold">Registar Now!</h1>
            <form onSubmit={handleOnSubmit}>
              <fieldset className="fieldset">
                <label className="label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
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
                />

                {error && <p className="text-red-500">{error}</p>}

                <button className="btn text-white mt-4 bg-secondary hover:bg-primary">
                  Registar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Registration;
