import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchGifs } from './modules/giphy-manager';

function App() {
  const [gifs, setGifs] = useState([]);
  const [totalGifsCount, setTotalGifsCount] = useState(0);
  const [gifsOffset, setGifsOffset] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const gifsPageLimit = 12;   // Number of gifs to display in each page
  const pagesAmount = 10;      // The number of pages to fill with gifs

  const [searchText, setSearchText] = useState('dogs');

  useEffect(onSearchClick, []);

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
    fetchGifs(searchText, gifsOffset, gifsPageLimit * pagesAmount)
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
                key={index}></div>
            )
          : null}
      </div>
      {curPage > 0 ?
        <PageNav curPage={curPage}
          totalPages={Math.ceil(totalGifsCount / gifsPageLimit)}
          onPageChange={onPageChange} />
        : null}
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
