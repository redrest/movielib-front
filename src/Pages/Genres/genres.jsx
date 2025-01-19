import React, {useEffect, useState} from 'react';
import cl from './genres.module.css';
import BreadCrumb from "../../Components/UI/Breadcrumb/breadCrumb";
import ListOfCards from "../../Components/UI/ListOfCards/listOfCards";
import {useQuery} from "@apollo/client";
import {GET_ALL_GENRES} from "../../Query/queryGenres";
import Loader from "../../Components/Loader";


const Genres = () => {
    const [Genre, setGenre] = useState([]);
    const {data: dataGenres, loading: loadingGenres, error: errorGenres} = useQuery(GET_ALL_GENRES);

    useEffect(() => {
        const fetchGenres = async () => {
            if(!loadingGenres){
                setGenre(dataGenres.getAllGenres);
            }
            if(loadingGenres) return <Loader/>
            if(errorGenres) return console.log(errorGenres)
        };
        fetchGenres();
    }, [dataGenres, loadingGenres]);

    return (
        <div className={cl.genres}>
            <BreadCrumb pageTitle={"Жанры"}/>
            <h1 className={cl.title}>Жанры</h1>
            <div className={cl.list}>
                <ListOfCards props={Genre} type="genre"/>
            </div>
        </div>

    );
};

export default Genres;
