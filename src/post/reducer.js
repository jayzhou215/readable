import * as ACTIONS from './actions'

export function posts(state=[], action){
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return []
    default:
      return state
  }
}
