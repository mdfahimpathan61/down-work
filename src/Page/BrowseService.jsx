import React from 'react';
import { RiArrowLeftWideLine } from 'react-icons/ri';
import { Link } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import { SiRobotframework } from 'react-icons/si';

const BrowseService = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-screen  flex  items-center justify-center '>
                
                    <div className=' '>
                        <SiRobotframework className='text-5xl text-center my-3' />
                    <h3 className='text-xl md:text-2xl '>Soon This Page will Build </h3>
                    
                    <Link to={"/"}>
                        <button className='btn btn-warning text-white mt-4'><RiArrowLeftWideLine /> Go to Home</button>
                    </Link>
                    
             </div>
            </div>
            
        </div>
    );
};

export default BrowseService;