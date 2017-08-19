import * as ACTIONS from './actions'

export function commments (state={}, action) {
  switch (action.type) {
    case ACTIONS.GET_POST_COMMENTS:
      return Object.keys(state).filter((postId) => {
        return postId === action.postId
      }).reduce((comment, postId) => state[postId], {})
    case ACTIONS.ADD_COMMENT:
      return{
        ...state,
        [action.comment.parentId]:action.comment
      }
    default:
      return state
  }
}
