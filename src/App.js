import React, { Component } from 'react';
import './App.css';
import {Header, Main, Footer} from './components/common/';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
