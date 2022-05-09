
import './App.css';
// import Header from './components/Header'
import Main from './components/Main'
// import Footer from './components/Footer'
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LoggedOn: false,
      User: ''
    }
    this.SignIn = this.SignIn.bind(this);
    this.SignOut = this.SignOut.bind(this);
  }
  SignIn(data) {
    
    this.setState({
      LoggedOn: true,
      User: data
    })
    console.log(this.state.User, 'from App.js SignIn()')
  }
  SignOut() {
    this.setState({
      LoggedOn: false,
      User: ''
    })
  }
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <Main 
        LoggedOn = {this.state.LoggedOn}
        SignIn={this.SignIn}
        SignOut={this.SignOut}
        User = {this.state.User}
        />
        {/* <Footer /> */}
      </div>
    );


  }

}

