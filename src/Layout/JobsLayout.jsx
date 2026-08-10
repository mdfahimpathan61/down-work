import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';

const JobsLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default JobsLayout;