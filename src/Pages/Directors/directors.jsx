import React, {useEffect} from 'react';
import cl from './directors.module.css';
import BreadCrumb from "../../Components/UI/Breadcrumb/breadCrumb";
import ListOfCards from "../../Components/UI/ListOfCards/listOfCards";
import {GET_ALL_DIRECTORS} from "../../Query/queryDirectors";
import {useQuery} from "@apollo/client";
import Loader from "../../Components/Loader";

const Directors = () => {
    const [Director, setDirector] = React.useState([]);
    const {data: dataDirectors, loading: loadingDirectors, error: errorDirectors} = useQuery(GET_ALL_DIRECTORS);

    useEffect(() => {
        const fetchDirectors = async () => {
            if(!loadingDirectors){
                setDirector(dataDirectors.getAllDirectors);
            }
            if(loadingDirectors) return <Loader/>
            if(errorDirectors) return console.log(errorDirectors)
        };
        fetchDirectors();
    }, [dataDirectors, loadingDirectors]);

    return (
        <div className={cl.directors}>
            <BreadCrumb pageTitle={"Режиссеры"}/>
            <h1 className={cl.title}>Список режиссеров</h1>
            <div className={cl.list}>
                <ListOfCards props={Director} type="director"/>
            </div>
        </div>

    );
};

export default Directors;
