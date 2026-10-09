import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Component/Loading';
import { Navigate, Outlet } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const RoleGuard = ({children}) => {
    const { activeUser, loading,setRole } = useAuth();

    const [role, setRolee] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (loading){
            
             return;
        }
        
        if (!activeUser) {
            setRoleLoading(false);
            return;
        }

        // fetch(`http://localhost:3000/user?email=${activeUser.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setRolee(data?.role || null);
        //         setRole(data?.role)

        //         setRoleLoading(false);
        //     });

        axiosSecure.get(`/user?email=${activeUser.email}`)
        .then(result => {
            setRolee(result.data?.role || null)
            setRole(result.data?.role)
            setRoleLoading(false);
           // console.log(result.data)
        })    
    }, [activeUser]);

    if(loading){
        return <Loading></Loading>
    }
    else if (activeUser && (loading || roleLoading)) {
        return <Loading />;
    }

    

    

    if (activeUser && !role) {
        return <Navigate to="/auth/role" />;
    }

    return children;
};

export default RoleGuard;