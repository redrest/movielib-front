import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {CREATE_GENRE} from "../../../../Query/queryGenres";
import cl from './GenreCreator.module.css';

const GenreCreator = ({onGenreCreated}) => {
    const [createGenre] = useMutation(CREATE_GENRE);
    const [newGenreData, setNewGenreData] = useState({
        genre: "",
        genreEn: "",
    });

    const handleInputChange = (field, value) => {
        setNewGenreData((prev) => {
            return {
                ...prev,
                [field]: value,
            };
        })
    }

    const handleCreateGenre = async () => {
        try {
            const {genre, genreEn} = newGenreData;
            await createGenre({
                variables: {
                    genre,
                    genreEn,
                }
            });
            onGenreCreated(newGenreData);
            setNewGenreData({
                genre: "",
                genreEn: "",
            })

        } catch(e) {
            console.log("Ошибка при создании жанра", e);
        }
    }

    return (
        <div className={cl.genreCreator}>
            <div className={cl.content}>
                <input
                    type="text"
                    placeholder="Название жанра"
                    value={newGenreData.genre}
                    onChange={(e) => handleInputChange("genre", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Название на английском"
                    value={newGenreData.genreEn}
                    onChange={(e) => handleInputChange("genreEn", e.target.value)}
                />
                <button type="button" onClick={handleCreateGenre}>Добавить жанр</button>
            </div>
        </div>
    );
};

export default GenreCreator;
