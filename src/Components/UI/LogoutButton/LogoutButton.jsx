import React from 'react';
import { Navigate } from 'react-router-dom';

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаляем токен из localStorage
        return <Navigate to='/auth'/> // Перенаправляем на страницу входа
    };

    return (
        <button onClick={handleLogout}>
            Выйти
        </button>
    );
};

export default LogoutButton;
