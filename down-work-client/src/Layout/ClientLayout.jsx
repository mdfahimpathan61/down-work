import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer';
import useAuth from '../hooks/useAuth';

const ClientLayout = () => {
    const {role} = useAuth()
    if(role != 'client'){
        return <Navigate to={'/notfound'}></Navigate>
    }
    else{
        return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
    }
};

export default ClientLayout;