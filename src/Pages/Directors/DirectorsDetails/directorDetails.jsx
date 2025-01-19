import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import cl from './directorDetails.module.css';
import BreadCrumb from "../../../Components/UI/Breadcrumb/breadCrumb";
import MovieCard from "../../../Components/UI/Cards/movieCard";
import {useQuery} from "@apollo/client";
import {GET_DIRECTOR_BY_NAME} from "../../../Query/queryDirectors";
import {GET_MOVIES_BY_DIRECTOR} from "../../../Query/queryMovies";
import Loader from "../../../Components/Loader";

const DirectorDetails = () => {
    const [Director, setDirector] = useState([]);
    const [Movies, setMovies] = useState([]);
    const { fullNameEn } = useParams();

    const {data: dataDirector, loading: loadingDirector, error: errorDirector} = useQuery(GET_DIRECTOR_BY_NAME, {
        variables: { fullNameEn: fullNameEn }
    });

    const {data: dataMovies, loading: loadingMovies, error: errorMovies} = useQuery(GET_MOVIES_BY_DIRECTOR, {
        variables: {fullNameEn: fullNameEn}
    });

    useEffect(() => {
        const fetchDirector = async () => {
            if (!loadingDirector) {
                setDirector(dataDirector.getDirectorByName);
            }
            if (loadingDirector) return <Loader/>
            if (errorDirector) return console.log(errorDirector)
        };
        const fetchMovies = async () => {
            if (!loadingMovies) {
                setMovies(dataMovies.getMoviesByDirector);
            }
            if (loadingMovies) return <Loader/>
            if (errorMovies) return console.log(errorMovies)
        };
        fetchDirector();
        fetchMovies();
    }, [dataDirector, dataMovies, loadingDirector, loadingMovies, errorDirector, errorMovies]);


    return (
        <div className={cl.details_director}>
            <BreadCrumb pageTitle={Director.fullName}/>
            <div className={cl.card}>
                <div className={cl.poster}>
                    <img src={Director.poster} alt={Director.fullName}/>
                </div>
                <div className={cl.content}>
                    <div className={cl.information}>
                        <h1>{Director.fullName}</h1>
                        <div className={cl.fullName}>
                            <span>{Director.fullNameEn}</span>
                        </div>
                        <span>Год рождения:&nbsp; <span>{Director.dateOfBirth}</span></span>
                        <span>Место рождения:&nbsp; <span>{Director.placeOfBirth}</span></span>
                        <span>Карьера:&nbsp;
                            <span>
                                {Director.career ? (
                                    Director.career.join(', ')
                                ) : null}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cl.director_movies}>
                <h1>Фильмы режиссера</h1>
                <div className={cl.movie_list}>
                    {Movies.map((movie) => (
                        <MovieCard key={movie._id} card={movie} ignore={true}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DirectorDetails;
