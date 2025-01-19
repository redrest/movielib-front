import React from 'react';
import cl from "./cards.module.css";
import {Link} from "react-router-dom";

const MovieCard = ({card, ignore}) => {
    return (
        <div className={cl.card}>
            <div className={cl.poster}>
                <img src={card.poster} alt={card.title}/>
            </div>
            <div className={cl.content}>
                <div className={cl.information}>
                    <h1>{card.title}</h1>
                    <div className={cl.year_rating}>
                        <span>Год:&nbsp; <span>{card.year}</span></span>
                        <span>Рейтинг:&nbsp; <span>{card.rating}</span></span>
                    </div>
                    <span>Жанр:&nbsp;
                        {card.genres.map((genre, index) => (
                            <React.Fragment key={index}>
                                <Link to={`/genres/${genre.genreEn.toLowerCase()}`}>
                                    {genre.genre}
                                </Link>
                                {index < card.genres.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </span>
                    {!ignore && (
                        <span>Режиссер:&nbsp;
                            {card.director.map((director) => (
                            <Link to={`/directors/${director.fullNameEn.toLowerCase()}`}>
                                {director.fullName}
                            </Link>
                            ))}
                        </span>
                    )}
                </div>
                <Link className={cl.link} to={`/movies/${card.titleEn.toLowerCase()}`}>
                    <img src={`${process.env.PUBLIC_URL}/Images/-arrow-right.svg`} alt="arrow-right"/>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;