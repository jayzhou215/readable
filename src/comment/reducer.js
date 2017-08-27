import * as ACTIONS from './actions'
import {DELETE_POST} from '../post/actions'

export function comments (state=[], action) {
  switch (action.type) {
    case ACTIONS.GET_POST_COMMENTS:
      return state.concat(action.comments)
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
