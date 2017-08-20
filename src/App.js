import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getAllCategory } from './category/actions'
import CategoryList from './components/CategoryList'
import {Switch, Route} from 'react-router-dom'
import Error from './components/Error'
import CategoryView from './components/CategoryView'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
  }

  render() {
    const { categories } = this.props
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={()=>(
              <CategoryList categories={categories} ></CategoryList>
            )} />
          Object.values(categories).length>0 && Object.values(categories).map((path)=>{
            <Route path={'/:path'} component={CategoryView} />
          })
          <Route component={Error} />
        </Switch>

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
