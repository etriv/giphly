import React, { useState, useEffect } from 'react';
import './App.scss';
import { fetchGifs } from './modules/giphy-manager';

function App() {
  const [gifs, setGifs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchGifs('dog', 12, 6)
    .then(data => {
      console.log(data);
      setTotalCount(data.totalCount);
      setGifs(data.newGifs);
    }).catch(err => {
      console.log('Error while fetching gifs:', err);
    });
  }, []);

  return (
    <div className="App">
      <h1>Giphly!</h1>

    </div>
  );
}

export default App;
