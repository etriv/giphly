import React, { useState } from 'react';
import './gif-container.scss';

function GifContainer({ src, className }) {
    const [gifLoading, setGifLoading] = useState(false);
    const [prevGifSrc, setPrevGifSrc] = useState(src);

    if (src !== prevGifSrc) {
        // Rerendering the entire img element for faster loading of the next gif
        setPrevGifSrc(src);
        setGifLoading(true);
        setTimeout(() => setGifLoading(false), 0);
    }

    return (
        <div id="anim-container" className={className}>
            {!gifLoading ?
                <img id="anim-gif" src={src} alt="animated gif" />
                : null}
        </div>
    );
}

export default GifContainer;