import React, { useState } from 'react';

import Homevisit from './Homevisit';
import NavBar from './NavBar';
import Home from './Home';
import Dog from './Dog';
import Staff from './Staff';


const App = () => {
  const [mode, setMode] = useState(null)

  return (
    <div className="d-flex flex-row">
      <NavBar setMode={setMode} />
      {mode === 'dog'
        ? <Dog /> : mode === 'staff'
          ? <Staff /> : mode === 'homevisit'
            ? <Homevisit /> : <Home />}
    </div>

  );
}

export default App;
