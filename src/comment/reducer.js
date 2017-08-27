import * as ACTIONS from './actions'
import {DELETE_POST, GET_ALL_POSTS} from '../post/actions'

export function comments (state=[], action) {
  switch (action.type) {
    case ACTIONS.GET_POST_COMMENTS:
      var newState = []
      newState = newState.concat(state)
      action.comments.map(comment => {
        if (!contains(newState, comment)) {
          newState = newState.concat(comment)
        }
      })
      return newState
    case ACTIONS.ADD_COMMENT:
      return state.concat(action.comment)
    case DELETE_POST:
      return state.map((comment) => {
        if (comment.parentId === action.postId) {
          comment.deleted = true
          comment.parentDeleted = true
        }
        return comment
      })
    case ACTIONS.DELETE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.commentId) {
          comment.deleted = true
        }
        return comment
      })
    case ACTIONS.VOTE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          return action.comment
        }
        return comment
      })
    case ACTIONS.SORT_COMMENT_BY_TIMESTAMP:
      return state.sort((commentA, commentB) => commentB.timestamp - commentA.timestamp)
    case ACTIONS.SORT_COMMENT_BY_VOTE_SCORE:
      return state.sort((commentA, commentB) => commentB.voteScore - commentA.voteScore)
    case ACTIONS.UPDATE_COMMENT:
      return state.map(comment => {
        if (comment.id === action.comment.id) {
          return action.comment
        }
        return comment
      })
    default:
      return state
  }
}

export function commentSort(state = {'sort':'vote_score'}, action) {
    switch (action.type) {
      case ACTIONS.SORT_COMMENT_BY_TIMESTAMP:
        return {'sort' : 'timestamp' }
      case ACTIONS.SORT_COMMENT_BY_VOTE_SCORE:
        return {'sort' : 'vote_score'}
      default:
        return state
    }
}

export function commentOnEdit (state = {}, action) {
  switch (action.type) {
    case ACTIONS.ON_EDIT_COMMENT:
      return {'commentId' : action.commentId}
    default:
      return state
  }
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].id === obj.id) {
            return true;
        }
    }
    return false;
}
