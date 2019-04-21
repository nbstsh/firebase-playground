import React, { Component } from 'react';
import './App.css';
import Container from './components/Container'
import Header from './components/Header'
import './utils/firebase-init'

class App extends Component {
  constructor() {
    super()
    this.state = {
      activeContainer: 'firestore'
    }
  }
  setActiveContainer = (activeContainer) => {
    this.setState({ activeContainer })
  }
  render() {
    return (
      <div className="App">
        <Header setActiveContainer={this.setActiveContainer} activeContainer={this.state.activeContainer}/>
        <Container activeContainer={this.state.activeContainer}/>
      </div>
    );
  }
}


export default App;
