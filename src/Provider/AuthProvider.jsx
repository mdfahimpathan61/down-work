import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
 const [activeUser, setActiveuser] = useState(null)
 const [loading,isLoading] = useState(true)


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

  const signinWithEmail = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signout = () =>{
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        setActiveuser(user)
        isLoading(false)
    })
    return () => unsubscribe()
  },[])

  const value = {
    signUpWithEmail,
    updateUser,
    toastSuccess,
    signinWithEmail,
    signout,
    activeUser,
    loading
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
