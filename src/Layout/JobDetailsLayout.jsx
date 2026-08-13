import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';
import JobDetails from '../Page/JobDetails';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Component/Loading';

const JobDetailsLayout = () => {
    const {loading} = useContext(AuthContext)
    return (
        <>
        {
          loading?<Loading></Loading>:
          <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <JobDetails></JobDetails>
            </main>
            
        </div>
        }
        </>
    );
};

export default JobDetailsLayout;
