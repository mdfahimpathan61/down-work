import React, { use } from 'react';
import Featuredjob from './Featuredjob';
import { RiArrowRightWideFill } from 'react-icons/ri';

const allJobPromis = fetch('/jobs.json').then(res => res.json())
const Featuredjobs = () => {
    const allJobsData = use(allJobPromis)
    //console.log(allJobsData)
    const featuredJob = allJobsData.filter( jobs => jobs.featured == true)
    console.log(featuredJob)
    return (
        <div className='bg-gray-100 py-20'>
            <div className='flex justify-between max-w-360 mx-auto items-center px-8'>
                <h3 className='text-xl sm:text-2xl font-bold'>Featured Jobs</h3>
                <button className='flex items-center gap-1.5 p-2 border-0 text-secondary hover:text-primary'>Show all Jobs <RiArrowRightWideFill /></button>
            </div>
            {
                featuredJob.map(job => <Featuredjob key={job.id} job={job}></Featuredjob>)
            }
            
        </div>
    );
};

export default Featuredjobs;