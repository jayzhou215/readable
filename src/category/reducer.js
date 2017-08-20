import { GET_ALL_CATEGORY } from './actions'

export function categories(state = {}, action){
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return action.categories.reduce((categories, category) => {
        categories[category.name] = category.path
        return categories
      }, {})
    default:
      return state
  }
}
