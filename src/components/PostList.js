import React, {Component} from 'react'
import { trim, createUniqueKey } from '../utils/util'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../post/actions'
import SimplePost from './SimplePost'

class PostList extends Component {

  sortBy = (event) => {
    const value = event.target.value
    value.startsWith('vote_score') ? (value.endsWith('dec')? this.props.sortDecByVotescore() : this.props.sortAecByVotescore()) : (value.endsWith('dec') ? this.props.sortDecByTimestamp() : this.props.sortAecByTimestamp())
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
              <Link to={`/${post.category}/${post.id}`}>To detail</Link>
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

export default withRouter(connect(mapStateToProps, actions)(PostList))
