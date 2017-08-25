import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getAllCategory } from './category/actions'
import { getAllPosts } from './post/actions'
import CategoryList from './components/CategoryList'
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import Error from './components/Error'
import CategoryView from './components/CategoryView'
import PostList from './components/PostList'
import CreatePostView from './components/CreatePostView'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
    this.props.dispatch(getAllPosts())
  }

  render() {
    const {categories, posts} = this.props
    return (
      <div>
        <Switch>
          <Route exact path='/' render={()=>(
              <div>
                <CategoryList categories={categories} useLink={true}></CategoryList>
                <PostList posts={posts}></PostList>
              </div>
            )} />
          <Route path={'/category/:categoryName'} component={CategoryView} />
          <Route path='/post/create' component={CreatePostView} />
          <Route component={Error} />
        </Switch>
        <div className="add-post">
          <Link to='/post/create' />
        </div>
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

export default withRouter(connect(mapStateToProps)(App))
