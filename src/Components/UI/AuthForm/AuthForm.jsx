import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import checkAdminRole from "../../checkAdminRole";
import cl from './AuthForm.module.css';
import GitAuth from "./GitAuth";

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/auth/login' : '/auth/registration';

        try {
            const response = await axios.post(`http://localhost:5000${url}`, { username, password });

            if (!isLogin) {
                setSuccessMessage('Пользователь успешно зарегистрирован. Для входа перейдите на страницу логина.');
                setUsername('');
                setPassword('');
            } else if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                window.dispatchEvent(new Event('loginStatusChanged'));

                const isAdmin = await checkAdminRole();
                if(isAdmin) {
                    navigate('/admin');
                } else {
                    navigate('/')
                }
            }
        } catch (error) {
            if (isLogin) {
                if (error.response && error.response.data && error.response.data.message) {
                    setSuccessMessage(error.response.data.message);
                    setUsername('');
                    setPassword('');
                } else {
                    setSuccessMessage('Произошла ошибка. Попробуйте снова.');
                }
            }
        }
    };

    return (
        <div className={cl.auth_block}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit} className={cl.form}>
                <div className={cl.field_login}>
                    <label htmlFor={cl.login_input}>Логин</label>
                    <input
                        className={cl.login_input}
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={cl.field_password}>
                    <label htmlFor={cl.password_input}>Пароль</label>
                    <input
                        className={cl.password_input}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                {isLogin && <GitAuth/>}
                {successMessage && <span className={cl.success_message}>{successMessage}</span>}
                <button type="button" onClick={() => {
                    setIsLogin(!isLogin);
                    setSuccessMessage('');
                }} className={cl.btn_reg_log}>
                    {isLogin ? 'Перейти к регистрации' : 'Перейти ко входу'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
