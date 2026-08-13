import React from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { MdOutlineAccessTime, MdWorkOutline } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import { Link } from 'react-router';

const Featuredjob = ({job}) => {
    //console.log(job)
    const {id,title, company, location, job_type, posted_date,salary}  = job
 //console.log(company.logo)
    return (
        <Link  to={`/details/${id}`}>
            <div className=' shadow-blue-100 shadow-sm hover:shadow-md hover:pt-11 bg-white w-9/10 mx-auto py-10 px-5 sm:flex justify-between items-center mt-7'>
             <div className='gap-5 flex items-start   '>
                <img className='sm:mx-0 w-13 rounded-full' src={company.logo} alt="" />

                <div>
                    <h4 className='text-xl text-accent'>{title}</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-5 text-gray-500 my-4 '>
                        <div className='flex items-center gap-2'>
                            <SlLocationPin/>
                            <span>{location.city}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdWorkOutline />
                            <span>{job_type}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MdOutlineAccessTime />
                            <span>{posted_date}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <HiOutlineCurrencyDollar className='text-lg' />
                            <span>{salary.maximum} tk</span>
                        </div>
                    </div>
                </div>
                
                
                
             </div>

                
                    <button className='btn text-accent py-6 bg-gray-100 text-lg hover:bg-primary hover:text-white  px-5 w-full sm:w-30 hover:shadow-md'>Details</button>
                
        </div>
        </Link>
    );
};

export default Featuredjob;