import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import "./Slider.css";

export default function Dots() {
    const { slidesCount, goToSlide, slideNumber } = useContext(SliderContext);

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < slidesCount; i++) {
            dots.push(
                <div
                    key={`dot-${i}`}
                    className={`dot ${slideNumber === i ? "selected" : ""}`}
                    onClick={() => goToSlide(i)}
                />
            );
        }
        return dots;
    };

    return <div className="dots">{renderDots()}</div>;
}