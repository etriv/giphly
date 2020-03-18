import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchGifs } from './modules/giphy-manager';

function App() {
  const [gifs, setGifs] = useState([]);
  const [totalGifsCount, setTotalGifsCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [clickedGifId, setClickedGifId] = useState(-1);

  const gifsPageLimit = 12;   // Number of gifs to display in each page
  const pagesAmount = 10;      // The number of pages to fill with gifs

  const [searchText, setSearchText] = useState('dogs');

  useEffect(onSearchClick, []); // Startup search (for development)

  useEffect(() => {
    // console.log('Number of pages:', Math.ceil(totalGifsCount / gifsPageLimit));
  });

  function onSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  function onKeyUp(e) {
    if (e.keyCode === 13) {
      onSearchClick();
    }
  }

  function onSearchClick() {
    fetchGifs(searchText, 0, gifsPageLimit * pagesAmount)
      .then(data => {
        console.log('Fetched gifs:', data);
        setCurPage(1);
        setTotalGifsCount(data.totalCount);
        setGifs(data.newGifs);

      }).catch(err => {
        console.log('Error while fetching gifs:', err);
      });
  }

  function onPageChange(newPage) {
    setCurPage(newPage);

    // If standing on the last (saved) page, fetch more gifs
    if (newPage > gifs.length / gifsPageLimit - 1) {
      fetchGifs(searchText, gifs.length, gifsPageLimit * pagesAmount)
        .then(data => {
          console.log('Fetched gifs:', data);
          setTotalGifsCount(data.totalCount);
          setGifs([...gifs, ...data.newGifs]);
        }).catch(err => {
          console.log('Error while fetching gifs:', err);
        });
    }
  }

  function onImageClick(e) {
    setClickedGifId(e.target.id);
  }

  function closeLightbox() {
    setClickedGifId(-1);
  }

  return (
    <div className="App">
      <h1>Giphly!</h1>
      <input name="search-text" className="search-box" type="text"
        placeholder="✎..."
        value={searchText}
        onChange={onSearchTextChange}
        onKeyUp={onKeyUp} />
      <button className="search-button"
        onClick={onSearchClick}>
        <span role="img" aria-label="magnify glass">🔍</span>
      </button>
      {curPage > 0 ?
        <PageNav curPage={curPage}
          totalPages={Math.ceil(totalGifsCount / gifsPageLimit)}
          onPageChange={onPageChange} />
        : null}
      <div className="gallery">
        {gifs.length > 0 ?
          gifs.slice((curPage - 1) * gifsPageLimit, (curPage - 1) * gifsPageLimit + gifsPageLimit)
            .map((gif, index) =>
              <div className="gif-container"
                style={{
                  backgroundImage: `url(${gif.stillUrl})`
                }}
                id={index + ((curPage - 1)  * gifsPageLimit)} key={index}
                onClick={onImageClick}></div>
            )
          : null}
      </div>
      {curPage > 0 ?
        <PageNav curPage={curPage}
          totalPages={Math.ceil(totalGifsCount / gifsPageLimit)}
          onPageChange={onPageChange} />
        : null}
      {clickedGifId > -1 ?
        <Lightbox gifs={gifs} curGifId={clickedGifId} onCloseClick={closeLightbox}/>
        : null}
    </div>
  );
}

function Lightbox({gifs, curGifId, onCloseClick}) {
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

function PageNav({ curPage, totalPages, onPageChange }) {
  return (
    <div className="page-nav">
      <button className="nav-btn"
        disabled={curPage === 1}
        onClick={() => onPageChange(curPage - 1)}>
        Previous</button>
      <div className="nav-numbers"><b>{curPage}</b> of {totalPages}</div>
      <button className="nav-btn"
        disabled={curPage === totalPages}
        onClick={() => onPageChange(curPage + 1)}>
        Next</button>
    </div>
  );
}

export default App;
