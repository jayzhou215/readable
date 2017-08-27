import * as ACTIONS from './actions'

export function comments (state=[], action) {
  switch (action.type) {
    case ACTIONS.GET_POST_COMMENTS:
      return state.filter(comment => comment.parentId === action.postId)
    case ACTIONS.ADD_COMMENT:
      return state.concat(action.comment)
    default:
      return state
  }
}
