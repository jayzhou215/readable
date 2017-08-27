import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, votePost } from '../post/actions'
import { addComment, getComments, deleteComment, voteComment, sortCommentByVoteScore, sortCommentByTimestamp, onEditComment, updateComment } from '../comment/actions'
import { createUniqueKey, serialize } from '../utils/Util'

class PostView extends Component {

  componentDidMount() {
    const postId = this.props.match.params.postId
    this.props.dispatch(getComments(postId))
  }

  sortBy = (event) => {
    const value = event.target.value
    const action = (value === 'vote_score' ? sortCommentByVoteScore() : sortCommentByTimestamp())
    this.props.dispatch(action)
  }

  render() {
    const {match, histroy, dispatch, posts, commentSort, commentOnEdit} = this.props
    const postId = match.params.postId
    const newPosts = posts.filter((post) => {
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
        dispatch(addComment(post.id, comment.body))
        this.refs.body.value = ''
      }
    }
    const comments = this.props.comments.filter(comment => comment.parentId === post.id && !comment.deleted && !comment.parentDeleted)
    return (
      <div>
        <Link to='/' className='close'/>
        <p>{'Title: ' + post.title}</p>
        <p>{'Body: ' + post.body}</p>
        <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
        <p>{'Vote score: ' + post.voteScore}</p>
        <p>{'Author: ' + post.author}</p>
        <div className='inner'>
          <Link to={`/post/${post.id}/edit`}><button className='btn-edit'></button></Link>
          <button className='btn-delete' onClick={()=>dispatch(deletePost(post.id, histroy))}></button>
          <button className='btn-vote-up' onClick={()=>dispatch(votePost(post.id, true))}></button>
          <button className='btn-vote-down' onClick={()=>dispatch(votePost(post.id, false))}></button>
        </div>
        <form onSubmit={handleEvent}>
          <input type='text' name='body' placeholder='input an comment' ref='body'/>
          <button>submit comment</button>
        </form>
        sortBy:
        <select name='sortComments' onChange={this.sortBy} value={commentSort.sort}>
          <option value='vote_score' key={createUniqueKey()}>vote_score</option>
          <option value='timestamp' key={createUniqueKey()}>timestamp</option>
        </select>

        <ol className='comment-list'>
          {comments && comments.map((comment) => {
            if (commentOnEdit.commentId && comment.id === commentOnEdit.commentId) {
              return (
                <li key={comment.id + createUniqueKey()} className='comment-item' >
                  <form onSubmit={(event) => {
                      event.preventDefault()
                      const newComment = serialize(event.target)
                      if (newComment.body !== comment.body) {
                        dispatch(updateComment(comment, newComment.body))
                      }
                    }}>
                    <input type='text' name='body' placeholder='input an comment' defaultValue={comment.body}/>
                    <button>update comment</button>
                  </form>
              </li>)
            } else {
              return this.createCommentView(comment)
            }
          })
         }
         {comments.length === 0 && ('no comment yet')}
        </ol>
      </div>
    )
  }

  createCommentView = (comment) => {
    const {dispatch} = this.props
    return (
      <li key={comment.id + createUniqueKey()} className='comment-item' >
        <p>{'body:' + comment.body}</p>
        <p>{'author:' + comment.author}</p>
        <p>{'voteScore:' + comment.voteScore}</p>
        <p>{'last edit: ' + new Date(comment.timestamp).toLocaleString()}</p>
        <div className='inner'>
          <button className='btn-edit' onClick={()=>dispatch(onEditComment(comment.id))}></button>
          <button className='btn-delete' onClick={()=>dispatch(deleteComment(comment.id))}></button>
          <button className='btn-vote-up' onClick={()=>dispatch(voteComment(comment.id, true))}></button>
          <button className='btn-vote-down' onClick={()=>dispatch(voteComment(comment.id, false))}></button>
        </div>

      </li>
    )
  }

}

function mapStateToProps(state) {
  const {posts, comments, commentSort, commentOnEdit} = state
  return {
    posts,
    comments,
    commentSort,
    commentOnEdit
  }
}

export default withRouter(connect(mapStateToProps)(PostView))
