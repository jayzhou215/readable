import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CategoryList from './CategoryList'
import PostList from '../post/PostList'

function CategoryView(props) {
  const {categories, posts} = props
  const curCategoryName = props.match.params.category
  if (!categories[curCategoryName]) {
    return (
      <p> no such category: {curCategoryName}</p>
    )
  }
  const curCategories = {}
  curCategories[curCategoryName] = categories[curCategoryName]
  const curPosts = posts && posts.filter((post) => {
    return post.category === curCategoryName
  })
  return (
    <div>
      <Link to='/' className='close'/>
      <div>
        <CategoryList categories={curCategories} useLink={false}></CategoryList>
        <PostList posts={curPosts}></PostList>
      </div>
      <div className="add-post">
        <Link to='/post/create' />
      </div>
    </div>
  )
}

function mapStateToProps(state){
  const {categories, posts} = state
  return {
    categories, posts
  }
}
export default withRouter(connect(mapStateToProps)(CategoryView))
