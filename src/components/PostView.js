import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

function PostView (props) {
  const postId = props.match.params.postId
  const newPosts = props.posts.filter((post) => {
    return post.id === postId
  })
  if (newPosts.length === 0) {
    return (
      <div>
        <Link to='/' className='close'/>
        <p>{'no such post for id ' + postId}</p>
      </div>
    )
  }
  const post = newPosts[0]
  return (
    <div>
      <Link to='/' className='close'/>
      <p>{'Title: ' + post.title}</p>
      <p>{'Body: ' + post.body}</p>
      <p>{'timestamp: ' + new Date(post.timestamp).toUTCString()}</p>
      <p>{'Vote score: ' + post.voteScore}</p>
      <p>{'Author: ' + post.author}</p>
      <p><Link to={`/post/${post.id}/edit`}>Edit</Link></p>
    </div>
  )
}

function mapStateToProps(state) {
  const {posts} = state
  return {
    posts
  }
}

export default withRouter(connect(mapStateToProps)(PostView))
