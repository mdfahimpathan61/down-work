import React, { use } from 'react';
import Featuredjob from './Featuredjob';
import { RiArrowRightWideFill } from 'react-icons/ri';
import { Link } from 'react-router';

const allJobPromis = fetch('/jobs.json').then(res => res.json())
const Featuredjobs = () => {
    const allJobsData = use(allJobPromis)
    //console.log(allJobsData)
    const featuredJob = allJobsData.filter( jobs => jobs.featured == true)
    console.log(featuredJob)
    return (
        <div className='bg-gray-100 py-20'>
             <h3 className='text-xl sm:text-3xl my-4  font-bold text-center'>Featured Jobs</h3>
            <div className='flex justify-end max-w-360 mx-auto items-center px-8'>
               
                <Link to={"/jobs/all"}>
                    <button className='flex items-center gap-1.5 p-2 border-0 text-secondary hover:text-primary'>Show all Jobs <RiArrowRightWideFill /></button>
                </Link>
            </div>
            {
                featuredJob.map(job => <Featuredjob key={job.id} job={job}></Featuredjob>)
            }
            
        </div>
    );
};

export default Featuredjobs;