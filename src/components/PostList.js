import React from 'react'
import { trim, createUniqueKey } from '../utils/Util'

function PostList ({posts}) {
  const hasPost = posts.length > 0
  if (!hasPost) {
    return <p>no post yet</p>
  }
  return (
    <div>
      <p>Posts</p>
      <ul className='post-list'>
        {posts.map((post) => (
          <li key={post.id + '-' + createUniqueKey()} >
            <p>{post.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
