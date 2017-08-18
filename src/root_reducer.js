import {categories} from './cagegory/reducer'
import * as post_reducer from './post/reducer'
import * as comment_reducer from './comment/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  categories,
  // post_reducer,
  // comment_reducer
})
