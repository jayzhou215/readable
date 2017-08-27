import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { deletePost, votePost} from '../post/actions'

function SimplePost({post, dispatch, history}) {
  return (
    <div>
      <p>{'Title: ' + post.title}</p>
      <p>{'Body: ' + post.body}</p>
      <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
      <p>{'Vote score: ' + post.voteScore}</p>
      <p>{'Author: ' + post.author}</p>
      <div className='inner'>
        <Link to={`/post/${post.id}/edit`}><button className='btn-edit'></button></Link>
        <button className='btn-delete' onClick={()=>dispatch(deletePost(post.id, history))}></button>
        <button className='btn-vote-up' onClick={()=>dispatch(votePost(post.id, true))}></button>
        <button className='btn-vote-down' onClick={()=>dispatch(votePost(post.id, false))}></button>
      </div>
    </div>
  )
}

export default connect()(SimplePost)
