import * as ACTIONS from './actions'

export function posts(state=[], action){
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return action.posts
    case ACTIONS.ADD_POST:
      return state.concat(action.post)
    default:
      return state
  }
}
