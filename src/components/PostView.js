import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../post/actions'

function PostView (props) {
  const postId = props.match.params.postId
  const histroy = props.history
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
      <div className='inner'>
        <Link to={`/post/${post.id}/edit`}><button className='btn-edit'></button></Link>
        <button className='btn-delete' onClick={()=>props.dispatch(deletePost(post.id, histroy))}></button>
        <button className='btn-vote-up' onClick={()=>props.dispatch(votePost(post.id, true))}></button>
        <button className='btn-vote-down' onClick={()=>props.dispatch(votePost(post.id, false))}></button>
      </div>
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
