import React, {useEffect, useState} from 'react';
import cl from "./movieDetails.module.css";
import {Link, useParams} from "react-router-dom";
import BreadCrumb from "../../../Components/UI/Breadcrumb/breadCrumb";
import {useQuery} from "@apollo/client";
import {GET_MOVIE_BY_TITLE} from "../../../Query/queryMovies";
import Loader from "../../../Components/Loader";

const MovieDetails = () => {
    const [Movie, setMovie] = useState([]);
    const { movie } = useParams();

    const {data: dataMovies, loading: loadingMovies, error: errorMovies} = useQuery(GET_MOVIE_BY_TITLE, {
        variables: {titleEn: movie}
    });

    useEffect(() => {
        const fetchMovies = async () => {
            if(!loadingMovies){
                setMovie(dataMovies.getMovieByTitle);
            }

        };
        fetchMovies();
    }, [dataMovies]);

    if(loadingMovies) return <Loader/>
    if(errorMovies) return console.log(errorMovies)

    return (
        <div className={cl.details_movie}>
            <BreadCrumb pageTitle={Movie.title} />
            <div className={cl.card}>
                <div className={cl.poster}>
                    <img src={Movie.poster} alt={Movie.title}/>
                </div>
                <div className={cl.content}>
                    <div className={cl.information}>
                        <h1>{Movie.title}</h1>
                        <div className={cl.titleEn}>
                            <span>{Movie.titleEn}</span>
                        </div>
                        <span>Рейтинг:&nbsp; <span>{Movie.rating}</span></span>
                        <span>Год:&nbsp; <span>{Movie.year}</span></span>
                        <span>Жанр:&nbsp;
                            {Movie.genres ? (
                                Movie.genres.map((genre, index) => (
                                        <React.Fragment key={index}>
                                            <Link to={`/genres/${genre.genreEn.toLowerCase()}`}>
                                                {genre.genre}
                                            </Link>
                                            {index < Movie.genres.length - 1 && ', '}
                                        </React.Fragment>
                                    ))
                            ) : null}
                        </span>
                        <span>Режиссер:&nbsp;
                            {Movie.director ? (
                                Movie.director.map((director) => (
                                    <Link to={`/directors/${director.fullNameEn.toLowerCase()}`}>
                                        {director.fullName}
                                    </Link>
                                ))
                            ) : null}
                        </span>
                        <span>Описание фильма:&nbsp; <p>{Movie.description}</p></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;