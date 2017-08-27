import * as API from '../utils/Api'
import { createUniquePostId } from '../utils/Util'
import { getComments } from '../comment/actions'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_AEC_BY_TIMESTAMP = 'SORT_AEC_BY_TIMESTAMP'
export const SORT_DEC_BY_TIMESTAMP = 'SORT_DEC_BY_TIMESTAMP'
export const SORT_AEC_BY_VOTESCORE = 'SORT_AEC_BY_VOTESCORE'
export const SORT_DEC_BY_VOTESCORE = 'SORT_DEC_BY_VOTESCORE'


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

function updatePostSuccess(post) {
  return {
    type : UPDATE_POST,
    post
  }
}

function deletePostSuccess(postId) {
  return {
    type : DELETE_POST,
    postId
  }
}

export function sortDecByVotescore() {
  return {
    type : SORT_DEC_BY_VOTESCORE
  }
}

export function sortAecByVotescore() {
  return {
    type : SORT_AEC_BY_VOTESCORE
  }
}

export function sortDecByTimestamp() {
  return {
    type : SORT_DEC_BY_TIMESTAMP
  }
}

export function sortAecByTimestamp() {
  return {
    type : SORT_AEC_BY_TIMESTAMP
  }
}

function votePostSuccess(post) {
  return {
    type : VOTE_POST,
    post
  }
}

export function getAllPosts() {
  return dispatch => {
    API.fetchPosts().then(data=>{
      dispatch(getPostsSuccess(data))
      dispatch(sortDecByVotescore())
      data.map(post=>{
        dispatch(getComments(post.id))
      })
    })
  }
}

export function addPost(post, histroy) {
  post['timestamp'] = Date.now()
  post['author'] = API.owner
  post['id'] = createUniquePostId()
  return dispatch => {
    API.createPost(post).then((data) => {
      dispatch(addPostSuccess(data))
      histroy.goBack()
    })
  }
}

export function updatePost(post, histroy) {
  post['timestamp'] = Date.now()
  return dispatch => {
    API.updatePost(post).then(data=>{
      dispatch(updatePostSuccess(data))
      histroy.goBack()
    })
  }
}

export function deletePost(postId, history) {
  return dispatch => {
    API.deletePost(postId).then( (data) =>{
      if (data.status === 200) {
        dispatch(deletePostSuccess(postId))
        if (history) {
          history.goBack()
        }
      }
    })
  }
}

export function votePost(postId, isUp) {
  return dispatch => {
    API.votePost(postId, isUp).then(data => {
      dispatch(votePostSuccess(data))
    })
  }
}
