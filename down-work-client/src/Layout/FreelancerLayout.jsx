import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Navigate, Outlet } from 'react-router';
import Footer from '../Component/Footer';
import useAuth from '../hooks/useAuth';

const FreelancerLayout = () => {
    const {role} = useAuth()
    if(role != 'freelancer'){
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

export default FreelancerLayout;
