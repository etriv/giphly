import React, { useState, useEffect } from 'react';
import './gallery.scss';
import PageNav from '../page-nav/page-nav';

function Gallery({ gifs, totalGifsCount, onImageClick, fetchMoreGifs }) {
    const [curPage, setCurPage] = useState(1);
    const gifsPerPage = 12;

    function onPageChange(newPage) {
        setCurPage(newPage);
    }

    useEffect(() => {
        // Fetch more gifs when the gallery is about to run out of gifs to display
        const pagesBeforeLimit = Math.ceil(gifs.length / gifsPerPage) - curPage;
        // console.log('Pages before limit', pagesBeforeLimit);

        if (pagesBeforeLimit <= 1) {
            fetchMoreGifs();
        }
    });

    // function onImageLoaded() {
    //     setLoadingImage(false);
    // }

    // function preloadImage(src) {
    //     var img = new Image();
    //     img.onload = () => { this.onImageLoaded() };
    //     img.src = src;
    // }

    return (
        <div className="gallery">
            <PageNav curPage={curPage}
                totalPages={Math.ceil(totalGifsCount / gifsPerPage)}
                onPageChange={onPageChange} />
            <div className="gallery-grid">
                {gifs.length > 0 ?
                    gifs.slice((curPage - 1) * gifsPerPage, (curPage - 1) * gifsPerPage + gifsPerPage)
                        .map((gif, index) =>
                            <div className="gif-container"
                                style={{
                                    backgroundImage: `url(${gif.stillUrl})`
                                }}
                                id={index + ((curPage - 1) * gifsPerPage)} key={index}
                                onClick={onImageClick}></div>
                        )
                    : null}
            </div>
            <PageNav curPage={curPage}
                totalPages={Math.ceil(totalGifsCount / gifsPerPage)}
                onPageChange={onPageChange} />
        </div>
    );
}

export default Gallery;