import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../post/actions'
import {createUniqueKey, serialize} from '../utils/util'

class CreatePostView extends Component {

  getCurPost() {
    const postId = this.props.match.params.postId
    if (postId !== undefined) {
      const newPosts = this.props.posts.filter((post) => {
        return post.id === postId
      })
      if (newPosts.length > 0) {
        return newPosts[0]
      }
    }
    return undefined
  }

  handleEvent = (e) => {
    e.preventDefault()
    const post = serialize(e.target)
    const curPost = this.getCurPost()
    if (curPost) {
      curPost.title = post.title
      curPost.body = post.body
      curPost.category = post.category
      this.props.updatePost(curPost, this.props.history)
    } else {
      this.props.addPost(post, this.props.history)
    }
  }

  render() {
    const {categories, history} = this.props
    const post = this.getCurPost()
    return (
      <div>
        <a onClick={() => history.goBack()} className='close'> back </a>
        <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
              <input type='text' name='title' placeholder='title' defaultValue={post && post.title}/>
              <br/>
              <input type='text' name='body' placeholder='body' defaultValue={post && post.body}/>
              <br/>
              <select name='category' defaultValue={post ? post.category : Object.keys(categories)[0] }>
                {
                  Object.keys(categories).length >0 && Object.keys(categories).map((name) => (
                    <option value={name} key={name+ createUniqueKey()}>{name}</option>
                  ))
                }
              </select>
              <button>{post ? 'Update Post' : 'Create Post'}</button>
            </div>
          </form>
      </div>
    )

  }

}

function mapStateToProps(state){
  const {categories, posts} = state
  return {
    categories,
    posts
  }
}

export default withRouter(connect(mapStateToProps, actions)(CreatePostView))
