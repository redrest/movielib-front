import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import BreadCrumb from "../../../Components/UI/Breadcrumb/breadCrumb";
import cl from './genreMovies.module.css';
import '../../../Components/UI/Cards/cards.module.css'
import MovieCard from "../../../Components/UI/Cards/movieCard";
import {useQuery} from "@apollo/client";
import {GET_MOVIES_BY_GENRE} from "../../../Query/queryMovies";
import Loader from "../../../Components/Loader";
import {GET_GENRE_BY_GENRE_EN} from "../../../Query/queryGenres";

const GenreMovies = () => {
    const [Genre, setGenre] = useState([]);
    const [Movie, setMovie] = useState([]);
    const { genre } = useParams();
    const {data: dataMovies, loading: loadingMovies, error: errorMovies} = useQuery(GET_MOVIES_BY_GENRE, {
        variables: {genreEn: genre}
    });

    const { data: dataGenre, loading: loadingGenre, error: errorGenre } = useQuery(GET_GENRE_BY_GENRE_EN, {
        variables: {genreEn: genre}
    });

    useEffect(() => {
        const fetchMovies = async () => {
          if(!loadingMovies) {
              setMovie(dataMovies.getMoviesByGenre);
          }
            if (loadingMovies) return <Loader/>
            if (errorMovies) return console.log(errorMovies)
        };
        const fetchGenre = async () => {
          if(!loadingGenre) {
              setGenre(dataGenre.getGenreByGenreEn);

          }
            if (loadingGenre) return <Loader/>
            if (errorGenre) return console.log(errorGenre)
        };
        fetchMovies();
        fetchGenre();
    }, [dataMovies, loadingMovies, errorMovies, dataGenre, loadingGenre, errorGenre]);

    return (
        <>
            <div className={cl.genre_movies}>
                <BreadCrumb pageTitle={Genre.genre}/>
                <h1 className={cl.title_gnr_mv}>Список фильмов в жанре&nbsp;
                    <span>
                        {Genre.genre}
                    </span>
                </h1>
                <div className={cl.movie_list}>
                    {Movie.length > 0 ? (
                        Movie.map((movie) => (
                            <MovieCard key={movie._id} card={movie} ignore={false}/>
                        ))
                    ) : <h1 className={cl.title_gnr_mv} style={{textAlign:"center"}}>Фильмы отсутствуют</h1>}
                </div>
            </div>
        </>
    );
};

export default GenreMovies;
