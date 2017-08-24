import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getAllCategory } from './category/actions'
import CategoryList from './components/CategoryList'
import {Switch, Route, withRouter} from 'react-router-dom'
import Error from './components/Error'
import CategoryView from './components/CategoryView'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
  }

  render() {
    const {categories} = this.props
    return (
      <Switch>
        <Route exact path='/' render={()=>(
            <CategoryList categories={categories} ></CategoryList>
          )} />
        <Route path={'/category/:category'} component={CategoryView} />
        <Route component={Error} />
      </Switch>
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

export default withRouter(connect(mapStateToProps)(App))
