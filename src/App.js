import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchGifs } from './modules/giphy-manager';
import Lightbox from './components/lightbox/lightbox';
import Gallery from './components/gallery/gallery';

function App() {
  const [gifs, setGifs] = useState([]);
  const [totalGifsCount, setTotalGifsCount] = useState(0);
  const [gifToView, setGifToView] = useState(-1);
  const [searchText, setSearchText] = useState('dogs');
  const [fetchingNewSearch, setFetchingNewSearch] = useState(false);
  const gifsBulkSize = 120;

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
    setFetchingNewSearch(true);
    fetchGifs(searchText, 0, gifsBulkSize)
      .then(data => {
        console.log('Fetched gifs:', data);
        setTotalGifsCount(data.totalCount);
        setGifs(data.newGifs);
        setFetchingNewSearch(false);
      })
      .catch(err => {
        console.log('Error while fetching gifs:', err);
      });
  }

  function fetchMoreGifs() {
    fetchGifs(searchText, gifs.length, gifsBulkSize)
      .then(data => {
        console.log('Fetched gifs:', data);
        setTotalGifsCount(data.totalCount);
        setGifs([...gifs, ...data.newGifs]);
      })
      .catch(err => {
        console.log('Error while fetching gifs:', err);
      });
  }

  function onImageClick(e) {
    setGifToView(Number(e.target.id));
  }

  function closeLightbox() {
    setGifToView(-1);
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
        onClick={onSearchClick}
        disabled={fetchingNewSearch}>
        <span role="img" aria-label="magnify glass">🔍</span>
      </button>
      {!fetchingNewSearch && gifs.length > 0 ?
        <Gallery gifs={gifs}
          totalGifsCount={totalGifsCount}
          onImageClick={onImageClick}
          fetchMoreGifs={fetchMoreGifs} />
        : null}

      {gifToView > -1 ?
        <Lightbox gifs={gifs}
        gifToView={gifToView}
        onCloseClick={closeLightbox}
        setGifToView={setGifToView} />
        : null}
    </div>
  );
}

export default App;
