import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import Homevisit from './Homevisit';
import Nav from './Nav';
import Home from './Home';
import Dog from './Dog';
import Staff from './Staff';


const App = () => {
  const [mode, setMode] = useState(null)

  return (
    <Container>
      <Col>
        <Row>
          <Nav setMode={setMode} />
        </Row>
        {mode === 'dog'
          ? <Dog /> : mode === 'staff'
            ? <Staff /> : mode === 'homevisit'
              ? <Homevisit /> : <Home />}
      </Col>
    </Container>

  );
}

export default App;
