import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';


const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    // const location = useLocation();
    // console.log(location);

    if (loading) {
        return <p>Loading...</p>
    }

    if (user) {
        // <Navigate state={location.pathname} to='/'></Navigate>
        return children;
    }
    return (
        <Navigate to='/login'></Navigate>
    );
};

export default PrivateRouter;