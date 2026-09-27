import React, { use, useEffect } from 'react';
import { FaUser, FaUserTie } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Component/Loading';

const Role = () => {
    const {activeUser,loading,toastSuccess} = useAuth()
    const location = useLocation()
    console.log(location)

    const handleLoginWithGoogle = (role) =>{
        const newUser = {
            name:activeUser.displayName, 
            email: activeUser.email,
            url:activeUser.photoURL,
            role:role
        }

        fetch(`http://localhost:3000/user?email=${activeUser.email}`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body:JSON.stringify(newUser)
        })

        toastSuccess("Registration Complete");

    }

    
    return (
        <>
            {
                loading ? <Loading></Loading> :<div className='min-h-screen flex flex-col items-center justify-center'>

            <h3 className='text-2xl md:text-5xl mt-5'>Welcome to Downwork</h3>
            <p className='text-accent font-light mt-3 text-sm md:text-lg'>Choose your Role</p>

            <div className=' md:flex justify-center gap-10 items-center my-7 md:mt-10'> 

                <Link onClick={() => handleLoginWithGoogle("client")} to={activeUser ? "/" :"/auth/registration/client"}>
                    <div  className=' group mt-5  border rounded-xl border-gray-200 shadow-secondary/20 shadow-xl p-5 md:p-10 hover:shadow-2xl transition-all duration-500' >
                    <div className='aspect-square transition-colors duration-500 group-hover:bg-secondary/20 bg-secondary/10 rounded-xl flex items-center justify-center p-3 md:p-5  w-full h-full'>
                        <FaUserTie className="text-5xl md:text-9xl" />
                    </div>

                    <p className='text-center text-xl gap-3 flex items-center mt-4'>Client <FaArrowRightLong className='group-hover:translate-x-2 transition-transform duration-500' /></p>
                    <p className='text-sm text-accent font-extralight'>Post Job and Hire Talent</p>
                </div>
                </Link>
                <Link onClick={() => handleLoginWithGoogle("freelancer")} to={activeUser ? '/' : '/auth/registration/freelancer'}>
                    <div  className='group mt-5 border rounded-xl border-gray-200 shadow-secondary/20 shadow-xl p-5 md:p-10 hover:shadow-2xl transition-all duration-500' >
                    <div className='aspect-square transition-colors duration-500 group-hover:bg-secondary/20 bg-secondary/10 rounded-xl flex items-center justify-center p-3 md:p-5  w-full h-full'>
                        <FaUser  className="text-5xl md:text-9xl" />
                    </div>

                    <p className='text-center text-xl gap-3 flex items-center mt-4'>Freelancer <FaArrowRightLong className='group-hover:translate-x-2 transition-transform duration-500' /></p>
                    <p className='text-sm text-accent font-extralight'>Apply Job and get work</p>
                </div>
                </Link>

                
            </div>
            
        </div>
            }
        </>
    );
};

export default Role;