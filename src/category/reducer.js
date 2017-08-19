import { GET_ALL_CATEGORY } from './actions'

export function categories(state = {}, action){
  console.log(action.type)
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
          categories:action.categories,
      }
    default:
      return state
  }
}
