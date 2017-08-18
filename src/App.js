import React, { Component } from 'react';
import './App.css';
import * as Api from './utils/Api'

class App extends Component {

  componentDidMount() {
    Api.fetchAllCategories().then(data => (
      console.log(data)
    ))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello, my readable</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
