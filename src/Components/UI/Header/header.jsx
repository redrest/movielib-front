import React, {useState, useEffect} from 'react';
import cl from './header.module.css';
import { Link } from 'react-router-dom';
import checkAdminRole from "../../checkAdminRole";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.clear();
    };

    useEffect(() => {
        const handleLoginStatusChange = async () => {
            const tokenExists = !!localStorage.getItem('token');
            setIsLoggedIn(tokenExists);
            if (tokenExists) {
                const adminStatus = await checkAdminRole();
                setIsAdmin(adminStatus);
            } else {
                setIsAdmin(false);
            }
        };

        window.addEventListener('loginStatusChanged', handleLoginStatusChange);
        handleLoginStatusChange();
        return () => {
            window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
        };
    }, [isLoggedIn]);

    useEffect(()=> {
        const fetchAdminRole = async () => {
            const checkRole = await checkAdminRole();
            setIsAdmin(checkRole);
        };
        fetchAdminRole();
    },[]);

    return (
        <div className={cl.header}>
            <header className={cl.header__container}>
                <div className={cl.header__logo}>
                    <a href='/'>
                        <img src={`${process.env.PUBLIC_URL}/Images/Logo.png`} alt="logo"/>
                    </a>
                    <a href='/'>MovieLib</a>
                </div>
                <ul className={cl.header__nav}>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/movies">Фильмы</Link></li>
                    <li><Link to="/directors">Режиссеры</Link></li>
                    <li><Link to="/genres">Жанры</Link></li>
                    {isAdmin && isLoggedIn &&
                        <li><Link to='/admin' className={cl.toAdmin}>Панель админа</Link></li>
                    }
                    {isLoggedIn ? (
                        <li><Link to='/' onClick={handleLogout} className={cl.log_in_out}>Выход</Link></li>
                    ) : (
                        <li><Link to='/auth' className={cl.log_in_out}>Вход</Link></li>
                    )}

                </ul>

            </header>
        </div>
    );
};

export default Header;
