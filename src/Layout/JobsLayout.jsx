import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Component/Loading';

const JobsLayout = () => {
    const {loading} = useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            {
                loading ? <Loading></Loading> : <Outlet></Outlet>
            }
            
        </div>
    );
};

export default JobsLayout;