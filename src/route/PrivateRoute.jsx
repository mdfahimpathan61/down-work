import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {activeUser} = useContext(AuthContext)
    //const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    if(activeUser){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
    }
    
};

export default PrivateRoute;