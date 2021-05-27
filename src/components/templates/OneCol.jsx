import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Navbar, Footer } from '../organisms';

const OneCol = ({children}) => (
  <Container fluid className="site">
    <Row className="bg-dark mb-4">
      <Col>
        <Navbar />
      </Col>
    </Row>
    <Row  className="site-content mb-4">
      <Col md={{ size: 10, offset: 1 }}>
        {children}
      </Col>
    </Row>
    <Row>
      <Col>
        <Footer />
      </Col>
    </Row>
  </Container>
);

export default OneCol;
