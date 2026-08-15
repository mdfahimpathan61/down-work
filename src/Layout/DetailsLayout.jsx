import React, { useContext } from 'react';
import Navbar from '../Component/Navbar/Navbar';

import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Component/Loading';
import { Outlet } from 'react-router';


const DetailsLayout = () => {
    const {loading} = useContext(AuthContext)
    return (
       <>
         {
          loading ? <Loading></Loading> :
          <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            
        </div>
        }
       </>
    );
};

export default DetailsLayout;