import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DIRECTOR } from "../../../../Query/queryDirectors";
import cl from './DirectorCreator.module.css';

const DirectorCreator = ({ onDirectorCreated }) => {
    const [createDirector] = useMutation(CREATE_DIRECTOR);
    const [newDirectorData, setNewDirectorData] = useState({
        fullName: "",
        fullNameEn: "",
        dateOfBirth: "",
        placeOfBirth: "",
        career: "",
        poster: ""
    });

    const handleInputChange = (field, value) => {
        setNewDirectorData((prev) => {

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
            const response = await fetch("http://localhost:5000/uploads", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const fileName = result.file.filename;
                setNewDirectorData((prev) => ({ ...prev, poster: `/${fileName}` }));
            } else {
                console.error("Ошибка загрузки файла");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };


    const handleCreateDirector = async () => {
        try {
            const { fullName, fullNameEn, dateOfBirth, placeOfBirth, career, poster } = newDirectorData;
            const filtredCareer = career.split(',').map(item => item.trim()).filter(item => item);

            await createDirector({
                variables: {
                    fullName,
                    fullNameEn,
                    dateOfBirth,
                    placeOfBirth,
                    career: filtredCareer,
                    poster,
                },
            });

            onDirectorCreated(newDirectorData);

            setNewDirectorData({
                fullName: "",
                fullNameEn: "",
                dateOfBirth: "",
                placeOfBirth: "",
                career: "",
                poster: ""
            });
        } catch (err) {
            console.error("Ошибка при создании фильма:", err);
        }
    };

    return (
        <div className={cl.directorCreator}>
            <div className={cl.content}>
                <input
                    type="text"
                    placeholder="ФИО"
                    value={newDirectorData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ФИО на английском"
                    value={newDirectorData.fullNameEn}
                    onChange={(e) => handleInputChange("fullNameEn", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Карьера (через запятую)"
                    value={newDirectorData.career}
                    onChange={(e) => handleInputChange("career", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Дата рождения"
                    value={newDirectorData.year}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Место рождения"
                    value={newDirectorData.rating}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleCreateDirector}>Добавить режиссера</button>
            </div>
        </div>
    );
};

export default DirectorCreator;
