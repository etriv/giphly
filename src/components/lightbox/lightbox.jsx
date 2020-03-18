import React, { useState, useEffect } from 'react';
import './lightbox.scss';

function Lightbox({ gifs, gifToView, setGifToView, onCloseClick }) {
    const [gifClasses, setGifClasses] = useState('focus-gif');

    console.log('Rendering gif:', gifToView);

    function onMouseClick(e) {
        if (e.target.id === 'stage') {
            onCloseClick();
        }
        else if (e.target.id === 'gif-image') {
            setGifToView(gifToView + 1);
            // TODO: Create new img for the new GIF (seems faster rendering)
        }
    }

    useEffect(() => {
        setGifClasses((prev) => prev + ' original-view');
    }, []);

    return (
        <div className="lightbox" onClick={onMouseClick}>
            <div className="overlay" onClick={onCloseClick} />
            <div id="stage" className="stage">
                <img id="gif-image"
                className={gifClasses}
                src={gifs[gifToView].gifUrl}
                alt="animated gif" />
            </div>
        </div>
    );
}

export default Lightbox;