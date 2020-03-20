import React, { useState, useEffect } from 'react';
import './gallery.scss';
import PageNav from '../page-nav/page-nav';
import StillContainer from '../still-container/still-container';

function Gallery({ gifs, totalGifsCount, onImageClick, fetchMoreGifs }) {
    const [curPage, setCurPage] = useState(1);
    const [fetchingMoreGifs, setFetchingMoreGifs] = useState(false);
    const gifsPerPage = 12;

    function onPageChange(newPage) {
        setCurPage(newPage);
    }

    useEffect(() => {
        // Fetch more gifs when the gallery is about to run out of gifs to display
        const pagesBeforeLimit = Math.ceil(gifs.length / gifsPerPage) - curPage;

        if (pagesBeforeLimit <= 1 && !fetchingMoreGifs) {
            setFetchingMoreGifs(true);
            fetchMoreGifs()
                .then(() => setFetchingMoreGifs(false));
        }
    }, [gifs.length, curPage, fetchingMoreGifs, fetchMoreGifs]);

    return (
        <div className="gallery">
            <PageNav curPage={curPage}
                totalPages={Math.ceil(totalGifsCount / gifsPerPage)}
                onPageChange={onPageChange} />
            <div className="gallery-grid">
                {gifs.length > 0 ?
                    gifs.slice((curPage - 1) * gifsPerPage, (curPage - 1) * gifsPerPage + gifsPerPage)
                        .map((gif, index) =>
                            <StillContainer gif={gif}
                            id={index + ((curPage - 1) * gifsPerPage)}
                            key={index}
                            onClick={onImageClick} />
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