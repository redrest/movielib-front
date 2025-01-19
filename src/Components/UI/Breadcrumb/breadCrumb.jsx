import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './breadCrumb.module.css';

const BreadCrumb = ({ pageTitle }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const dictionary = {
        movies: 'Фильмы',
        directors: 'Режиссеры',
        genres: 'Жанры',
        admin: 'Панель админа'
    };

    return (
        <nav className={cl.navigation}>
            <ul>
                <li>
                    <Link to="/">Главная</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Получаем отображаемое имя из словаря или используем название из URL
                    const displayName = dictionary[name] || name.charAt(0).toUpperCase() + name.slice(1);

                    return isLast ? (
                        <li key={name}>
                            <span>{pageTitle}</span> {/* Динамическое название страницы */}
                        </li>
                    ) : (
                        <li key={name}>
                            <Link to={routeTo}>
                                {displayName} {/* Отображаемое имя из словаря */}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default BreadCrumb;
