import React, { useContext } from "react";
import {SliderContext} from "./Slider";
import "./Slider.css";
import {Link} from "react-router-dom";

export default function SlidesList() {
    const { slideNumber, items, visibleSlides, type } = useContext(SliderContext);
    return (
        <div
            className="slide-list"
            style={{
                transform: `translateX(-${(slideNumber * 100) / visibleSlides}%)`,
            }}
        >
            {items.map((slide, index) => (
                <div
                    key={index}
                    className="slide"
                    style={{
                        width: `${100 / visibleSlides}%`,
                    }}
                >
                    <div className="slide-info">
                        {type === "movie" ? (
                            <Link to={`/movies/${slide.titleEn ? slide.titleEn.toLowerCase() : null}`}>
                                <img src={slide.poster} alt={slide.title} className="slide-image" />
                                <div className="slide-details">
                                    <h2 className="slide-title">{slide.title}</h2>
                                    <p className="slide-description">
                                        {slide.genres.map((genre, index) => (
                                            <span key={index}>
                                                {genre.genre}
                                                {index < slide.genres.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </Link>
                        ) : type === "director" ? (
                            <Link to={`/directors/${slide.fullNameEn ? slide.fullNameEn.toLowerCase() : null}`}>
                                <img src={slide.poster} alt={slide.title} className="slide-image" />
                                <div className="slide-details">
                                    <h2 className="slide-title">{slide.fullName}</h2>
                                    <p className="slide-description">{slide.career.join(', ')}</p>
                                </div>
                            </Link>
                        ) : type === "genre" ? (
                            <Link to={`/genres/${slide.genreEn ? slide.genreEn.toLowerCase() : null}`}>
                                <div className="slide-genre">
                                    <p>{slide.genre}</p>
                                </div>
                            </Link>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
