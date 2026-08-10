import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import Job from '../Component/Job';

const CategoriesJobs = () => {
    const [filteredJobs, setFilteredJobs] =useState([])

    const {id} = useParams()
    const allJobsData = useLoaderData()
    console.log(id, allJobsData)

    
    useEffect(() => {
        if(id == "all"){
        setFilteredJobs(allJobsData)
    }
    else{
        const categoryJobs = allJobsData.filter(job => job.category_id == id)
        setFilteredJobs(categoryJobs)
    }
    },[filteredJobs])

    return (
        <div>

            {
                filteredJobs.map(job => <Job key={job.id} job={job}></Job>)
            }
            
        </div>
    );
};

export default CategoriesJobs;