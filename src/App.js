import React, { useState, useEffect } from 'react';
import './App.scss';
import { GiphyFetch } from '@giphy/js-fetch-api'
// import { Grid } from '@giphy/react-components'


function App() {
  const [gifs, setGifs] = useState();

  // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
  const gf = new GiphyFetch('tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ');
  // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  // const fetchGifs = (offset) => gf.search('dog', { sort: 'relevant', offset, limit: 6});
  // <Grid width={800} columns={3} fetchGifs={fetchGifs} />

  useEffect(() => {
    gf.search('dog', { sort: 'relevant', offset: 12, limit: 6}).then((newGifs) => {
      console.log(newGifs);
    });
  }, [gf]);
  // TODO: Check response's meta.status === 200
  // Other wise (and in case of exception) do something
  // NOTE: pagination.total_count is the overall results (good for page count)

  return (
    <div className="App">
      <h1>Giphly!</h1>
      
    </div>
  );
}

export default App;
