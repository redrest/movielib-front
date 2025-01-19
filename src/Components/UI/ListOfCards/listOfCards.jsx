import React from 'react';
import cl from './listOfCards.module.css';
import  MovieCard from "../Cards/movieCard";
import DirectorCard from "../Cards/directorCard";
import GenreCard from "../Cards/genreCard";


const ListOfCards = ({props, type}) => {
    return (
        <>
            {type === "movie" ? (
                <div className={cl.list_item}>
                    {props.map((movie) => (
                        <MovieCard key={movie._id} card={movie} ignore={false} />
                    ))}
                </div>
            ) : type === "director" ? (
                <div className={cl.list_item}>
                    {props.map((director) => (
                        <DirectorCard key={director._id} card={director} ignore={false} />
                    ))}
                </div>
            ) : type === "genre" ? (
                <div className={cl.list_genre}>
                    {props.map((genre) => (
                        <GenreCard key={genre._id} card={genre} ignore={false}/>
                    ))}
                </div>
            ) : null}
        </>

    );
};

    export default ListOfCards;