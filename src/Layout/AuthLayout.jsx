import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Component/Loading';

const AuthLayout = () => {
    const {loading,activeUser} = useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            {
                loading ? <Loading></Loading>:<Outlet></Outlet>
            }
            
        </div>
    );
};

export default AuthLayout;