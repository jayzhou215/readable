import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPost} from '../post/actions'
import {createUniqueKey, serialize} from '../utils/Util'

class CreatePostView extends Component {

  handleEvent = (e) => {
    e.preventDefault()
    const post = serialize(e.target)
    this.props.dispatch(addPost(post, this.props.history))
  }

  render() {
    const {categories, dispatch} = this.props
    return (
      <div>
        <Link to='/' className='close'/>
        <form onSubmit={this.handleEvent} className='create-post-form'>
            <div className='create-post-details'>
              <input type='text' name='title' placeholder='title'/>
              <br/>
              <input type='text' name='body' placeholder='body'/>
              <br/>
              <select name='category'>
                {
                  Object.keys(categories).length >0 && Object.keys(categories).map((name) => (
                    <option value={name} key={name+ createUniqueKey()}>{name}</option>
                  ))
                }
              </select>
              <button>Create Post</button>
            </div>
          </form>
      </div>
    )

  }

}

function mapStateToProps(state){
  const {categories} = state
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(CreatePostView))
