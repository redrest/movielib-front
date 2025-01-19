import React, {useState, useEffect} from 'react';
import { useMutation, useQuery } from "@apollo/client";
import {GET_ALL_GENRES, UPDATE_GENRE, DELETE_GENRE} from "../../../../Query/queryGenres";
import Loader from "../../../../Components/Loader";
import GenreCreator from "../GenreCreator/GenreCreator";
import cl from './GenreEditor.module.css';
import BreadCrumb from "../../../../Components/UI/Breadcrumb/breadCrumb";

const GenreEditor = () => {
    const [genres, setGenres] = useState([]);
    const {data, loading, error, refetch} = useQuery(GET_ALL_GENRES);
    const [updateGenre] = useMutation(UPDATE_GENRE);
    const [deleteGenre] = useMutation(DELETE_GENRE);
    const [isEditing, setIsEditing] = useState(null);
    const [tempData, setTempData] = useState({});
    const [showCreateGenre, setShowCreateGenre] = useState(false);

    useEffect(() => {
        if(!loading && data) {
            setGenres(data.getAllGenres);
        }
    }, [data, loading]);
    if(loading) return <Loader/>;
    if(error) return console.log(error);

    const handleEdit = (genre) => {
        setIsEditing(genre._id);
        setTempData({...genre});
    }

    const handleCancelEdit = () => {
        setIsEditing(null);
        setTempData({});
    }

    const handleInputChange = (field, value) => {
        setTempData((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        })
    }

    const handleSave = async () => {
        try {
            const {_id, genre, genreEn} = tempData;
            await updateGenre({
                variables: {
                    _id,
                    genre,
                    genreEn,
                },
            });
            setGenres((prev)=>
                prev.map((genre) =>
                  genre._id === _id ? {...tempData} : genre
                ),

            );
            setIsEditing(null);
            setTempData({});
            await refetch();
        } catch (e) {
            console.log("Ошибка при сохранении данных", e);
        }
    }

    const handleDelete = async (_id) => {
        try {
            await deleteGenre({variables: {_id}});
            setGenres((prev) => prev.filter((genre) => genre._id !== _id));
            await refetch();
        } catch (e) {
            console.log("Ошибка при удалении жанра", e);
        }
    }

    const handleCreatedGenre = async (newGenre) => {
        setGenres((prev) => [...prev, newGenre]);
        setShowCreateGenre(false);
        await refetch();
    }

    return (
        <div className={cl.genres}>
            <BreadCrumb pageTitle={"Жанры"}/>
            <h2>Страница для редактирования жанров</h2>
            <button onClick={() => setShowCreateGenre(true)}>Новый жанр</button>
            {showCreateGenre &&
                <>
                    <button onClick={() => setShowCreateGenre(false)}>Отмена</button>
                    <GenreCreator onGenreCreated={handleCreatedGenre}/>
                </>
            }
            <div className={cl.flexContainer}>
                {genres.map((genre) => (
                    <div key={genre._id} className={cl.genreCard}>
                        <div>
                            <div>
                                <label>Название жанра</label>
                                <input
                                    type="text"
                                    value={isEditing === genre._id ? tempData.genre : genre.genre}
                                    disabled={isEditing !== genre._id}
                                    onChange={(e) => handleInputChange("genre", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Название на английском</label>
                                <input
                                    type="text"
                                    value={isEditing === genre._id ? tempData.genreEn : genre.genreEn}
                                    disabled={isEditing !== genre._id}
                                    onChange={(e) => handleInputChange("genreEn", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cl.genreActions}>
                            {isEditing === genre._id ? (
                                <>
                                    <button onClick={handleSave}>Сохранить</button>
                                    <button onClick={handleCancelEdit}>Отменить</button>
                                </>
                            ) : (
                                <button onClick={() => handleEdit(genre)}>Редактировать</button>
                            )}
                            <button onClick={() => handleDelete(genre._id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreEditor;
