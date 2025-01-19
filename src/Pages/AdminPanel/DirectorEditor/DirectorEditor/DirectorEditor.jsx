import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_DIRECTORS, UPDATE_DIRECTOR, DELETE_DIRECTOR } from "../../../../Query/queryDirectors";
import Loader from "../../../../Components/Loader";
import DirectorCreator from "../DirectorCreator/DirectorCreator";
import cl from './DirectorEditor.module.css';
import BreadCrumb from "../../../../Components/UI/Breadcrumb/breadCrumb";

const DirectorEditor = () => {
    const [directors, setDirectors] = useState([]);
    const { data, loading, error , refetch} = useQuery(GET_ALL_DIRECTORS);
    const [updateDirector] = useMutation(UPDATE_DIRECTOR);
    const [deleteDirector] = useMutation(DELETE_DIRECTOR);
    const [editingDirector, setEditingDirector] = useState(null);
    const [tempData, setTempData] = useState({});
    const [showDirectorCreator, setShowDirectorCreator] = useState(false);

    useEffect(() => {
        if (!loading && data) {
            setDirectors(data.getAllDirectors);
        }
    }, [data, loading]);

    if (loading) return <Loader />;
    if (error) return console.log(error);

    const handleEditClick = (director) => {
        setEditingDirector(director._id);
        setTempData({ ...director });
    };

    const handleCancelEdit = () => {
        setTempData({});
        setEditingDirector(null);
    };

    const handleInputChange = (field, value) => {
        setTempData((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSaveClick = async () => {
        try {
            const { _id, fullName, fullNameEn, dateOfBirth, placeOfBirth, career, poster } = tempData;
            const formattedCareer = Array.isArray(career) ? career : career.split(',').map(item => item.trim()).filter(item => item);
            const posterFilename = poster.split('/').pop();
            await updateDirector({
                variables: {
                    _id,
                    fullName,
                    fullNameEn,
                    dateOfBirth,
                    placeOfBirth,
                    career: formattedCareer,
                    poster: posterFilename,
                },
            });
            setDirectors((prev) =>
                prev.map((director) =>
                    director._id === _id ? { ...tempData } : director
                )
            );
            setEditingDirector(null);
            setTempData({});
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
                setTempData((prev) => ({ ...prev, poster: `/uploads/${result.file.filename}` }));
            } else {
                console.error('Ошибка загрузки файла');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };


    const handleDelete = async (_id) => {
        try {
            await deleteDirector({ variables: { _id } });
            setDirectors((prev) => prev.filter((movie) => movie._id !== _id));
            await refetch();
        } catch (err) {
            console.error("Ошибка при удалении фильма:", err);
        }
    };

    const handleDirectorCreated = async (newDirector) => {
        setDirectors((prev) => [...prev, newDirector]);
        await refetch();
        setShowDirectorCreator(false);
    };

    return (
        <div className={cl.directors}>
            <BreadCrumb pageTitle={"Режиссеры"}/>
            <h2>Страница для добавления/редактирования режиссеров</h2>
            <button onClick={() => setShowDirectorCreator(true)}>Новый режиссер</button>
            {showDirectorCreator && (
                <>
                    <button onClick={() => setShowDirectorCreator(false)}>Отмена</button>
                    <DirectorCreator onDirectorCreated={handleDirectorCreated} />
                </>
            )}
            <div className={cl.flexContainer}>
                {directors.map((director) => (
                    <div key={director._id} className={cl.directorCard}>
                        <div className={cl.directorPoster}>
                            {editingDirector === director._id ? (
                                <div>
                                    <img
                                        style={{ width: '200px', height: '300px' }}
                                        src={tempData.poster || director.poster}
                                        alt={director.fullName}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <img
                                    style={{ width: '200px', height: '300px' }}
                                    src={director.poster}
                                    alt={director.fullName}
                                />
                            )}
                        </div>
                        <div className={cl.directorInfo}>
                            <div>
                                <label>ФИО</label>
                                <input
                                    type="text"
                                    value={editingDirector === director._id ? tempData.fullName : director.fullName}
                                    disabled={editingDirector !== director._id}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>ФИО на английском</label>
                                <input
                                    type="text"
                                    value={editingDirector === director._id ? tempData.fullNameEn : director.fullNameEn}
                                    disabled={editingDirector !== director._id}
                                    onChange={(e) => handleInputChange("fullNameEn", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Дата рождения</label>
                                <input
                                    type="text"
                                    value={editingDirector === director._id ? tempData.dateOfBirth : director.dateOfBirth}
                                    disabled={editingDirector !== director._id}
                                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Место рождения</label>
                                <input
                                    type="text"
                                    value={editingDirector === director._id ? tempData.placeOfBirth : director.placeOfBirth}
                                    disabled={editingDirector !== director._id}
                                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Карьера</label>
                                <input
                                    type="text"
                                    value={editingDirector === director._id ? tempData.career : (Array.isArray(director.career) ? director.career.join(", ") : director.career)}
                                    disabled={editingDirector !== director._id}
                                    onChange={(e) => handleInputChange("career", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cl.directorActions}>
                            {editingDirector === director._id ? (
                                <>
                                    <button onClick={handleSaveClick}>Сохранить</button>
                                    <button onClick={handleCancelEdit}>Отменить</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(director)}>Редактировать</button>
                            )}
                            <button onClick={() => handleDelete(director._id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

);
};

export default DirectorEditor;
