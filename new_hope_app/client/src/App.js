import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap'

import Homevisit from './Homevisit';
import Nav from './Nav';
import Home from './Home';
import Dog from './Dog';
import Staff from './Staff';


const App = () => {
  const [mode, setMode] = useState(null)

  return (
    <Container>
      <Row>
          <Nav setMode={setMode} />
          {mode === 'dog'
            ? <Dog /> : mode === 'staff'
              ? <Staff /> : mode === 'homevisit'
                ? <Homevisit /> : <Home />}
      </Row>
    </Container>

  );
}

export default App;
