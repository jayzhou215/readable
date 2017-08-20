import React, { Component } from 'react';
import './App.css';
import * as Api from './utils/Api'
import { connect } from 'react-redux'
import { getAllCategory } from './category/actions'
import CategoryList from './components/CategoryList'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
  }

  jump = (path) => {
    console.log(path)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hello, my readable</h2>
        </div>

        <CategoryList categories={this.props.categories} jump={this.jump} ></CategoryList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {categories, comments, posts} = state
  return {
    categories,
    posts
  }
}

export default connect(mapStateToProps)(App);
