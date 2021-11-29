import React, { useEffect } from 'react';
// import axios from 'axios';

import { getAllDogs } from './routes/dog';

function App() {

  useEffect(() => {
    getAllDogs().then(res => console.log(res))
  }, [])


  return (
    <div className="App">
      hellooo
    </div>
  );
}

export default App;
