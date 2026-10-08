import React, { use, useEffect, useState } from 'react';
import Featuredjob from './Featuredjob';
import { RiArrowRightWideFill } from 'react-icons/ri';
import { Link, useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading';
import useAxios from '../../hooks/useAxios';


const Featuredjobs = () => {
    const [allJobsData,setAllJobsData] = useState([])
    const axios = useAxios()
    const {loading} = useAuth()
   useEffect(() => {
    axios.get('/jobs')
   .then(result => setAllJobsData(result.data))
   },[])

   
    //console.log(allJobsData)
    const featuredJob = allJobsData?.filter( jobs => jobs.featured == true)
    //console.log(featuredJob)
    return (
        <>
            {
                loading ? <Loading></Loading> : 
                <div className='bg-gray-100 py-20'>
             <h3 className='text-xl sm:text-3xl my-4  font-bold text-center'>Featured Jobs</h3>
            <div className='flex justify-end max-w-360 mx-auto items-center px-8'>
               
                <Link to={"/category/all"}>
                    <button className='flex items-center gap-1.5 p-2 border-0 text-secondary hover:text-primary'>Show all Jobs <RiArrowRightWideFill /></button>
                </Link>
            </div>
            <div className='max-w-360 mx-auto card'>
                {
                featuredJob.map(job => <Featuredjob key={job._id} job={job}></Featuredjob>)
            }
            </div>
            
        </div>
            }
        </>
    );
};

export default Featuredjobs;