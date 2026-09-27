import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Component/Loading';
import { Navigate, Outlet } from 'react-router';

const RoleGuard = ({children}) => {
    const { activeUser, loading } = useAuth();

    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (loading) return;
        
        if (!activeUser) {
            setRoleLoading(false);
            return;
        }

        fetch(`http://localhost:3000/user?email=${activeUser.email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data?.role || null);
                setRoleLoading(false);
            });
    }, [activeUser]);

    if (loading || roleLoading) {
        return <Loading />;
    }

    

    if (activeUser && !role) {
        return <Navigate to="/auth/role" />;
    }

    return children;
};

export default RoleGuard;