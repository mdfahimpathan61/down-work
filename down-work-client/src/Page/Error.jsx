import React from 'react';
import errorImg from '/error.png'
import Navbar from '../Component/Navbar/Navbar';
import { Link } from 'react-router';
import { MdOutlineArrowLeft } from 'react-icons/md';
import { RiArrowLeftWideLine } from 'react-icons/ri';

const Error = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='h-screen mx-auto flex flex-col items-center'>
                    <img className='mx-auto w-3/4 md:w-2/5 mt-7 ' src={errorImg} alt="" />
                    <Link to={"/"}>
                        <button className='btn btn-warning text-white mt-4'><RiArrowLeftWideLine /> Go to Home</button>
                    </Link>
                    
       </div>
        </div>
    );
};

export default Error;