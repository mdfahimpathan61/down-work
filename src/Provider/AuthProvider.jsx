import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
 const [activeUser, setActiveuser] = useState(null)
 const [loading,setLoading] = useState(true)
 const [searchTextContext, setSearchTextContext] = useState()


  const signUpWithEmail = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWitGoogle = () =>{
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

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
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signout = () =>{
    setLoading(true)
    return signOut(auth)
  }

  const forgotPassword = (email) =>{
      return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        setActiveuser(user)
        setLoading(false)
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
    loading,
    signInWitGoogle,
    searchTextContext,
    setSearchTextContext,
    forgotPassword
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
