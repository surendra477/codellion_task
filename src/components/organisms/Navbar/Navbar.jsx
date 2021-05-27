import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Row,
  Button
} from 'reactstrap';

import { UserAuth } from '../../molecules';
import firebase,{ auth, provider} from '../../../firebase.js';
export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      login:null
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
componentDidMount() {
  auth.onAuthStateChanged((user) => {

    if(user){
this.setState({
      login:true
    })
    }
    
  })
}

  render() {
    return (

            
   <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
  <Link to="/" className="navbar-brand" style={{color:"white"}}>codellion</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink to="/post" className="nav-link" style={{color:"white"}} activeClassName="">Create a Post</NavLink>
        </li>
       
      </ul>
      <form className="d-flex">
       <NavLink to="/" >  <>{this.state.login ? <Button style={{color:"white"}} className="nav-link" onClick={() => 
  { firebase.auth().signOut().then(() => {
    this.setState({
        login:false
      })
 })}}>logout</Button>:<Button style={{color:"white"}} className="nav-link" onClick={() => {
     auth.signInWithPopup(provider).then((response)=>{
     this.setState({
        login:true
       })
     })
   }}>login</Button>}</></NavLink>
       
      </form>
    </div>
  </div>
</nav>
    );
  }
}

