import React, {Component} from 'react'
import { trim, createUniqueKey } from '../utils/Util'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { sortDecByVotescore, sortAecByVotescore, sortDecByTimestamp, sortAecByTimestamp } from '../post/actions'
import SimplePost from './SimplePost'

class PostList extends Component {

  sortBy = (event) => {
    const value = event.target.value
    const action = value.startsWith('vote_score') ? (value.endsWith('dec')? sortDecByVotescore() : sortAecByVotescore()) : (value.endsWith('dec') ? sortDecByTimestamp() : sortAecByTimestamp())
    this.props.dispatch(action)
  }

  render(){
    const {posts, postSort} = this.props
    const hasPost = posts.length > 0
    if (!hasPost) {
      return <p>no post yet</p>
    }
    return (
      <div>
        <p>Posts</p>
        sortBy:<select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={postSort.sort}>
          <option value='vote_score_dec' key={createUniqueKey()}>vote_score_dec</option>
          <option value='vote_score_aec' key={createUniqueKey()}>vote_score_aec</option>
          <option value='timestamp_dec' key={createUniqueKey()}>timestamp_dec</option>
          <option value='timestamp_aec' key={createUniqueKey()}>timestamp_aec</option>

        </select>
        <ul className='post-list'>
          {posts.map((post) => (
            <li key={post.id + createUniqueKey()} >
              <Link to={`/post/${post.id}`}>To detail</Link>
              <SimplePost post={post} fromList={true}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {postSort} = state
  return {
    postSort
  }
}

export default connect(mapStateToProps)(PostList)
