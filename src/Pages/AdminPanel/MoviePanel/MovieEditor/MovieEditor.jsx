import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_MOVIES, UPDATE_MOVIE, DELETE_MOVIE } from "../../../../Query/queryMovies";
import Loader from "../../../../Components/Loader";
import cl from "./MovieEditor.module.css";
import MovieCreator from "../MovieCreator/MovieCreator";
import BreadCrumb from "../../../../Components/UI/Breadcrumb/breadCrumb";

const MovieEditor = () => {
    const [movies, setMovies] = useState([]);
    const { data, loading, error , refetch} = useQuery(GET_ALL_MOVIES);
    const [updateMovie] = useMutation(UPDATE_MOVIE);
    const [deleteMovie] = useMutation(DELETE_MOVIE);
    const [editingMovieTitle, setEditingMovieTitle] = useState(null);
    const [tempMovieData, setTempMovieData] = useState({});
    const [showMovieCreator, setShowMovieCreator] = useState(false);

    useEffect(() => {
        if (!loading && data) {
            setMovies(data.getAllMovies);
        }
    }, [data, loading]);

    if (loading) return <Loader />;
    if (error) return console.log(error);

    const handleEditClick = (movie) => {
        setEditingMovieTitle(movie._id);
        setTempMovieData({ ...movie });
    };

    const handleCancelEdit = () => {
        setTempMovieData({});
        setEditingMovieTitle(null);
    };

    const handleInputChange = (field, value) => {
        setTempMovieData((prev) => {
            if (field === 'genres') {
                return {
                    ...prev,
                    genres: value
                        .split(',')
                        .map((genreName) => ({ genre: genreName.trim() }))
                };
            }
            if (field === 'director') {
                return {
                    ...prev,
                    director: value
                        .split(',')
                        .map((name) => ({ fullName: name.trim() }))
                };
            }
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSaveClick = async () => {
        try {
            const { _id, title, titleEn, year, rating, genres, director, description, poster } = tempMovieData;
            const posterFilename = poster.split('/').pop();
            await updateMovie({
                variables: {
                    _id,
                    title,
                    titleEn,
                    year: parseInt(year, 10),
                    rating: parseFloat(rating),
                    genres: genres.map((g) => ({ genre: g.genre })),
                    director: director.map((d) => ({ fullName: d.fullName })),
                    description,
                    poster: posterFilename,
                },
            });
            setMovies((prev) =>
                prev.map((movie) =>
                    movie._id === _id ? { ...tempMovieData } : movie
                )
            );
            setEditingMovieTitle(null);
            setTempMovieData({});
            await refetch();
        } catch (err) {
            console.error("Ошибка при сохранении данных:", err);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/uploads', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setTempMovieData((prev) => ({ ...prev, poster: `/uploads/${result.file.filename}` }));
            } else {
                console.error('Ошибка загрузки файла');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    const handleDelete = async (_id) => {
        try {
            await deleteMovie({ variables: { _id } });
            setMovies((prev) => prev.filter((movie) => movie._id !== _id));
            await refetch();
        } catch (err) {
            console.error("Ошибка при удалении фильма:", err);
        }
    };

    const handleMovieCreated = async (newMovie) => {
        setMovies((prev) => [...prev, newMovie]);
        setShowMovieCreator(false);
        await refetch();
    };

    return (
        <div className={cl.movies}>
            <BreadCrumb pageTitle={"Фильмы"}/>
            <h2>Страница для добавления/редактирования фильмов</h2>
            <button onClick={() => setShowMovieCreator(true)}>Новый фильм</button>
            {showMovieCreator && (
                <>
                    <button onClick={() => setShowMovieCreator(false)}>Отмена</button>
                    <MovieCreator onMovieCreated={handleMovieCreated}/>
                </>
            )}
            <div className={cl.flexContainer}>
                {movies.map((movie) => (
                    <div key={movie._id} className={cl.movieCard}>
                        <div className={cl.moviePoster}>
                            {editingMovieTitle === movie._id ? (
                                <div>
                                    <img
                                        style={{width: '200px', height: '300px'}}
                                        src={tempMovieData.poster || movie.poster}
                                        alt={movie.title}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <img
                                    style={{width: '200px', height: '300px'}}
                                    src={movie.poster}
                                    alt={movie.title}
                                />
                            )}
                        </div>
                        <div >
                            <div>
                                <label>Название</label>
                                <input
                                    type="text"
                                    value={editingMovieTitle === movie._id ? tempMovieData.title : movie.title}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Название на английском</label>
                                <input
                                    type="text"
                                    value={editingMovieTitle === movie._id ? tempMovieData.titleEn : movie.titleEn}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('titleEn', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Режиссер</label>
                                <input
                                    type="text"
                                    value={editingMovieTitle === movie._id
                                        ? tempMovieData.director.map((d) => d.fullName).join(', ')
                                        : movie.director.map((d) => d.fullName).join(', ')}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('director', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Жанры</label>
                                <input
                                    type="text"
                                    value={editingMovieTitle === movie._id
                                        ? tempMovieData.genres.map((g) => g.genre).join(', ')
                                        : movie.genres.map((g) => g.genre).join(', ')}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('genres', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Год</label>
                                <input
                                    type="number"
                                    value={editingMovieTitle === movie._id ? tempMovieData.year : movie.year}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('year', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Описание</label>
                                <textarea
                                    value={editingMovieTitle === movie._id ? tempMovieData.description : movie.description}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Рейтинг</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={editingMovieTitle === movie._id ? tempMovieData.rating : movie.rating}
                                    disabled={editingMovieTitle !== movie._id}
                                    onChange={(e) => handleInputChange('rating', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cl.movieActions}>
                            {editingMovieTitle === movie._id ? (
                                <>
                                    <button onClick={handleSaveClick}>Сохранить</button>
                                    <button onClick={handleCancelEdit}>Отменить</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(movie)}>Редактировать</button>
                            )}
                            <button onClick={() => handleDelete(movie._id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieEditor;
