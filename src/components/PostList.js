import React from 'react'
import { createUniquePostId, trim } from '../utils/Util'

function PostList ({posts}) {
  const hasPost = !posts && posts.length > 0
  if (!hasPost) {
    return <p>no post yet</p>
  }
  return (
    <div>
      <p>Posts</p>
      <ul className='post-list'>
        {posts.map((post) => (
          <li key={post.id} >
            <p>{trim(post.title)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
