import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const context = use(AuthContext)
    return context
};

export default useAuth;