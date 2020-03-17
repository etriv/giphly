import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchGifs } from './modules/giphy-manager';

function App() {
  const [gifs, setGifs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [gifsOffset, setGifsOffset] = useState(0);
  const gifsLimit = 12;

  const [searchText, setSearchText] = useState('dogs');

  useEffect(onSearchClick, [])

  function onSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  function onKeyUp(e) {
    if (e.keyCode === 13) {
      onSearchClick();
    }
  }

  function onSearchClick() {
    fetchGifs(searchText, gifsOffset, gifsLimit)
      .then(data => {
        console.log('Fetched gifs:', data);
        setTotalCount(data.totalCount);
        setGifs(data.newGifs);
      }).catch(err => {
        console.log('Error while fetching gifs:', err);
      });
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
        SEARCH</button>
      <div className="gallery">
        {gifs.length > 0 ?
          gifs.map((gif) =>
            <div className="gif-container"
              style={{
                backgroundImage: `url(${gif.stillUrl})`
              }}
              key={gif.giphyId}></div>
          )
          : null}
      </div>
    </div>
  );
}

export default App;
