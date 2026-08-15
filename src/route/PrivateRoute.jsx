import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router';
import Loading from '../Component/Loading';

const PrivateRoute = ({children}) => {
    const {activeUser ,loading} = useContext(AuthContext)
    //const navigate = useNavigate()
    const location = useLocation()
    //console.log(location)

    
    
    if(loading){
        return <Loading></Loading>
    }
    else if(activeUser){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
    }
    
};

export default PrivateRoute;