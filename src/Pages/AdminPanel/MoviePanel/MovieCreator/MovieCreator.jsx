import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../../../../Query/queryMovies";
import cl from "./MovieCreator.module.css";

const MovieCreator = ({ onMovieCreated }) => {
    const [createMovie] = useMutation(CREATE_MOVIE);
    const [newMovieData, setNewMovieData] = useState({
        title: "",
        titleEn: "",
        year: "",
        rating: "",
        genres: [],
        director: [],
        description: "",
        poster: ""
    });

    const handleInputChange = (field, value) => {
        setNewMovieData((prev) => {
            if (field === "genres") {
                return {
                    ...prev,
                    genres: value
                        .split(",")
                        .map((genre) => ({ genre: genre.trim() })),
                };
            }
            if (field === "director") {
                return {
                    ...prev,
                    director: value
                        .split(",")
                        .map((name) => ({ fullName: name.trim() })),
                };
            }
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://90.156.171.177:5000/uploads", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const fileName = result.file.filename;
                setNewMovieData((prev) => ({ ...prev, poster: `/${fileName}` }));
            } else {
                console.error("Ошибка загрузки файла");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };


    const handleCreateMovie = async () => {
        try {
            const { title, titleEn, year, rating, genres, director, description, poster } = newMovieData;
            await createMovie({
                variables: {
                    title,
                    titleEn,
                    year: parseInt(year, 10),
                    rating: parseFloat(rating),
                    genres,
                    director,
                    description,
                    poster,
                },
            });

            onMovieCreated(newMovieData);

            setNewMovieData({
                title: "",
                titleEn: "",
                year: "",
                rating: "",
                genres: [],
                director: [],
                description: "",
                poster: ""
            });
        } catch (err) {
            console.error("Ошибка при создании фильма:", err);
        }
    };

    return (
        <div className={cl.movieCreator}>
            <div className={cl.content}>
                <input
                    type="text"
                    placeholder="Название"
                    value={newMovieData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Название на английском"
                    value={newMovieData.titleEn}
                    onChange={(e) => handleInputChange("titleEn", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Режиссер (через запятую)"
                    value={newMovieData.director.map((d) => d.fullName).join(", ")}
                    onChange={(e) => handleInputChange("director", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Жанры (через запятую)"
                    value={newMovieData.genres.map((g) => g.genre).join(", ")}
                    onChange={(e) => handleInputChange("genres", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Год"
                    value={newMovieData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                />
                <input
                    type="number"
                    step="0.1"
                    placeholder="Рейтинг"
                    value={newMovieData.rating}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={newMovieData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleCreateMovie}>Добавить фильм</button>
            </div>
        </div>
    );
};

export default MovieCreator;
