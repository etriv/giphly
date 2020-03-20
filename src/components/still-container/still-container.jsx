import React, { useState, useEffect } from 'react';
import './still-container.scss';

function StillContainer({ gif, id, ...otherProps }) {
    const [loadingImage, setLoadingImage] = useState(true);
    let stillStyle;

    useEffect(() => {
        setLoadingImage(true);
        preloadImage(gif.stillUrl);

        function preloadImage(src) {
            var img = new Image();
            img.onload = () => { setLoadingImage(false) };
            img.src = src;
        }
    }, [gif.stillUrl]);

    if (!loadingImage) {
        stillStyle = {
            backgroundImage: `url(${gif.stillUrl})`
        };
    }
    else {
        stillStyle = {
            backgroundColor: '#DCDCDC'
        };
    }

    return (
        <div className="still-container"
            style={stillStyle}
            id={id}
            {...otherProps}></div>
    );
}

export default StillContainer;