import React, { Component } from 'react';
import './App.css';
import * as Api from './utils/Api'
import { connect } from 'react-redux'
import { getAllCategory } from './category/actions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello, my readable</h2>
        </div>

        <p className="App-intro">
          {this.props.categories.categories && this.props.categories.categories[0].name}
        </p>
      </div>
    );
  }
}

  function mapStateToProps(state) {
    const {categories, comments, posts} = state
    return {
      categories
    }
  }

export default connect(mapStateToProps)(App);
