import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminRole } from './checkAdminRole';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyRole = async () => {
            const result = await checkAdminRole();
            setIsAdmin(result);
            setLoading(false);
        };

        verifyRole();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
