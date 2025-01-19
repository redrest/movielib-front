import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const GitAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const name = urlParams.get('name');

        if (token && name) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', name);

            window.dispatchEvent(new Event('loginStatusChanged'));

            navigate('/');
        } else {
            console.error('No token or username found in URL');
        }
    }, [navigate]);
    const handleGitHubLogin = () => {
        localStorage.clear();
        window.location.href = 'http://90.156.171.177:5000/auth/github';
    };
    return (
        <div style={{ width:'100%', textAlign:'center'}}>
            <button type="button"
                onClick={handleGitHubLogin}
            >
                Вход через GitHub
            </button>
        </div>
    );
};

export default GitAuth;
