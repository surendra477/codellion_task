import React, { Component } from 'react';
//import '../App.css;
import firebase, { auth, provider } from '../firebase.js';

import OneCol from './templates/OneCol';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    };
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const itemsRef = firebase.database().ref('items');

    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <OneCol>
        <div className='app'>
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
              }
          {this.state.user ?
            <div>
              <div className='user-profile'>
                 <img src={this.state.user.photoURL} />
              </div>
              <div className='container'>
                <section className='add-item'>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
                    <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                    <button>Add Item</button>
                  </form>
                </section>
                <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>brought by: {item.user}
                               {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                 <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
            :
            <div className='wrapper'>
              <p>You must be logged in to see the potluck list and submit to it.</p>
            </div>
          }
        </div>
      </OneCol>
    );
  }
}

export default App;
