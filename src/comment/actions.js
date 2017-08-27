import * as API from '../utils/Api'
import { createUniqueCommentId } from '../utils/Util'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENT_DETAIL = 'GET_COMMENT_DETAIL'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function addCommentSuccess(comment) {
  return {
    type : ADD_COMMENT,
    comment
  }
}

export function addComment(postId, body) {
  const comment = {}
  comment['body'] = body
  comment['author'] = API.owner
  comment['id'] = createUniqueCommentId()
  comment['parentId'] = postId
  comment['deleted'] = false
  comment['parentDeleted'] = false
  comment['timestamp'] = Date.now()
  return dispatch => {
    API.createComment(comment).then(data => {
      console.log('createComment:', data)
      dispatch(addCommentSuccess(data))
    })
  }
}
