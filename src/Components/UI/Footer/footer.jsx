import React from 'react';
import cl from './footer.module.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={cl.footer}>
            <div className={cl.container}>
                <div className={cl.icons}>
                    <a href="https://t.me/@redrestt"><img src={`${process.env.PUBLIC_URL}/Images/telegram.svg`} alt="telegam"/></a>
                    <a href="https://vk.com/redrest"><img src={`${process.env.PUBLIC_URL}/Images/vkontakte.svg`} alt="vkontakte"/></a>
                </div>
                <Link to="/privacy">Политика конфиденциальности</Link>
                <small>&copy; 2024 MovieLib </small>
            </div>
        </div>
    );
};

export default Footer;
