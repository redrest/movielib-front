import React, {useEffect} from 'react';
import cl from './movies.module.css';
import ListOfCards from "../../Components/UI/ListOfCards/listOfCards";
import BreadCrumb from "../../Components/UI/Breadcrumb/breadCrumb";
import {GET_ALL_MOVIES} from "../../Query/queryMovies";
import {useQuery} from "@apollo/client";
import Loader from "../../Components/Loader";

const Movies = () => {
    const [Movie, setMovie] = React.useState([]);
    const {data, loading, error} = useQuery(GET_ALL_MOVIES);

    useEffect(() => {
        if(!loading){
            setMovie(data.getAllMovies);
        }
    }, [data, loading]);

    if(loading) return <Loader/>
    if(error) return console.log(error)

    return (
        <div className={cl.movies}>
            <BreadCrumb pageTitle={"Фильмы"} />
            <h1 className={cl.title}>Список фильмов</h1>
            <div className={cl.list}>
                <ListOfCards props={Movie} type="movie"/>
            </div>
        </div>
    );
};

export default Movies;
