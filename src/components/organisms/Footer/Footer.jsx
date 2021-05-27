import React from 'react';
import { Link } from 'react-router-dom';
import {
  // layout
  Row,
  Col,

  // elements
  Button,
} from 'reactstrap';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Row className="pt-4 pb-4 bg-dark text-white">
        <Col className="text-center">
          <p>
            <i>codellion </i>
            <small className="text-muted"> Copyright © 2021</small>
          </p>
        </Col>
        <Col className="text-center">
          <Link to='/post'><Button>Post a job listing</Button></Link>
        </Col>
      </Row>
    );
  }
}

