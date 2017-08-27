import {categories} from './category/reducer'
import {posts, postSort} from './post/reducer'
import {comments, commentSort, commentOnEdit} from './comment/reducer'

import { combineReducers } from 'redux'

export default combineReducers({
  categories,
  comments,
  posts,
  postSort,
  commentSort,
  commentOnEdit
})
