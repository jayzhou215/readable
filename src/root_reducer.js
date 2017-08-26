import {categories} from './category/reducer'
import {posts, postSort} from './post/reducer'
import {commments} from './comment/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  categories,
  commments,
  posts,
  postSort
})
