import React from 'react';
import cl from "./cards.module.css";
import {Link} from "react-router-dom";

const GenreCard = ({card}) => {
    return (
        <div className={cl.genre_card}>
            <Link to={`/genres/${card.genreEn.toLowerCase()}`}>
                {card.genre}
            </Link>
        </div>
    );
};

export default GenreCard;