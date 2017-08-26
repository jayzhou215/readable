import * as ACTIONS from './actions'

function cloneAndSort(state, sortFunc) {
  const newState = []
  newState.push.apply(newState, state)
  newState.sort(sortFunc)
  return newState
}

export function posts(state=[], action){
  switch (action.type) {
    case ACTIONS.GET_ALL_POSTS:
      return action.posts
    case ACTIONS.ADD_POST:
      return state.concat(action.post)
    case ACTIONS.UPDATE_POST:
      return state.map((post) => {
        const curPost = action.post
        return curPost.id === post.id ? curPost : post
      })
    case ACTIONS.SORT_AEC_BY_TIMESTAMP:
      return cloneAndSort(state, (postA, postB)=> {return postA.timestamp - postB.timestamp})
    case ACTIONS.SORT_DEC_BY_TIMESTAMP:
      return cloneAndSort(state, (postA, postB)=> {return postB.timestamp - postA.timestamp})
    case ACTIONS.SORT_AEC_BY_VOTESCORE:
      return cloneAndSort(state, (postA, postB)=> {return postA.voteScore - postB.voteScore})
    case ACTIONS.SORT_DEC_BY_VOTESCORE:
      return cloneAndSort(state, (postA, postB)=> {return postB.voteScore - postA.voteScore})
    default:
      return state
  }
}

export function postSort(state={sort:'vote_score_dec'}, action) {
  switch (action.type) {
    case ACTIONS.SORT_AEC_BY_TIMESTAMP:
      return {sort : 'timestamp_aec'}
    case ACTIONS.SORT_DEC_BY_TIMESTAMP:
      return {sort : 'timestamp_dec'}
    case ACTIONS.SORT_AEC_BY_VOTESCORE:
      return {sort : 'vote_score_aec'}
    case ACTIONS.SORT_DEC_BY_VOTESCORE:
      return {sort : 'vote_score_dec'}
    default:
      return state
  }
}
