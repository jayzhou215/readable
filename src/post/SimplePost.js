import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as actions from '../post/actions'
import { filterDeletedPostComments } from '../utils/util'

function SimplePost({post, comments, fromList, dispatch, history, deletePost, votePost}) {
  const postComments = filterDeletedPostComments(post.id, comments)
  const commentNumber = postComments.length
  return (
    <div>
      <p>{'Title: ' + post.title}</p>
      { !fromList && (<p>Body: {post.body}</p>)}
      <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
      <p>{'Vote score: ' + post.voteScore}</p>
      <p>{'Author: ' + post.author}</p>
      <p>{'comments number: ' + commentNumber}</p>
      <div className='inner'>
        <Link to={`/post/${post.id}/edit`}><button className='btn-edit'></button></Link>
        <button className='btn-delete' onClick={()=>deletePost(post.id, fromList?undefined: history)}></button>
        <button className='btn-vote-up' onClick={()=>votePost(post.id, true)}></button>
        <button className='btn-vote-down' onClick={()=>votePost(post.id, false)}></button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const {comments} = state
  return {
    comments
  }
}

export default withRouter(connect(mapStateToProps, actions)(SimplePost))
