import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

import { getAllCategory } from './category/actions'
import { getAllPosts } from './post/actions'

import CategoryList from './category/CategoryList'
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import Error from './components/Error'
import CategoryView from './category/CategoryView'
import PostList from './post/PostList'
import CreatePostView from './post/CreatePostView'
import PostView from './post/PostView'

class App extends Component {

  componentDidMount() {
    this.props.getAllCategory()
    this.props.getAllPosts()
  }

  render() {
    const {categories, posts} = this.props
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' render={()=>(
              <div>
                <CategoryList categories={categories} useLink={true}></CategoryList>
                <PostList posts={posts}></PostList>
                <div className="add-post">
                  <Link to='/post/create' />
                </div>
              </div>
            )} />
          <Route exact path={'/:category'} component={CategoryView} />
          <Route exact path='/post/create' component={CreatePostView} />
          <Route exact path={'/:category/:postId'} component={PostView} />
          <Route path={'/post/:postId/edit'} component={CreatePostView} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {categories, posts} = state
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategory :() => dispatch(getAllCategory()),
    getAllPosts : () => dispatch(getAllPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
