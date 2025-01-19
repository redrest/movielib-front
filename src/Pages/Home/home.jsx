import React, {useEffect, useState} from 'react';
import cl from './home.module.css';
import Slider from "../../Components/UI/Slider Component/Slider";
import { Link } from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_MOVIES} from "../../Query/queryMovies";
import Loader from "../../Components/Loader";
import {GET_ALL_DIRECTORS} from "../../Query/queryDirectors";
import {GET_ALL_GENRES} from "../../Query/queryGenres";

const Home = () => {
    const [Directors, setDirectors] = useState([]);
    const [Genres, setGenres] = useState([]);
    const [Movies, setMovies] = useState([]);
    const {data: dataMovies, loading: loadingMovies, error: errorMovies} = useQuery(GET_ALL_MOVIES);
    const {data: dataDirectors, loading: loadingDirectors, error: errorDirectors} = useQuery(GET_ALL_DIRECTORS);
    const {data: dataGenres, loading: loadingGenres, error: errorGenres} = useQuery(GET_ALL_GENRES);

    useEffect(() => {
        const fetchMovies = async () => {
            if(!loadingMovies){
                setMovies(dataMovies.getAllMovies);
            }
            if(loadingMovies) return <Loader/>
            if(errorMovies) return console.log(errorMovies)
        };
        const fetchDirectors = async () => {
            if(!loadingDirectors){
                setDirectors(dataDirectors.getAllDirectors);
            }
            if(loadingDirectors) return <Loader/>
            if(errorDirectors) return console.log(errorDirectors)
        };
        const fetchGenres = async () => {
            if(!loadingGenres){
                setGenres(dataGenres.getAllGenres);
            }
            if(loadingGenres) return <Loader/>
            if(errorGenres) return console.log(errorGenres)
        };
        fetchMovies();
        fetchDirectors();
        fetchGenres();

    }, [dataMovies, dataDirectors, dataGenres, loadingMovies, loadingDirectors, loadingGenres, errorMovies, errorDirectors, errorGenres]);

    return (
        <>
            <div className={cl.container}>
                <div className={cl.title}>
                    <h1>Фильмы</h1>
                    <Link to="/movies">Список фильмов ></Link>
                </div>
                <Slider items={Movies} type="movie"/>
                <div className={cl.title}>
                    <h1>Режиссеры</h1>
                    <Link to="/directors">Список режиссеров ></Link>
                </div>
                <Slider items={Directors} type="director"/>
                <div className={cl.title}>
                    <h1>Жанры</h1>
                    <Link to="/genres">Список жанров ></Link>
                </div>
                <Slider items={Genres} type="genre"/>
            </div>
        </>
    );
};

export default Home;
