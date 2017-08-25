import {createPost, fetchPosts, owner} from '../utils/Api'
import { createUniquePostId } from '../utils/Util'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

function getPostsSuccess(posts){
  return {
    type : GET_ALL_POSTS,
    posts
  }
}

function addPostSuccess(post){
  return {
    type : ADD_POST,
    post
  }
}

export function getAllPosts() {
  return dispatch => {
    fetchPosts().then(data=>{
      dispatch(getPostsSuccess(data))
    })
  }
}

export function addPost(post, histroy) {
  post['timestamp'] = Date.now()
  post['owner'] = owner
  post['id'] = createUniquePostId()
  return dispatch => {
    createPost(post).then((data) => {
      dispatch(addPostSuccess(data))
      histroy.push('/')
    })
  }
}
