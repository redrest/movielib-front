import React from 'react';
import cl from './AdminPanel.module.css';
import {Link} from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className={cl.adminPanel}>
            <h1>Панель администратора</h1>
            <div className={cl.content}>
                <div className={cl.link}>
                    <h2>Панель фильмов</h2>
                    <Link to="/admin/movies">К фильмам</Link>
                </div>
                <div className={cl.link}>
                    <h2>Панель режиссеров</h2>
                    <Link to="/admin/directors">К режиссерам</Link>
                </div>
                <div className={cl.link}>
                    <h2>Панель жанров</h2>
                    <Link to="/admin/genres">К жанрам</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
