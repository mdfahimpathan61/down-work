import React, { createContext } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateInfo) => {
    return updateProfile(auth.currentUser, updateInfo);
  };

  const toastSuccess = (msz) => {
    toast.success(msz, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const value = {
    signUpWithEmail,
    updateUser,
    toastSuccess
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
