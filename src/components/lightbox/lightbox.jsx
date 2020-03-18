import React, { useState, useEffect } from 'react';
import './lightbox.scss';

function Lightbox({ gifs, curGifId, onCloseClick }) {
    const [gifClasses, setGifClasses] = useState('focus-gif');

    console.log('Rendering gif:', curGifId);

    function onMouseClick(e) {
        if (e.target.id === 'stage') {
            onCloseClick();
        }
    }

    useEffect(() => {
        setGifClasses((prev) => prev + ' original-view');
    }, []);

    return (
        <div className="lightbox" onClick={onMouseClick}>
            <div className="overlay" onClick={onCloseClick} />
            <div id="stage" className="stage">
                <img id="gif-image" className={gifClasses} src={gifs[curGifId].gifUrl} alt="animated gif" />
            </div>
        </div>
    );
}

export default Lightbox;