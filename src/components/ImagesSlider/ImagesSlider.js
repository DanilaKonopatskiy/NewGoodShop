import React, { useEffect, useState } from 'react';

import './styles.css';

export const ImagesSlider = ({ images, delay = 3000, initialActive = 0 }) => {
    const [activeSlide, setActiveSlide] = useState(initialActive);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => prev + 1);
        }, delay);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (activeSlide >= images.length) {
        setActiveSlide(0);
    }

    const styles = {
        transform: `translateX(-${activeSlide * (100 / images.length)}%)`,
        width: `${images.length * 100}%`,
    };

    return (
        <div className="slider-wrapper">
            <div className="slider" style={styles}>
                {
                    images.map(({ id, src, title, text }) => {
                        return (
                            <div className="slide" key={id}>
                                <img src={src} />
                                <p className='slider-info'>
                                    <span className='title'>{`<<${title}>>`}</span>
                                    <span className='text'>{text}</span>
                                </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};