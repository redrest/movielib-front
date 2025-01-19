import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import SlidesList from "./SlideList";
import "./Slider.css";
export const SliderContext = createContext();

const Slider = function ({ width, height, items, type }) {
    const [slide, setSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(4);
    const [touchPosition, setTouchPosition] = useState(null);
    const [mouseDown, setMouseDown] = useState(false);

    const updateVisibleSlides = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setVisibleSlides(1);
        } else if (screenWidth <= 1024) {
            setVisibleSlides(2);
        } else if (screenWidth <= 1440) {
            setVisibleSlides(3);
        } else {
            setVisibleSlides(4);
        }
    };

    useEffect(() => {
        updateVisibleSlides();
        window.addEventListener("resize", updateVisibleSlides);

        return () => {
            window.removeEventListener("resize", updateVisibleSlides);
        };
    }, []);

    const changeSlide = (direction) => {
        const totalSlides = items.length;
        const slidesPerPage = visibleSlides;

        let newSlide = slide + direction * slidesPerPage;

        if (newSlide < 0) {
            newSlide = totalSlides - (totalSlides % slidesPerPage);
        } else if (newSlide >= totalSlides) {
            newSlide = 0;
        }

        setSlide(newSlide);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (Math.abs(direction) > 30) {
            if (direction > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
            setTouchPosition(null);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setMouseDown(true);
        setTouchPosition(e.clientX);
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (!mouseDown || touchPosition === null) {
            return;
        }

        const currentPosition = e.clientX;
        const direction = touchPosition - currentPosition;

        if (Math.abs(direction) > 30) {
            if (direction > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
            setTouchPosition(null);
        }
    };

    const handleMouseUp = (e) => {
        e.preventDefault();
        setMouseDown(false);
        setTouchPosition(null);
    };

    return (
        <div
            style={{ width, height}}
            className="slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setTouchPosition(null)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <SliderContext.Provider
                value={{
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    visibleSlides,
                    items,
                    type,
                }}
            >
                <div className="arrows">
                    <div className="arrow left" onClick={() => changeSlide(-1)}> {"<<"} </div>
                    <div className="arrow right" onClick={() => changeSlide(1)}> {">>"} </div>
                </div>
                <SlidesList />
            </SliderContext.Provider>
        </div>
    );
};

Slider.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    items: PropTypes.array.isRequired,
    type: PropTypes.oneOf(["movies", "directors"]).isRequired,
};

Slider.defaultProps = {
    width: "100%",
    height: "100%",
};

export default Slider;
