import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../comment/actions'
import { createUniqueKey, serialize, filterDeletedPostComments } from '../utils/util'
import SimplePost from './SimplePost'

class PostView extends Component {

  componentDidMount() {
    const postId = this.props.match.params.postId
    this.props.getComments(postId)
  }

  sortBy = (event) => {
    const value = event.target.value
    value === 'vote_score' ? this.props.sortCommentByVoteScore() : this.props.sortCommentByTimestamp()
  }

  render() {
    const {match, history, posts, commentSort, commentOnEdit} = this.props
    const {addComment, updateComment} = this.props
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
        addComment(post.id, comment.body)
        this.refs.body.value = ''
      }
    }
    const comments = filterDeletedPostComments(post.id, this.props.comments)
    return (
      <div>
        <a onClick={() => history.goBack()}  className='close'/>
        <SimplePost post={post}/>
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
                        updateComment(comment, newComment.body)
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
    const {onEditComment, deleteComment, voteComment} = this.props
    return (
      <li key={comment.id + createUniqueKey()} className='comment-item' >
        <p>{'body:' + comment.body}</p>
        <p>{'author:' + comment.author}</p>
        <p>{'voteScore:' + comment.voteScore}</p>
        <p>{'last edit: ' + new Date(comment.timestamp).toLocaleString()}</p>
        <div className='inner'>
          <button className='btn-edit' onClick={()=>onEditComment(comment.id)}></button>
          <button className='btn-delete' onClick={()=>deleteComment(comment.id)}></button>
          <button className='btn-vote-up' onClick={()=>voteComment(comment.id, true)}></button>
          <button className='btn-vote-down' onClick={()=>voteComment(comment.id, false)}></button>
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

export default withRouter(connect(mapStateToProps, actions)(PostView))
