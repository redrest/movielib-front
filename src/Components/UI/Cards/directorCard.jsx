import React from 'react';
import cl from "./cards.module.css";
import {Link} from "react-router-dom";

const DirectorCard = ({card}) => {
    return (
        <div className={cl.card}>
            <div className={cl.poster}>
                <img src={card.poster} alt={card.fullName}/>
            </div>
            <div className={cl.content}>
                <div className={cl.information}>
                    <h1>{card.fullName}</h1>
                    <span>Год рождения:&nbsp; <span>{card.dateOfBirth}</span></span>
                    <span>Место рождения:&nbsp; <span>{card.placeOfBirth}</span></span>
                    <span>Карьера:&nbsp;
                        <span>{card.career.join(', ')}</span>
                    </span>
                </div>
                <Link className={cl.link} to={`/directors/${card.fullNameEn.toLowerCase()}`}>
                    <img src={`${process.env.PUBLIC_URL}/Images/-arrow-right.svg`}
                         alt="arrow-right"/>
                </Link>
            </div>
        </div>
    );
};

export default DirectorCard;