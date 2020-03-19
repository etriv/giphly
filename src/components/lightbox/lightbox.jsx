import React, { useState, useEffect } from 'react';
import './lightbox.scss';
import leftArrow from '../../images/left-arrow.png';
import rightArrow from '../../images/right-arrow.png';

function Lightbox({ gifs, gifToView, setGifToView, onCloseClick, fetchMoreGifs }) {
    const [gifClasses, setGifClasses] = useState('focus-gif');

    console.log('Rendering gif:', gifToView);

    function onMouseClick(e) {
        if (e.target.id === 'stage') {
            onCloseClick();
        }
        else if (e.target.id === 'right-arrow') {
            if (gifToView < gifs.length - 1) {
                setGifToView(gifToView + 1);
                const numGifsBeforeLimit = gifs.length - (gifToView + 1);
                if (numGifsBeforeLimit <= 10) {
                    fetchMoreGifs();
                }
            }
        }
        else if (e.target.id === 'left-arrow') {
            if (gifToView > 0) {
                setGifToView(gifToView - 1);
            }
        }
    }

    useEffect(() => {
        setGifClasses((prev) => prev + ' original-view');
    }, []);

    return (
        <div className="lightbox" onClick={onMouseClick}>
            <div className="overlay" onClick={onCloseClick} />
            <div id="stage" className="stage">
                <div id="left-arrow" className="arrow"
                    style={{ backgroundImage: `url(${leftArrow})` }} />
                {gifToView < gifs.length ?
                    <GifContainer className={gifClasses}
                        src={gifs[gifToView].gifUrl} />
                    : null}
                <div id="right-arrow" className="arrow"
                    style={{ backgroundImage: `url(${rightArrow})` }} />
            </div>
        </div>
    );
}

function GifContainer({ src, className }) {
    const [gifLoading, setGifLoading] = useState(false);
    const [prevGifSrc, setPrevGifSrc] = useState(src);

    if (src !== prevGifSrc) {
        // TODO: Might be better to just remove and add a new img element
        //preloadImage(src);
        // const el = document.getElementById('anim-gif');
        // el.remove();
        setPrevGifSrc(src);
    }

    function preloadImage(src) {
        setGifLoading(true);
        var img = new Image();
        img.onload = () => { setGifLoading(false); };
        img.src = src;
    }

    return (
        <div className={className}>
            {!gifLoading ?
                <img id="anim-gif" src={src} alt="animated gif" />
                :
                <p style={{ color: 'white' }}>Loading...</p>
            }
        </div>
    );
}

export default Lightbox;