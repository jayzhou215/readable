import {categories} from './category/reducer'
import {posts, postSort} from './post/reducer'
import {comments} from './comment/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  categories,
  comments,
  posts,
  postSort
})
