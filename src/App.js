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
import PostView from './components/PostView'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategory())
    this.props.dispatch(getAllPosts())
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
          <Route path={'/category/:categoryName'} component={CategoryView} />
          <Route exact path='/post/create' component={CreatePostView} />
          <Route exact path={'/post/:postId'} component={PostView} />
          <Route path={'/post/:postId/edit'} component={CreatePostView} />
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

export default withRouter(connect(mapStateToProps)(App))
