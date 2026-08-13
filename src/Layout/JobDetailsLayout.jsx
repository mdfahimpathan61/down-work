import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import JobDetails from '../Page/JobDetails';

const JobDetailsLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <JobDetails></JobDetails>
            </main>
            
        </div>
    );
};

export default JobDetailsLayout;
