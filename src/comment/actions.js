import * as API from '../utils/Api'
import { createUniqueCommentId } from '../utils/Util'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENT_DETAIL = 'GET_COMMENT_DETAIL'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SORT_COMMENT_BY_VOTE_SCORE = 'SORT_COMMENT_BY_VOTE_SCORE'
export const SORT_COMMENT_BY_TIMESTAMP = 'SORT_COMMENT_BY_TIMESTAMP'
export const ON_EDIT_COMMENT = 'ON_EDIT_COMMENT'

function addCommentSuccess(comment) {
  return {
    type : ADD_COMMENT,
    comment
  }
}

export function addComment(postId, body) {
  const comment = {}
  comment['body'] = body
  comment['author'] = API.owner
  comment['id'] = createUniqueCommentId()
  comment['parentId'] = postId
  comment['deleted'] = false
  comment['parentDeleted'] = false
  comment['timestamp'] = Date.now()
  return dispatch => {
    API.createComment(comment).then(data => {
      dispatch(addCommentSuccess(data))
    })
  }
}


export function getComments(postId) {
  return dispatch => {
    API.fetchComments(postId).then(comments => {
      dispatch({
        type : GET_POST_COMMENTS,
        comments
      })
    })
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    API.deleteComment(commentId).then(data=>{
      if (data.status === 200) {
        dispatch({
          type : DELETE_COMMENT,
          commentId
        })
      }
    })
  }
}

export function voteComment(commentId, isUp) {
  return dispatch => {
    API.voteComment(commentId, isUp).then(comment => {
      dispatch({
        type : VOTE_COMMENT,
        comment
      })
    })
  }
}

export function sortCommentByTimestamp() {
  return {
    type : SORT_COMMENT_BY_TIMESTAMP
  }
}

export function sortCommentByVoteScore() {
  return {
    type : SORT_COMMENT_BY_VOTE_SCORE
  }
}

export function onEditComment(commentId) {
  return {
    type : ON_EDIT_COMMENT,
    commentId
  }
}

export function updateComment(comment, body) {
  return dispatch => {
    API.updateComment(comment.id, Date.now(), body).then(comment => {
      dispatch({
        type : UPDATE_COMMENT,
        comment
      })
      dispatch(onEditComment(''))
    })
  }
}
