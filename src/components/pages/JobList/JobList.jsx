import React ,{ Component} from 'react';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase';
// import auth from "../../../firebase"
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Badge,
  Media
} from 'reactstrap';
import { RingLoader } from 'react-spinners';

import OneCol from '../../templates/OneCol';
import {auth} from '../../../firebase';

// import {
//   fetchJobs
// } from '../../../actions/jobs';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user:false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(modalName) {
    let value = true;
    if (this.state.hasOwnProperty(modalName)) {
     value = !this.state[modalName];
    }

    this.setState({
      [modalName]: value
    });
  }

  createMarkup(content) {
    return {__html: content};
  };

  renderMediaLogo(url) {
    if (url) {
      return (
        <Media left>
          <Media style={{width: 64, height: 64}} object src={url} alt="Generic placeholder image" />
        </Media>
      )
    }
    return null;
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user){
        console.log("ther is a user");
        this.setState({
          user:true
        })
      }else{
        console.log("no user");
        this.setState({
          user:false
        })
      }
    })
    //console.log("hello");
  }
 
  render() {
    const jobs = !isLoaded(this.props.jobs) ?
      <RingLoader loading color="#36D7B7" /> :
      isEmpty(this.props.jobs) ?
        'Jobs list is empty' :
        this.props.jobs.map(
          (item) => {
            return (
              <ListGroupItem key={item.key}>
                <Row id={item.key} onClick={this.toggle.bind(this, item.key)}>
                  <Col md='1'>
                    {this.renderMediaLogo(item.value.logoUrl)}
                  </Col>
                  <Col>
                    <Row>
                      <Col>{item.value.title}</Col>
                      <Col md="2">Posted: {moment(item.value.timestamp * -1).format("MMM Do, YYYY")}</Col>
                    </Row>
                    <Row>
                      <Col>{item.value.remote ? (<Badge color="secondary">Remote</Badge>) : null}</Col>
                      <Col>{item.value.location}</Col>
                      <Col>{item.value.range}</Col>
                    </Row>

                    <Modal labelledBy={item.key} isOpen={this.state[item.key]} toggle={this.toggle.bind(this, item.key)} className={this.props.className} size="lg">
                      <ModalHeader toggle={this.toggle.bind(this, item.key)}>{item.value.title}</ModalHeader>
                      <ModalBody>
                        <div dangerouslySetInnerHTML={this.createMarkup(item.value.description)} />
                      </ModalBody>
                      <ModalFooter>
                        <a href={item.value.apply} target='_blank'><Button color="primary" >Apply</Button></a>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this, item.key)}>Close</Button>
                      </ModalFooter>
                    </Modal>

                  </Col>
                </Row>
              </ListGroupItem>
            )
          }
        );
    return (
      <>
{this.state.user ? 
<>
<OneCol>
        <Row>
          <Col>
            <h3>Job Posts</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
            {jobs}
            </ListGroup>
          </Col>
        </Row>
      </OneCol>

</>:

<>

<OneCol>
        <Row>
          <Col>
            
          </Col>
        </Row>
        <Row>
         <h1>sign in to see job posts</h1>
        </Row>
      </OneCol>
</>

}
</>
     
    )
  }
}

const mstp = ({ firebase }) => {
  let jobs = [];
  if (firebase.ordered.hasOwnProperty('jobs')) {
    jobs = firebase.ordered.jobs;
  }
  return {
    jobs,
  };
}

export default compose(
  firebaseConnect(props => [{ path: 'jobs', queryParams: [ `endAt=${moment().subtract(30, 'days')}`, 'orderByChild=timestamp' ] }]),
  connect(mstp)
)(JobList);
