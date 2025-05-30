import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedTokenProps {
    children: React.ReactNode;
}

const ProtectedToken: React.FC<ProtectedTokenProps> = ({ children }) => {
    
    const token = localStorage.getItem("token");

    const tokenId = token ? JSON.parse(token).tokenId : null

    if (!tokenId) {
        return <Navigate to="/login" replace />;
    }


    return children;
};

export default ProtectedToken;