import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../post/actions'
import { addComment } from '../comment/actions'
import { createUniqueKey, serialize } from '../utils/Util'

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
  const handleEvent = (event) => {
    event.preventDefault()
    const comment = serialize(event.target)
    if (comment.body) {
      props.dispatch(addComment(post.id, comment.body))
    }
  }
  const comments = props.comments.filter(comment => comment.parentId === post.id)
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
      <form onSubmit={handleEvent}>
        <input type='text' name='body' placeholder='input an comment'/>
        <button>submit comment</button>
      </form>

      <ul className='comment-list'>
        {comments && comments.map((comment) => (
          <li key={comment.id + createUniqueKey()} >
            <p>{'body:' + comment.body}</p>
            <p>{'author:' + comment.author}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps(state) {
  const {posts, comments} = state
  return {
    posts,
    comments
  }
}

export default withRouter(connect(mapStateToProps)(PostView))
