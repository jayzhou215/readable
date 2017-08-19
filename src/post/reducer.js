import * as ACTIONS from './actions'

export function posts(state={}, action){
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return action.posts.reduce( (posts, post) => {
        posts[post.id] = post
        return posts
      } , {})
    default:
      return state
  }
}
