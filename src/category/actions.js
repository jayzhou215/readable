import { fetchAllCategories } from '../utils/Api'

export const GET_ALL_CATEGORY = 'GET_ALL_CATEGORY'

function getAll(categories) {
  return {
    type:GET_ALL_CATEGORY,
    categories
  }
}

export function getAllCategory() {
  return dispatch => {
    return  fetchAllCategories().then(data =>
      dispatch(getAll(data)))
  }
}
